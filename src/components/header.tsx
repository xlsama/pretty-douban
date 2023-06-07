import { useEffect, useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { getCookie } from '@/utils/cookie'

type Props = {
  avatar: string
  stats: {
    book: {
      do: number
      wish: number
      collect: number
    }
    movie: {
      do: number
      wish: number
      collect: number
    }
  }
  uid: string
  category: string
  tab: string
  onCategoryChange: (value: 'book' | 'movie') => void
  onTabChange: (value: string) => void
}

const Header: React.FC<Props> = ({ avatar, uid, category, tab, onCategoryChange, onTabChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const listener = ({ key }: { key: string }) => {
      if (key === 's' || key === 'S') {
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  const logout = async () => {
    await fetch(`https://www.douban.com/accounts/logout?source=${category}&ck=${getCookie('ck')}`, {
      method: 'GET',
    })
    window.location.href = `https://accounts.douban.com/passport/login?source=${category}`
  }

  const placeholder = category === 'book' ? '搜索书名、作者、ISBN' : '搜索电影、电视剧、综艺、影人'
  const tabText = category === 'book' ? '读' : '看'

  return (
    <header className="h-[70px] flex items-center justify-between">
      <div className="flex items-center flex-1">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">图书</SelectItem>
            <SelectItem value="movie">电影</SelectItem>
          </SelectContent>
        </Select>
        <Tabs value={tab} className="w-[250px] ml-32" onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="do">在{tabText}</TabsTrigger>
            <TabsTrigger value="wish">想{tabText}</TabsTrigger>
            <TabsTrigger value="collect">{tabText}过</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative">
          <Input placeholder={placeholder} className="w-[400px] ml-40" ref={inputRef} />
          <Badge variant="secondary" className="absolute right-2 top-2/4 -translate-y-2/4">
            S
          </Badge>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger style={{ outline: 'none' }}>
          <Avatar>
            <AvatarImage src={avatar} alt={uid} />
            <AvatarFallback>{uid}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{uid}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => window.open('https://www.douban.com/mine/orders')}>
            我的订单
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open('https://www.douban.com/mine/wallet')}>
            我的钱包
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => window.open('https://accounts.douban.com/passport/setting')}
          >
            账号管理
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>退出</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
