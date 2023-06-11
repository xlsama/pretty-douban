import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import usePeople from '@/hooks/usePeople'
import Tags from '@/components/tags'
import Item from '@/components/Item'
import useItems from '@/hooks/useItems'

function App() {
  const uid = useMemo(() => location.pathname.split('/')?.at(2) ?? '', [])
  const [category, setCategory] = useState<'book' | 'movie'>(
    window.location.host.includes('movie') ? 'movie' : 'book',
  )
  const [tab, setTab] = useState<string>('do')
  const [tag, setTag] = useState('')
  const { avatar, stats } = usePeople(uid)
  const { items, tagList, setCurrentPage, isLoading } = useItems(uid, category, tab, tag)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 250) {
        if (isLoading) return
        setCurrentPage(pre => pre + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])

  return (
    <div className="app min-h-screen px-[7vw] pb-20">
      <Header
        avatar={avatar}
        stats={stats}
        uid={uid}
        category={category}
        tab={tab}
        onCategoryChange={setCategory}
        onTabChange={setTab}
      />
      <Separator className="my-4" />
      <Tags tagList={tagList} tag={tag} setTag={setTag} />
      <main className="mt-6 grid grid-cols-4 gap-12">
        {items.map((item, index) => {
          return <Item key={index} item={item} />
        })}
      </main>
    </div>
  )
}

export default App
