import type { BookmarkProps } from '../components/bookmark'
import { extractTags, getUniqueTags } from './tags'

const byDateAdded = (a: BookmarkProps, b: BookmarkProps) => {
  const dateA = a.dateAdded ?? 0
  const dateB = b.dateAdded ?? 0
  if (dateA < dateB)
    return 1
  if (dateA > dateB)
    return -1
  return 0
}

const adaptChromeBookmarks = (initialBookmarks: chrome.bookmarks.BookmarkTreeNode[]): BookmarkProps[] => {
  const breadcrumbs: Record<string, string[]> = {}

  const adapt = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]): BookmarkProps[] =>
    bookmarks.reduce<BookmarkProps[]>((acc, node) => {
      if (node.url !== undefined) {
        return [
          ...acc,
          {
            id: node.id,
            title: node.title,
            url: node.url,
            breadcrumbs: node.parentId !== undefined ? breadcrumbs[node.parentId] || [] : [],
            dateAdded: node.dateAdded,
            tags: extractTags(node.title),
          },
        ]
      }
      if (node.children) {
        if (node.title) {
          if (node.parentId !== undefined && breadcrumbs[node.parentId]) {
            breadcrumbs[node.id] = [...(breadcrumbs[node.parentId] || []), node.title]
          }
          else {
            breadcrumbs[node.id] = [node.title]
          }
        }
        return [...acc, ...adapt(node.children)]
      }
      return acc
    }, [])

  return adapt(initialBookmarks).sort(byDateAdded)
}

export const getBookmarks = async (): Promise<{ bookmarks: BookmarkProps[], tags: string[] }> =>
  new Promise((resolve) => {
    chrome.bookmarks.getTree((results) => {
      const bookmarks = adaptChromeBookmarks(results)
      const tags = getUniqueTags(bookmarks)
      resolve({ bookmarks, tags })
    })
  })
