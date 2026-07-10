'use client'

import { Brain, Calendar, Shield, Users } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'تقييم ذكي',
      description: 'نظام متقدم لتقييم حالتك النفسية وتوصيتك بالطبيب المناسب',
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'أطباء نفسيون ذو خبرة في مختلف المجالات النفسية',
    },
    {
      icon: Shield,
      title: 'خصوصية كاملة',
      description: 'جميع بيانات المريض محفوظة وآمنة بأعلى معايير الأمان',
    },
    {
      icon: Calendar,
      title: 'حجز سهل',
      description: 'نظام حجز مواعيد بسيط وسريع متاح 24/7',
    },
  ]

  return (
    <section className="container-ar py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title">لماذا عيادة بلوم؟</h2>
        <div className="flex justify-center mb-4">
          <div className="divider"></div>
        </div>
        <p className="section-subtitle">نحن نقدم خدمات صحية نفسية شاملة وآمنة</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="card-hover text-center"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}