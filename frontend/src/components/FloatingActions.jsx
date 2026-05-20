import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, X, Plus } from 'lucide-react';

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/6285117577707',
      color: '#25D366',
      testid: 'fab-whatsapp',
    },
    {
      icon: Calendar,
      label: 'Book Meeting',
      href: 'https://s.id/konsultasi-data',
      color: '#00D1E9',
      testid: 'fab-booking',
    },
  ];

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
      data-testid="floating-actions"
    >
      <AnimatePresence>
        {open && actions.map((action, i) => (
          <motion.a
            key={i}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={action.testid}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            transition={{ duration: 0.2, delay: i * 0.07 }}
            className="group flex items-center gap-3"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 glass text-white text-sm font-outfit px-3 py-1.5 rounded-lg whitespace-nowrap">
              {action.label}
            </span>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
              style={{ background: action.color, boxShadow: `0 4px 20px ${action.color}50` }}
            >
              <action.icon size={20} color="white" />
            </div>
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        data-testid="fab-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #00D1E9 0%, #0D3A70 100%)',
          boxShadow: '0 4px 30px rgba(0, 209, 233, 0.4)',
        }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {open ? <X size={22} color="white" /> : <Plus size={22} color="white" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
