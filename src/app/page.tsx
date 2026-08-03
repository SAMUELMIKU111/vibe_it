import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  location: string
  description: string
  price_per_night: number
}

export default async function Home() {
  let listings: Listing[] | null = null
  let error: any = null

  try {
    const { data, error: queryError } = await supabase
      .from('listings')
      .select('*')

    console.log("SUPABASE ERROR:", queryError)
    listings = data
    error = queryError
  } catch (e) {
    console.error("FULL ERROR:", e)
    throw e
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 font-sans">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Trek Listings
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10">
          Find your next adventure
        </p>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50 p-6 text-red-700 dark:text-red-300">
            <p className="font-medium">Failed to load listings</p>
            <p className="text-sm mt-1 opacity-75">{error.message}</p>
          </div>
        )}

        {!error && (!listings || listings.length === 0) && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              No listings found yet.
            </p>
          </div>
        )}

        {listings && listings.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(listings as Listing[]).map((listing) => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {listing.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
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
                    {listing.location}
                  </p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {listing.description}
                </p>
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${listing.price_per_night}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {' '}/ night
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
