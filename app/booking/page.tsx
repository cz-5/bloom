'use client'

import { BookingSystem } from '@/components/BookingSystem'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Navbar />
      <div className="container-ar py-12">
        <BookingSystem />
      </div>
      <Footer />
    </div>
  )
}