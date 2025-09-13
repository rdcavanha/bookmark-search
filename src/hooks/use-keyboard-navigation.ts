import { useEffect } from 'react'

let lastFocusedBookmarkElement: HTMLElement | null = null

const isBookmarkElement = (element: Element | null): element is HTMLAnchorElement =>
  element?.getAttribute('data-component') === 'bookmark'

const getSearchInputElement = (): HTMLInputElement | null =>
  document.querySelector('[data-component="search-input"]')

const getFirstBookmarkElement = (): HTMLAnchorElement | null => document.querySelector('[data-component="bookmark"]')

const handleArrowDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const searchInput = getSearchInputElement()
  if (target === searchInput) {
    e.preventDefault()
    if (lastFocusedBookmarkElement && document.body.contains(lastFocusedBookmarkElement)) {
      lastFocusedBookmarkElement.focus()
    }
    else {
      const firstBookmarkElement = getFirstBookmarkElement()
      firstBookmarkElement?.focus()
      lastFocusedBookmarkElement = firstBookmarkElement
    }
  }
  else if (isBookmarkElement(target) && isBookmarkElement(target.nextElementSibling)) {
    e.preventDefault()
    target.nextElementSibling.focus()
    lastFocusedBookmarkElement = target.nextElementSibling
  }
}

const handleArrowUp = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const searchInput = getSearchInputElement()
  if (target === searchInput) {
    e.preventDefault()
    if (
      lastFocusedBookmarkElement
      && document.body.contains(lastFocusedBookmarkElement)
      && lastFocusedBookmarkElement !== getFirstBookmarkElement()
    ) {
      lastFocusedBookmarkElement.focus()
    }
  }
  else if (isBookmarkElement(target)) {
    e.preventDefault()
    if (isBookmarkElement(target.previousElementSibling)) {
      target.previousElementSibling.focus()
      lastFocusedBookmarkElement = target.previousElementSibling
    }
    else {
      searchInput?.focus()
    }
  }
}

const handleTab = (e: KeyboardEvent) => {
  e.preventDefault()
  if (e.shiftKey) {
    handleArrowUp(e)
  }
  else {
    handleArrowDown(e)
  }
}

const focusSearchInputElement = (e: KeyboardEvent) => {
  e.preventDefault()
  const searchInput = getSearchInputElement()
  if (searchInput) {
    searchInput.focus()
    searchInput.select()
  }
}

const typeInSearchInputElement = () => {
  const searchInput = getSearchInputElement()
  if (searchInput && document.activeElement !== searchInput) {
    searchInput.focus()
  }
}

export const useKeyboardNavigation = () => {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent): void {
      const target = e.target as HTMLElement | null
      if (target) {
        if (e.key === 'ArrowDown')
          return handleArrowDown(e)
        if (e.key === 'ArrowUp')
          return handleArrowUp(e)
        if (e.key === 'F3' || (e.key === 'f' && e.ctrlKey))
          return focusSearchInputElement(e)
        if (e.key === 'a' && (e.ctrlKey || e.metaKey))
          return focusSearchInputElement(e)
        if (e.key === 'Tab')
          return handleTab(e)
        if (e.key !== 'Enter' && e.key !== 'Shift')
          return typeInSearchInputElement()
      }
      return undefined
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])
}
