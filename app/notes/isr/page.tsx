import Link from 'next/link'

interface ListNotes {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

interface Notes {
  success: boolean
  message: string
  data: ListNotes[]
}
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.

export default async function Page() {
  const notes: Notes = await fetch(
    `https://service.pace11.my.id/api/notes`,
  ).then((res) => res.json())
  return (
    <>
      <div>
        <ul>
          {notes?.data?.map((note: ListNotes) => (
            <Link key={note.id} href={`/notes/isr/${note.id}`}>
              <li
                style={{
                  border: '1px solid black',
                  marginBottom: '10px',
                  padding: '8px',
                  borderRadius: '8px',
                }}
                className="hover:bg-blue-200"
              >
                {note.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}
