import { useEffect, useState } from 'react'
import type { BookmarkProps } from '../components/bookmark'
import { getBookmarks } from '../services/bookmarks'
import { getUniqueTags } from '../services/tags'

const filterBookmarks = (query: string) => {
  const words = query.toLocaleLowerCase().split(' ')
  return (bookmark: BookmarkProps) => words.every(it => bookmark.title.toLowerCase().includes(it))
}

let allBookmarks: BookmarkProps[] = []
let allTags: string[] = []

export const useBookmarks = (query: string) => {
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      const result = await getBookmarks()
      allBookmarks = result.bookmarks
      allTags = result.tags
      setBookmarks(allBookmarks)
      setTags(allTags)
    })()
  }, [])

  useEffect(() => {
    if (!query) {
      setBookmarks(allBookmarks)
      setTags(allTags)
    }
    else {
      const filteredBookmarks = allBookmarks.filter(filterBookmarks(query))
      const filteredTags = getUniqueTags(filteredBookmarks)
      setBookmarks(filteredBookmarks)
      setTags(filteredTags)
    }
  }, [query])

  return { bookmarks, tags }
}
