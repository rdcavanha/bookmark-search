import { forwardRef } from 'react'
import { clsx } from 'clsx'
import './input.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input className={clsx('input', className)} {...props} ref={ref} placeholder="Search bookmarks or tags" />
))
