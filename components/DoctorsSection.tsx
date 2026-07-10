'use client'

export function DoctorsSection() {
  const doctors = [
    {
      name: 'د. عمر الفاعوري',
      specialization: 'متخصص في العلاج النفسي والإدمان',
      bio: 'متخصص في العلاج النفسي المتقدم وعلاج الإدمان والعلاجات السلوكية المعرفية.',
      icon: '👨‍⚕️',
      focus: ['العلاج النفسي', 'الإدمان', 'العلاج السلوكي المعرفي'],
    },
    {
      name: 'د. عمر أسعد',
      specialization: 'متخصص في الاكتئاب والاضطرابات والصدمات',
      bio: 'متخصص في علاج الاكتئاب والاضطرابات العامة والصدمات الناتجة عن الكوارث البشرية.',
      icon: '👨‍⚕️',
      focus: ['الاكتئاب', 'الاضطرابات', 'علاج الصدمات'],
    },
  ]

  return (
    <section id="about" className="container-ar py-20">
      <div className="text-center mb-16">
        <h2 className="section-title">فريقنا المتخصص</h2>
        <div className="flex justify-center mb-4">
          <div className="divider"></div>
        </div>
        <p className="section-subtitle">أطباء مختصون وذو خبرة عالية في الصحة النفسية</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="card-hover"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`,
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-6xl">{doctor.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-primary-600 font-semibold">{doctor.specialization}</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{doctor.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              {doctor.focus.map((item, idx) => (
                <span key={idx} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}