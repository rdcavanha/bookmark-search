import type { BookmarkProps } from '../components/bookmark'

export const extractTags = (text: string): string[] => text.match(/#\w+(?=(?:\s+#\w+)*\s*$)/g) || []

export const getTags = (flatBookmarks: BookmarkProps[]): [string, number][] => {
  const tags = flatBookmarks.reduce<Record<string, number>>((acc, curr) => {
    curr.tags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {})
  return Object.entries(tags).sort(([, countA], [, countB]) => countB - countA)
}
