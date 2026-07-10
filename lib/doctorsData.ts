export interface Doctor {
  id: string
  name: string
  specialization: string
  description: string
  icon: string
  focus: string[]
}

export const doctorsData: Doctor[] = [
  {
    id: 'omar_faouri',
    name: 'د. عمر الفاعوري',
    specialization: 'متخصص في العلاج النفسي والإدمان',
    description:
      'متخصص في العلاج النفسي المتقدم وعلاج الإدمان والعلاجات السلوكية المعرفية. يقدم د. عمر الفاعوري حلولاً علاجية متقدمة وفعالة.',
    icon: '👨‍⚕️',
    focus: ['العلاج النفسي', 'الإدمان', 'العلاج السلوكي المعرفي'],
  },
  {
    id: 'omar_asaad',
    name: 'د. عمر أسعد',
    specialization: 'متخصص في الاكتئاب والاضطرابات والصدمات',
    description:
      'متخصص في علاج الاكتئاب والاضطرابات العامة والصدمات الناتجة عن الكوارث البشرية. يتمتع بخبرة عميقة في معالجة الحالات النفسية المعقدة.',
    icon: '👨‍⚕️',
    focus: ['الاكتئاب', 'الاضطرابات', 'علاج الصدمات'],
  },
]

export const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
]