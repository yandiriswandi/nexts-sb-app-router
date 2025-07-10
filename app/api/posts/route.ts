import { NextResponse } from 'next/server'

// Dummy in-memory notes (simulasi data sementara)
const notes = [
  { id: '1', title: 'Note 1', description: 'Description 1' },
  { id: '2', title: 'Note 2', description: 'Description 2' },
]

// GET: Ambil semua notes atau cari berdasarkan query parameter `name`
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (name) {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(name.toLowerCase()),
    )
    return NextResponse.json({ data: filtered }, { status: 200 })
  }

  return NextResponse.json({ data: notes }, { status: 200 })
}

// POST: Tambah note baru
export async function POST(req: Request) {
  const body = await req.json()
  const newNote = {
    id: String(notes.length + 1),
    title: body.title ?? 'Untitled',
    description: body.description ?? '',
  }
  notes.push(newNote)
  return NextResponse.json(
    { message: 'Note created', note: newNote },
    { status: 201 },
  )
}

// PUT: Update note berdasarkan `id` di body
export async function PUT(req: Request) {
  const body = await req.json()
  const { id, title, description } = body
  const index = notes.findIndex((note) => note.id === id)

  if (index === -1) {
    return NextResponse.json({ message: 'Note not found' }, { status: 404 })
  }

  notes[index] = {
    ...notes[index],
    title: title ?? notes[index].title,
    description: description ?? notes[index].description,
  }

  return NextResponse.json(
    { message: 'Note updated', note: notes[index] },
    { status: 200 },
  )
}

// DELETE: Hapus note berdasarkan `id` di query string
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'Missing note id' }, { status: 400 })
  }

  const index = notes.findIndex((note) => note.id === id)

  if (index === -1) {
    return NextResponse.json({ message: 'Note not found' }, { status: 404 })
  }

  const deleted = notes.splice(index, 1)[0]
  return NextResponse.json(
    { message: 'Note deleted', note: deleted },
    { status: 200 },
  )
}
