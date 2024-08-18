import { useEffect, useRef, useState } from 'react'
import './app.css'
import { Bookmark } from './components/bookmark'
import { Input } from './components/input'
import { Tag } from './components/tag'
import { useBookmarks } from './hooks/use-bookmarks'
import { useKeyboardNavigation } from './hooks/use-keyboard-navigation'

export const App = () => {
  useKeyboardNavigation()
  const [query, setQuery] = useState('')
  const { bookmarks, tags } = useBookmarks(query)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchQueryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <header className="app__header">
        <Input
          type="text"
          value={query}
          onChange={handleSearchQueryChange}
          spellCheck={false}
          ref={inputRef}
          data-component="search-input"
        />
        <div className="app__tags">
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>
      <div className="app__results">
        {bookmarks.map(bookmark => (
          <Bookmark key={bookmark.id} {...bookmark} />
        ))}
      </div>
    </>
  )
}
