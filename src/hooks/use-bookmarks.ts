import { useEffect, useMemo, useState } from 'react'
import type { BookmarkProps } from '../components/bookmark'
import { getBookmarks } from '../services/bookmarks'
import { getTags } from '../services/tags'

const filterBookmarks = (query: string) => {
  const words = query.toLocaleLowerCase().split(' ')
  return (bookmark: BookmarkProps) => words.every(word => bookmark.title.toLowerCase().includes(word))
}

export const useBookmarks = (query: string) => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([])
  const [tags, setTags] = useState<[string, number][]>([])

  useEffect(() => {
    void (async () => {
      const result = await getBookmarks()
      setBookmarks(result.bookmarks)
      setTags(result.tags)
    })()
  }, [])

  return useMemo(() => {
    if (!query) {
      return { bookmarks, tags }
    }
    const filteredBookmarks = bookmarks.filter(filterBookmarks(query))
    const filteredTags = getTags(filteredBookmarks)
    return { bookmarks: filteredBookmarks, tags: filteredTags }
  }, [query, bookmarks, tags])
}
