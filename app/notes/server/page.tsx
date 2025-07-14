import React from 'react'
import CreateForm from './create'

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
      <CreateForm />
      <div className="grid grid-cols-4 gap-4">
        {notes?.data?.map((el: ListNotes) => (
          <div key={el.id} className="p-4 bg-white shadow-sm rounded-lg">
            <h1>{el.title}</h1>
            <p>{el.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
