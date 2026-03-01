import React from 'react'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  hover?: boolean
}

const Card: React.FC<Props> = ({ children, style = {}, onClick, hover }) => (
  <div
    onClick={onClick}
    className={hover ? 'card-hover' : undefined}
    style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 16, padding: 24,
      transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
      cursor: onClick ? 'pointer' : 'default',
      boxShadow: 'var(--shadow-sm)',
      ...style,
    }}
  >{children}</div>
)
export default Card
