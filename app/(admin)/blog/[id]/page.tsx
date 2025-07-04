'use client'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'

// ini adalah server component
// export default async function BlogDetail({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ id: string }>
//   searchParams?: { [key: string]: string | string[] | undefined }
// }) {
//   const id = (await params).id
//   console.log(searchParams?.user)
//   return <div>Blog Detail Page {id}</div>
// }

export default function BlogDetail() {
  const params = useParams()
  const search = useSearchParams()
  //jadikan semua query ke dalam object
  const query = Object.fromEntries(search.entries())
  const user = search.get('user')
  console.log(query.user, query.age)

  return (
    <div>
      Blog Detail Page dynamic : {params.id}, user : {query.user}, age :{' '}
      {query.age}
    </div>
  )
}
