import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMotionVariants } from '../utils/motion';
import { api } from '../api';

export const FAQPreview = () => {
  const mv = useMotionVariants();
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await api.getQA();
        setFaqs(data.slice(0, 4));
        if (data.length > 0) setOpenId(data[0].id);
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        setFaqs([
          { id: 'f1', question: 'What documents are required for income tax filing?', answer: 'Generally, you need your PAN card, Aadhaar card, Form 16, bank statements, and investment proofs.' },
          { id: 'f2', question: 'How long does it take to register a company?', answer: 'Company registration usually takes 7-14 working days, subject to document verification and government processing times.' },
          { id: 'f3', question: 'Do you offer online consultations?', answer: 'Yes, we provide seamless online consultations via video call or phone for clients across India and abroad.' },
        ]);
        setOpenId('f1');
      }
    };
    fetchFAQs();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container max-w-5xl">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-primary mb-4 uppercase tracking-tight"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Quick answers to common questions about our services and processes.
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-w-3xl mx-auto mb-8">
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.id} 
              className="border-b border-gray-100 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={mv.viewportConfig}
              transition={{ delay: index * 0.1 }}
            >
              <button 
                className="w-full text-left p-5 md:p-6 font-bold text-base md:text-lg text-primary hover:text-accent transition-colors flex justify-between items-center outline-none focus-visible:bg-gray-50"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <span className="pr-4 md:pr-8">{faq.question}</span>
                {openId === faq.id ? (
                  <div className="bg-accent/10 p-1.5 md:p-2 rounded-full text-accent"><Minus size={16} /></div>
                ) : (
                  <div className="bg-gray-50 p-1.5 md:p-2 rounded-full text-gray-400"><Plus size={16} /></div>
                )}
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-gray-50/50"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 text-gray-600 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/qa" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group">
            View All Questions 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
