import React from 'react'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <p>About Layout</p>
      <div>{children}</div>
    </div>
  )
}
