import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import usePeople from '@/hooks/usePeople'
import Tags from '@/components/tags'
import Item from '@/components/Item'
import useItems from '@/hooks/useItems'

function App() {
  const uid = useMemo(() => location.pathname.split('/')?.at(2) ?? '', [])
  const [category, setCategory] = useState<'book' | 'movie'>('book')
  const [tab, setTab] = useState<string>('do')
  const { avatar, stats } = usePeople(uid)
  const { items } = useItems(uid, category, tab)

  console.log({ items })

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
      <Tags />
      <main className="mt-6 grid grid-cols-7 gap-10">
        {items.map((item, index) => {
          return <Item key={index} item={item} />
        })}
      </main>
    </div>
  )
}

export default App
