'use client'
import React, { useEffect, useState } from 'react'

interface ListNotes {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export default function Notes() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://service.pace11.my.id/api/notes')
      .then((res) => res.json())
      .then((data) => setData(data?.data || []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <ul>
          {data?.map((el: ListNotes) => <li key={el.id}>{el.title}</li>) || []}
        </ul>
      </div>
    </>
  )
}
