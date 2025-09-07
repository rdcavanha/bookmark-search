import clsx from 'clsx'
import './tag.css'

type TagProps = {
  tag: string
  count?: number
  className?: string
}

export const Tag = ({ tag, count, className, ...props }: TagProps) => (
  <span className={clsx('tag', className, count !== undefined ? 'tag--with-count' : 'tag--without-count')} {...props}>
    {tag}
    {count !== undefined ? <span className="tag__count">{count}</span> : null}
  </span>
)
