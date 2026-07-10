'use client'

import { AssessmentWizard } from '@/components/AssessmentWizard'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Navbar />
      <div className="container-ar py-12">
        <AssessmentWizard />
      </div>
      <Footer />
    </div>
  )
}