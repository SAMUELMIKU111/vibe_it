import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import BookingForm from '@/components/BookingForm'

interface Listing {
  id: string
  title: string
  location: string
  description: string
  price_per_night: number
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 font-sans">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-8"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to listings
          </Link>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Listing not found
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              The listing you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const item = listing as Listing

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 font-sans">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-8"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to listings
        </Link>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {item.title}
          </h1>

          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-6">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {item.location}
          </p>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-3">
              Description
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
            <div className="inline-flex items-baseline gap-1 rounded-xl bg-zinc-50 dark:bg-zinc-800 px-5 py-3">
              <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                ${item.price_per_night}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                / night
              </span>
            </div>
          </div>
        </div>

        <BookingForm listingId={item.id} />
      </div>
    </div>
  )
}
