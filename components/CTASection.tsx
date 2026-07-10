'use client'

import Link from 'next/link'

export function CTASection() {
  return (
    <section className="container-ar py-20">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl px-8 py-16 md:py-24 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          هل أنت مستعد للبداية؟
        </h2>
        <p className="text-xl mb-8 text-primary-50 max-w-2xl mx-auto">
          خذ الخطوة الأولى نحو صحة نفسية أفضل. قيم حالتك الآن واحجز موعداً مع الطبيب المناسب لك.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/assessment"
            className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            ابدأ التقييم
          </Link>
          <Link
            href="/booking"
            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-primary-800 transition-colors font-bold text-lg"
          >
            احجز الآن
          </Link>
        </div>
      </div>
    </section>
  )
}