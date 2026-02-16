import React from 'react';
import PageLayout from '../components/PageLayout';
import BioIdentity from '../components/BioIdentity';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* 1. Identity & Bio (Includes Languages) */}
        <BioIdentity /> 

        {/* 2. Security Clearance - Prominent */}
        <Certifications />
        
        {/* 3. Knowledge Modules */}
        <Education />

        {/* 4. System Logs (Experience) - Last */}
        <Experience />
      </div>
    </PageLayout>
  );
}
