export interface Question {
  id: string
  question: string
  options: Array<{
    label: string
    value: string
  }>
}

export const assessmentQuestions: Question[] = [
  {
    id: 'gender',
    question: 'ما هو جنسك؟',
    options: [
      { label: 'ذكر', value: 'male' },
      { label: 'أنثى', value: 'female' },
    ],
  },
  {
    id: 'main_concern',
    question: 'ما هو أساسي الذي تعاني منه؟',
    options: [
      { label: 'القلق والتوتر', value: 'anxiety' },
      { label: 'الاكتئاب', value: 'depression' },
      { label: 'مشاكل الإدمان أو التعاطي', value: 'addiction' },
      { label: 'صدمة نفسية أو كارثة', value: 'trauma' },
      { label: 'اضطرابات أخرى', value: 'other' },
    ],
  },
  {
    id: 'duration',
    question: 'كم من الوقت تعاني من هذه الحالة؟',
    options: [
      { label: 'أقل من شهر', value: 'less_month' },
      { label: 'من شهر إلى ثلاثة أشهر', value: '1_3_months' },
      { label: 'من ثلاثة إلى ستة أشهر', value: '3_6_months' },
      { label: 'أكثر من ستة أشهر', value: 'more_6_months' },
    ],
  },
  {
    id: 'severity',
    question: 'كم تؤثر حالتك على حياتك اليومية؟',
    options: [
      { label: 'تأثير طفيف', value: 'mild' },
      { label: 'تأثير متوسط', value: 'moderate' },
      { label: 'تأثير كبير جداً', value: 'severe' },
    ],
  },
  {
    id: 'treatment_history',
    question: 'هل تلقيت أي علاج نفسي من قبل؟',
    options: [
      { label: 'نعم', value: 'yes' },
      { label: 'لا', value: 'no' },
      { label: 'ربما، لست متأكداً', value: 'unsure' },
    ],
  },
  {
    id: 'need_intensive',
    question: 'هل تشعر أنك تحتاج إلى علاج مكثف وعميق؟',
    options: [
      { label: 'نعم، أحتاج علاج عميق', value: 'yes' },
      { label: 'لا، أريد مساعدة عامة', value: 'no' },
      { label: 'لست متأكداً', value: 'unsure' },
    ],
  },
]

export function getDoctorRecommendation(
  answers: Record<string, string | number>
): string {
  const mainConcern = answers.main_concern as string
  const gender = answers.gender as string
  const needsIntensive = answers.need_intensive as string

  let score = {
    omar_faouri: 0, // العلاج النفسي والإدمان
    omar_asaad: 0, // الاكتئاب والاضطرابات والصدمات
  }

  // Main concern routing
  if (mainConcern === 'addiction') {
    score.omar_faouri += 10
  } else if (
    mainConcern === 'depression' ||
    mainConcern === 'anxiety' ||
    mainConcern === 'trauma'
  ) {
    score.omar_asaad += 8
  } else if (mainConcern === 'other') {
    score.omar_faouri += 3
    score.omar_asaad += 3
  }

  // Intensive treatment preference
  if (needsIntensive === 'yes') {
    score.omar_faouri += 3
  } else if (needsIntensive === 'no') {
    score.omar_asaad += 2
  }

  // Gender preference: Female gets higher score for Omar Asaad
  if (gender === 'female') {
    if (
      mainConcern === 'depression' ||
      mainConcern === 'anxiety' ||
      mainConcern === 'trauma' ||
      mainConcern === 'other'
    ) {
      score.omar_asaad += 2
    }
  }

  // Return the doctor with higher score
  return score.omar_faouri >= score.omar_asaad
    ? 'omar_faouri'
    : 'omar_asaad'
}