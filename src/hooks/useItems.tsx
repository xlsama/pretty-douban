import { GM_xmlhttpRequest } from '$'
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '@/constants/pagination'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const parserHTML = (htmlText: string, category: 'book' | 'movie') => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlText, 'text/html')
  let items: any[] = []

  if (category === 'book') {
    const books = Array.from(doc.querySelectorAll('.subject-item'))
    items = books.map(el => {
      const imgUrl = el.querySelector('.pic a img')?.getAttribute('src') ?? ''
      const link = el.querySelector('.info h2 a')?.getAttribute('href') ?? ''
      const id = link.split('/').at(-2) ?? ''
      const title = el.querySelector('.info h2 a')?.getAttribute('title') ?? ''
      const pubList = (el.querySelector('.info .pub')?.textContent ?? '')
        .replace(/\s|\n/g, '')
        .split('/')
      pubList.pop()
      const pub = {
        author: pubList.at(0)!,
        translator: pubList.length === 3 ? '' : pubList.at(1),
        publisher: pubList.at(-2)!,
        date: pubList.at(-1)!,
      }
      const rating =
        Number(el.querySelector('[class^="rating"]')?.className?.match(/[0-9]/)?.at(0)) || 0
      const dateStr = el.querySelector('.info .short-note .date')?.textContent ?? ''
      const date = dateStr.substring(0, 10)
      const status = dateStr.slice(-2)
      const tags = (el.querySelector('.info .short-note .tags')?.textContent ?? '').replace(
        '标签: ',
        '',
      )
      return { id, imgUrl, link, title, date, tags, rating, status, pub }
    })
  } else if (category === 'movie') {
    const movies = Array.from(doc.querySelectorAll('.item'))
    items = movies.map(el => {
      const imgUrl = el.querySelector('.pic a img')?.getAttribute('src') ?? ''
      const link = el.querySelector('.pic a')?.getAttribute('href') ?? ''
      const title = (el.querySelector('.info .title a')?.textContent ?? '').replace(/\s|\n/g, '')
      const intro = el.querySelector('.info .intro')?.textContent ?? ''
      const date = el.querySelector('.info .date')?.textContent ?? ''
      const tags = (el.querySelector('.info .tags')?.textContent ?? '').replace('标签: ', '')
      const rating =
        Number(el.querySelector('[class^="rating"]')?.className?.match(/[0-9]/)?.at(0)) || 0
      return { imgUrl, link, title, intro, date, tags, rating }
    })
  }

  return items
}

const fetcher = ({ url, offset, tag }: { url: string; offset: number; tag: string }) =>
  Promise.all(
    [offset, offset + 15].map(start => {
      let query = `?start=${start}&sort=time&rating=all&filter=all&mode=grid`
      if (tag) {
        query += `&tag=${tag}`
      }
      return new Promise<string>(resolve => {
        GM_xmlhttpRequest({
          method: 'GET',
          url: `${url}${query}`,
          onload: function (response) {
            resolve(response.responseText)
          },
        })
      })
    }),
  )

const useItems = (uid: string, category: 'book' | 'movie', tab: string) => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [items, setItems] = useState<any[]>([])

  const { data, isLoading, mutate } = useSWR(
    {
      url: `https://${category}.douban.com/people/${uid}/${tab}`,
      offset: (currentPage - 1) * INITIAL_PAGE_SIZE,
      // tag: tag?.name,
    },
    fetcher,
  )

  useEffect(() => {
    if (!isLoading && data) {
      const [firstHalfHTMLStr, secondHalfHTMLStr] = data
      const items = parserHTML(firstHalfHTMLStr, category).concat(
        parserHTML(secondHalfHTMLStr, category),
      )
      setItems(items)
    }
  }, [data, isLoading])

  return { items }
}

export default useItems
