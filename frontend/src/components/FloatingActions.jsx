import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <motion.a
      href="https://s.id/konsultasi-data"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="fab-whatsapp"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl"
      style={{
        background: '#25D366',
        boxShadow: '0 8px 32px rgba(37, 211, 102, 0.45), 0 0 0 4px rgba(37, 211, 102, 0.12)',
      }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: 'rgba(37, 211, 102, 0.35)', animationDuration: '2.4s' }}
      />
      <MessageCircle size={26} color="white" strokeWidth={2.2} className="relative z-10" />
    </motion.a>
  );
}
