import './tag.css'

type TagProps = {
  children: React.ReactNode
}

export const Tag = (props: TagProps) => <div className="tag" {...props} />
