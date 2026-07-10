'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { assessmentQuestions, getDoctorRecommendation } from '@/lib/assessmentLogic'

interface Answers {
  [key: string]: string | number
}

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)
  const [recommendedDoctor, setRecommendedDoctor] = useState<string | null>(null)

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - show results
      const recommendation = getDoctorRecommendation(answers)
      setRecommendedDoctor(recommendation)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
    setRecommendedDoctor(null)
  }

  const isCurrentAnswered = answers[assessmentQuestions[currentStep]?.id] !== undefined
  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-sage-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تم إكمال التقييم بنجاح!</h2>
          <p className="text-lg text-gray-600 mb-8">
            بناءً على إجاباتك، نوصيك بـ:
          </p>
          
          <div className="bg-primary-50 rounded-xl p-8 mb-8 border-2 border-primary-200">
            <p className="text-2xl font-bold text-primary-600 mb-3">
              {recommendedDoctor === 'omar_faouri'
                ? 'د. عمر الفاعوري'
                : 'د. عمر أسعد'}
            </p>
            <p className="text-gray-700 mb-4">
              {recommendedDoctor === 'omar_faouri'
                ? 'متخصص في العلاج النفسي والإدمان'
                : 'متخصص في الاكتئاب والاضطرابات والصدمات'}
            </p>
            <p className="text-gray-600 text-sm">
              {recommendedDoctor === 'omar_faouri'
                ? 'يقدم د. عمر الفاعوري علاجاً متقدماً للعلاجات السلوكية المعرفية وعلاج الإدمان.'
                : 'يتخصص د. عمر أسعد في علاج الاكتئاب والاضطرابات العامة والصدمات النفسية.'}
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            هذه توصية بناءً على إجاباتك. لديك الحرية الكاملة في اختيار الطبيب الذي تفضله عند حجز الموعد.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReset}
              className="btn-secondary text-center flex-1"
            >
              إعادة التقييم
            </button>
            <a
              href="/booking"
              className="btn-primary text-center flex-1"
            >
              احجز موعداً الآن
            </a>
          </div>
        </div>
      </div>
    )
  }

  const question = assessmentQuestions[currentStep]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-600">
            السؤال {currentStep + 1} من {assessmentQuestions.length}
          </span>
          <span className="text-sm font-semibold text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={answers[question.id] === option.value}
                onChange={() => handleAnswer(question.id, option.value)}
                className="w-5 h-5 text-primary-600 cursor-pointer"
              />
              <span className="mr-3 text-gray-800 font-medium flex-1 text-right">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          السابق
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentAnswered}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {currentStep === assessmentQuestions.length - 1 ? 'إنهاء' : 'التالي'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}