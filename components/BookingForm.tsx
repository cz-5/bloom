'use client'

import { useState } from 'react'
import { Mail, Phone, User, FileText } from 'lucide-react'

interface BookingFormProps {
  onSubmit: (data: {
    name: string
    email: string
    phone: string
    notes: string
  }) => void
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب'
    if (!/^[0-9]{9,}$/.test(formData.phone.replace(/[\s-]/g, '')))
      newErrors.phone = 'رقم الهاتف غير صحيح'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">بيانات المريض</h2>
      <p className="text-center text-gray-600 mb-8">
        يرجى إدخال بيانات صحيحة وآمنة (جميع البيانات محفوظة بسرية تامة)
      </p>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="inline w-4 h-4 ml-2" />
            الاسم الكامل
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
            className={`input-field ${
              errors.name ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 ml-2" />
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`input-field ${
              errors.email ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 ml-2" />
            رقم الهاتف
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+966 50 1234 5678"
            className={`input-field ${
              errors.phone ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Notes Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 ml-2" />
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="يمكنك كتابة أي معلومات إضافية تود إخبار الطبيب بها"
            rows={4}
            className="input-field resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            ✓ جميع بيانات المريض محفوظة بسرية تامة ومشفرة
          </p>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
        >
          تأكيد الحجز
        </button>
      </form>
    </div>
  )
}