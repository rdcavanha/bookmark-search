import type { BookmarkProps } from '../components/bookmark'

export const extractTags = (text: string): string[] => text.match(/#\w+(?=(?:\s+#\w+)*\s*$)/g) || []

export const getUniqueTags = (flatBookmarks: BookmarkProps[]): string[] =>
  Array.from(
    flatBookmarks.reduce<Set<string>>((acc: Set<string>, curr: BookmarkProps) => {
      curr.tags.forEach(tag => acc.add(tag))
      return acc
    }, new Set()),
  )
