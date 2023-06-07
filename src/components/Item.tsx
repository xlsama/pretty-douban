import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <Card className="overflow-hidden">
      <img className="rounded-md object-cover" src={item.imgUrl} />
      <CardContent>
        <p>{item.title}</p>
        <p>{item.pub.author}</p>
        <p>{item.date}</p>
        <p>{item.tags}</p>
      </CardContent>
    </Card>
  )
}

export default Item
