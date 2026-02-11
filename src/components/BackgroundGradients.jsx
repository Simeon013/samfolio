import { motion } from 'framer-motion';

export default function BackgroundGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"
        style={{ background: 'radial-gradient(circle at center, var(--color-accent-light) 0%, transparent 70%)', top: '-10%', right: '-10%' }}
      />
      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [20, -20, 20],
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[90px] opacity-30 animate-blob animation-delay-4000"
        style={{ background: 'radial-gradient(circle at center, #7C3AED 0%, transparent 70%)', bottom: '-10%', left: '-10%' }} // Using purple for variety
      />
      
      <motion.div
         animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full mix-blend-overlay filter blur-[100px] opacity-20"
        style={{ background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 60%)' }}
      />
    </div>
  );
}
