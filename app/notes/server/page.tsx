import React from 'react'

interface ListNotes {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

async function getNotes() {
  const notes = await fetch('https://service.pace11.my.id/api/notes').then(
    (res) => res.json(),
  )
  return notes
}

export default async function Notes() {
  const notes = await getNotes()

  return (
    <>
      <div>
        <ul>
          {notes?.data?.map((el: ListNotes) => (
            <li key={el.id}>{el.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
