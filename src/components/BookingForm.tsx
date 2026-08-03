'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface BookingFormProps {
  listingId: string
}

export default function BookingForm({ listingId }: BookingFormProps) {
  const [guestName, setGuestName] = useState('')
  const [guestContact, setGuestContact] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const { error } = await supabase.from('bookings').insert({
      listing_id: listingId,
      guest_name: guestName,
      guest_contact: guestContact,
      check_in: checkIn,
      check_out: checkOut,
      status: 'pending',
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
    } else {
      setIsSuccess(true)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
          Booking request sent!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          The host will contact you to confirm.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
        Book this listing
      </h2>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 p-4 text-sm text-red-700 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="guest-name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Your name
          </label>
          <input
            id="guest-name"
            type="text"
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="guest-contact"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            Phone or email
          </label>
          <input
            id="guest-contact"
            type="text"
            required
            value={guestContact}
            onChange={(e) => setGuestContact(e.target.value)}
            placeholder="you@example.com or +1 234 567 890"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="check-in"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Check-in date
            </label>
            <input
              id="check-in"
              type="date"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="check-out"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Check-out date
            </label>
            <input
              id="check-out"
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none transition-colors focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 px-5 py-3 text-sm font-semibold text-white dark:text-zinc-900 transition-all hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending request...' : 'Request to book'}
      </button>
    </form>
  )
}
