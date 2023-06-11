import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export type Book = {
  id: string
  imgUrl: string
  link: string
  title: string
  pub: {
    author: string
    translator?: string
    publisher: string
    date: string
  }
  rating: number
  date: string
  tags: string
}

type Props = {
  item: any
}

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div
      onClick={() => window.open(item.link)}
      className="cursor-pointer flex gap-10 bg-white shadow-md rounded-lg px-3 hover:scale-[1.05] transition-all duration-200"
    >
      <div className="h-[232px] flex flex-col justify-center">
        <img src={item.imgUrl} width={135} className="rounded-md" />
      </div>
      <div className="flex-1 flex flex-col gap-3 justify-center">
        <p className="font-medium text-lg text-gray-700">{item.title}</p>
        <p className="text-gray-500">{item.pub?.author}</p>
        <p className="text-gray-400">{item.date}</p>
        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.split(' ').map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-700 rounded-md text-xs px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Item
