import React from 'react';
import { Target, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const About = () => {
  const mv = useMotionVariants();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-dark"></div>
        <div className="container relative z-10 max-w-4xl text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Firm Overview
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Delivering excellence in financial advisory, tax planning, and corporate compliance since our inception.
          </motion.p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-5xl grid md:grid-cols-2 gap-16 items-start">
          
          <div>
            <motion.h2 
              className="text-3xl font-bold text-primary mb-6"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our Leadership
            </motion.h2>
            <motion.p 
              className="text-xl mb-6 font-semibold text-primary"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Founder & Principal Chartered Accountant
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-4 leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              With over 15 years of rigorous experience in statutory audits, corporate taxation, and strategic financial planning, our founder brings a wealth of knowledge to every client engagement. Holding prestigious qualifications and a proven track record across diverse industries, they lead a firm dedicated to unwavering ethical standards and proactive financial strategies.
            </motion.p>
            <motion.p 
              className="text-gray-600 leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Under their guidance, FinTax India has grown into a trusted partner for businesses seeking not just compliance, but genuine financial growth and risk mitigation.
            </motion.p>
          </div>
          
          <div className="md:border-l-2 md:border-gray-100 md:pl-12">
            <motion.h3 
              className="text-2xl font-bold text-primary mb-8"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Core Tenets
            </motion.h3>
            <motion.div 
              className="flex flex-col gap-10"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              
              <motion.div className="flex items-start gap-6" variants={mv.staggerItem}>
                <div className="p-4 bg-gray-50 rounded-lg text-accent">
                  <Target size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Precision & Accuracy</h4>
                  <p className="text-gray-600 leading-relaxed">Meticulous attention to detail in every financial statement and tax filing, ensuring zero margin for error.</p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-6" variants={mv.staggerItem}>
                <div className="p-4 bg-gray-50 rounded-lg text-accent">
                  <Users size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Client-Centric Mandate</h4>
                  <p className="text-gray-600 leading-relaxed">Tailored solutions structurally aligned with your corporate objectives and long-term vision.</p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-6" variants={mv.staggerItem}>
                <div className="p-4 bg-gray-50 rounded-lg text-accent">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Regulatory Mastery</h4>
                  <p className="text-gray-600 leading-relaxed">Continuous adaptation to regulatory amendments to provide robust, compliant counsel.</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};
