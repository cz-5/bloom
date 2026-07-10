'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react'
import { doctorsData, timeSlots } from '@/lib/doctorsData'
import { BookingForm } from './BookingForm'
import { BookingConfirmation } from './BookingConfirmation'

interface BookingData {
  doctorId: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

export function BookingSystem() {
  const [currentStep, setCurrentStep] = useState<'doctor' | 'datetime' | 'form' | 'confirmation'>('doctor')
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    setCurrentStep('datetime')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectDateTime = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      setCurrentStep('form')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmitForm = (formData: Omit<BookingData, 'doctorId' | 'date' | 'time'>) => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const data: BookingData = {
        ...formData,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      }
      setBookingData(data)
      saveBooking(data)
      setCurrentStep('confirmation')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNewBooking = () => {
    setCurrentStep('doctor')
    setSelectedDoctor(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setBookingData(null)
  }

  // Save booking to localStorage
  const saveBooking = (data: BookingData) => {
    try {
      const bookings = JSON.parse(localStorage.getItem('bloom_bookings') || '[]')
      bookings.push({
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('bloom_bookings', JSON.stringify(bookings))
    } catch (error) {
      console.error('Error saving booking:', error)
    }
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          {['doctor', 'datetime', 'form', 'confirmation'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === step
                    ? 'bg-primary-600 text-white'
                    : ['doctor', 'datetime', 'form', 'confirmation'].indexOf(currentStep) > index
                    ? 'bg-sage-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    ['doctor', 'datetime', 'form', 'confirmation'].indexOf(currentStep) > index
                      ? 'bg-sage-600'
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Selection */}
      {currentStep === 'doctor' && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">اختر طبيبك</h2>
          <p className="text-center text-gray-600 mb-12">اختر الطبيب الذي تفضل استشارته</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {doctorsData.map((doctor) => (
              <div
                key={doctor.id}
                className="card-hover cursor-pointer border-2 border-transparent hover:border-primary-500"
                onClick={() => handleSelectDoctor(doctor.id)}
              >
                <div className="text-5xl mb-4 text-center">{doctor.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{doctor.name}</h3>
                <p className="text-primary-600 font-semibold text-center mb-4">{doctor.specialization}</p>
                <p className="text-gray-600 text-center mb-6">{doctor.description}</p>
                <button className="btn-primary w-full">
                  اختر د. {doctor.name.split(' ')[1]}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DateTime Selection */}
      {currentStep === 'datetime' && selectedDoctor && (
        <div>
          <button
            onClick={() => setCurrentStep('doctor')}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← العودة
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            اختر التاريخ والوقت
          </h2>
          <p className="text-center text-gray-600 mb-12">
            د. {doctorsData.find(d => d.id === selectedDoctor)?.name.split(' ')[1]}
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Calendar */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary-600" />
                اختر التاريخ
              </h3>
              <SimpleCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            {/* Time Slots */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-600" />
                اختر الوقت
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-200 text-gray-700 hover:border-primary-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleSelectDateTime}
              disabled={!selectedDate || !selectedTime}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {currentStep === 'form' && (
        <div>
          <button
            onClick={() => setCurrentStep('datetime')}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← العودة
          </button>
          <BookingForm onSubmit={handleSubmitForm} />
        </div>
      )}

      {/* Confirmation */}
      {currentStep === 'confirmation' && bookingData && (
        <BookingConfirmation
          bookingData={bookingData}
          doctor={doctorsData.find(d => d.id === selectedDoctor)}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  )
}

// Simple Calendar Component
function SimpleCalendar(
  { selectedDate, onSelectDate }: { selectedDate: string | null; onSelectDate: (date: string) => void }
) {
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div>
      <div className="text-center font-bold text-gray-900 mb-4">
        {today.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-600 mb-3">
        {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {daysArray.map(day => {
          const date = new Date(today.getFullYear(), today.getMonth(), day)
          const dateStr = date.toISOString().split('T')[0]
          const isSelected = selectedDate === dateStr
          const isPast = date < today

          return (
            <button
              key={day}
              onClick={() => !isPast && onSelectDate(dateStr)}
              disabled={isPast}
              className={`p-2 rounded-lg font-semibold transition-all ${
                isSelected
                  ? 'bg-primary-600 text-white'
                  : isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-2 border-gray-200 text-gray-700 hover:border-primary-400'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}