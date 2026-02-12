import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';
import { FadeInUp } from '../components/AnimationWrappers';

export default function AboutPage() {
  return (
    <div className="w-full max-w-full overflow-x-clip bg-[var(--color-bg-primary)] min-h-screen pt-20">
      <Navbar />
      <main className="w-full overflow-x-clip container mx-auto px-4 py-12 space-y-20">
        <FadeInUp>
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-center mb-8">Mon Parcours</h1>
        </FadeInUp>
        
        {/* We can refactor About to be 'Full' here or just use the summary component user liked */}
        {/* For now, let's include the detailed sections which define the 'Full About' */}
        
        <About /> 
        <Experience />
        <Education />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
