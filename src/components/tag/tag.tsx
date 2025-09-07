import './tag.css'

type TagProps = {
  tag: string
  count: number
}

export const Tag = ({ tag, count, ...props }: TagProps) => (
  <div className="tag" {...props}>
    {tag}
    <span className="tag__count">{count}</span>
  </div>
)
