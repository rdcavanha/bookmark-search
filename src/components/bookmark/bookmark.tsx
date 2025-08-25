import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './bookmark.css'
import { memo } from 'react'

dayjs.extend(relativeTime)

export type BookmarkProps = {
  title: string
  url: string
  breadcrumbs: string[]
  dateAdded?: number
  id: string
  tags: string[]
}

const getFaviconUrl = (url: string) => {
  const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'))
  faviconUrl.searchParams.set('pageUrl', url)
  faviconUrl.searchParams.set('size', '32')
  return faviconUrl.toString()
}

export const Bookmark = memo(({ title, url, breadcrumbs, dateAdded }: BookmarkProps) => (
  <a href={url} target="_blank" className="bookmark" rel="noreferrer" data-component="bookmark" title={url}>
    <span className="bookmark__title">
      <img src={getFaviconUrl(url)} className="bookmark__favicon" alt="Favicon" />
      <span>{title}</span>
    </span>
    <span className="bookmark__metadata">
      <span>{breadcrumbs.join('/')}</span>
      {dateAdded !== undefined
        ? (
            <span>
              {'\u00A0'}
              - Added
              {'\u00A0'}
              {dayjs().to(dayjs(dateAdded))}
            </span>
          )
        : null}
    </span>
  </a>
))
