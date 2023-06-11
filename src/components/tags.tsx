import { Button } from '@/components/ui/button'

type Props = {
  tagList: { name: string; count: number }[]
  tag: string
  setTag: (tag: string) => void
}

const Tags: React.FC<Props> = ({ tagList, tag, setTag }) => {
  return (
    <section className="tags flex gap-4 flex-wrap">
      {tagList.map(item => (
        <Button
          key={item.name}
          variant={item.name === tag ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTag(item.name === tag ? '' : item.name)}
          className="font-normal"
        >
          {item.name}
        </Button>
      ))}
    </section>
  )
}

export default Tags
