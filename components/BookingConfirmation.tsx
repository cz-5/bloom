'use client'

import { CheckCircle, Calendar, Clock, User, Mail, Phone } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialization: string
  icon: string
}

interface BookingData {
  doctorId: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

interface BookingConfirmationProps {
  bookingData: BookingData
  doctor?: Doctor
  onNewBooking: () => void
}

export function BookingConfirmation({
  bookingData,
  doctor,
  onNewBooking,
}: BookingConfirmationProps) {
  const dateObj = new Date(bookingData.date + 'T00:00:00')
  const formattedDate = dateObj.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-sage-600" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          تم حجز موعدك بنجاح! ✓
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          سيتم إرسال تأكيد الحجز على بريدك الإلكتروني
        </p>

        {/* Booking Details */}
        <div className="bg-primary-50 rounded-xl p-8 mb-8 border-2 border-primary-200 text-right">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">تفاصيل الموعد</h3>

          <div className="space-y-6">
            {/* Doctor Info */}
            {doctor && (
              <div className="flex items-start gap-4 pb-4 border-b border-primary-300">
                <span className="text-4xl flex-shrink-0">{doctor.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-600 font-semibold">الطبيب</p>
                  <p className="text-xl font-bold text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-primary-600 mt-1">{doctor.specialization}</p>
                </div>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-4 pb-4 border-b border-primary-300">
              <Calendar className="w-6 h-6 text-primary-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-600 font-semibold">التاريخ</p>
                <p className="text-lg font-bold text-gray-900">{formattedDate}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4 pb-4 border-b border-primary-300">
              <Clock className="w-6 h-6 text-primary-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-600 font-semibold">الوقت</p>
                <p className="text-lg font-bold text-gray-900">{bookingData.time}</p>
              </div>
            </div>

            {/* Patient Info */}
            <div className="pt-4 space-y-4">
              <h4 className="font-bold text-gray-900 mb-4">بيانات المريض</h4>
              
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">الاسم</p>
                  <p className="font-semibold text-gray-900">{bookingData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                  <p className="font-semibold text-gray-900 break-all">{bookingData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">رقم الهاتف</p>
                  <p className="font-semibold text-gray-900">{bookingData.phone}</p>
                </div>
              </div>

              {bookingData.notes && (
                <div className="pt-4 border-t border-primary-300">
                  <p className="text-sm text-gray-600 mb-2">ملاحظات إضافية</p>
                  <p className="text-gray-900">{bookingData.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-sage-50 rounded-lg p-6 mb-8 border-l-4 border-sage-600 text-right">
          <h4 className="font-bold text-sage-900 mb-3">📋 ملاحظات مهمة:</h4>
          <ul className="text-sm text-sage-800 space-y-2 text-right">
            <li>✓ سيتم تأكيد الموعد على البريد الإلكتروني المسجل</li>
            <li>✓ يرجى الحضور قبل الموعد بـ 10 دقائق</li>
            <li>✓ جميع البيانات محفوظة بسرية تامة</li>
            <li>✓ للإلغاء أو التعديل، تواصل معنا قبل الموعد بـ 24 ساعة</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="btn-secondary text-center flex-1"
          >
            العودة للرئيسية
          </a>
          <button
            onClick={onNewBooking}
            className="btn-primary text-center flex-1"
          >
            حجز موعد آخر
          </button>
        </div>
      </div>
    </div>
  )
}