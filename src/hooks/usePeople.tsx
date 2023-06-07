import { GM_xmlhttpRequest } from '$'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) =>
  new Promise<string>(resolve => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      onload: function (response) {
        resolve(response.responseText)
      },
    })
  })

const usePeople = (uid: string) => {
  const [avatar, setAvatar] = useState('')
  const [stats, setStats] = useState({
    book: { do: 0, wish: 0, collect: 0 },
    movie: { do: 0, wish: 0, collect: 0 },
  })

  const { data, isLoading } = useSWR(`https://www.douban.com/people/${uid}`, fetcher)

  useEffect(() => {
    if (!isLoading && data) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(data, 'text/html')
      const avatarUrl = doc.querySelector('#db-usr-profile img')?.getAttribute('src')
      const bookCounts = Array.from(doc.querySelectorAll('#book .pl a')).map(
        el => parseInt(el.textContent ?? '') || 0,
      )
      const book = { do: bookCounts[0], wish: bookCounts[1], collect: bookCounts[2] }
      const movieCounts = Array.from(doc.querySelectorAll('#movie .pl a')).map(
        el => parseInt(el.textContent ?? '') || 0,
      )
      const movie = { do: movieCounts[0], wish: movieCounts[1], collect: movieCounts[2] }

      setAvatar(avatarUrl ?? '')
      setStats({ book, movie })
    }
  }, [data, isLoading])

  return { avatar, stats }
}

export default usePeople
