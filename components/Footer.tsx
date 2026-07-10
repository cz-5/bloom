'use client'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container-ar py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <h3 className="text-xl font-bold">عيادة بلوم</h3>
            </div>
            <p className="text-gray-400">
              متخصصة في تقديم خدمات صحية نفسية آمنة وفعالة بأعلى معايير الخصوصية والأمان.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
              <li><a href="/assessment" className="hover:text-white transition">التقييم</a></li>
              <li><a href="/booking" className="hover:text-white transition">حجز موعد</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@bloom-clinic.com</li>
              <li>📱 +966 50 1234 5678</li>
              <li>📍 الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; 2024 عيادة بلوم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}