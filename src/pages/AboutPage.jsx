import React from 'react';
import PageLayout from '../components/PageLayout';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import { FadeInUp } from '../components/AnimationWrappers';

export default function AboutPage() {
  return (
    <PageLayout 
      title="Mon Parcours" 
      subtitle="Un aperçu détaillé de mon expérience, mes formations et mes certifications."
    >
      <div className="space-y-20">
        <About /> 
        <Experience />
        <Education />
        <Certifications />
      </div>
    </PageLayout>
  );
}
