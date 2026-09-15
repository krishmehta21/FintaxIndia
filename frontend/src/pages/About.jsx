import React, { useRef } from 'react';
import { Target, Users, BookOpen, CheckCircle2, Shield, Tag, ThumbsUp, Handshake } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const About = () => {
  const mv = useMotionVariants();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section ref={heroRef} className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 origin-top"
          style={{ y: shouldReduceMotion ? 0 : y }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-dark"></div>
        </motion.div>
        <div className="container relative z-10 max-w-4xl text-center">
          <motion.h1 
            className="text-lg md:text-xl font-bold mb-2 text-accent tracking-widest uppercase"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            About Us
          </motion.h1>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Fintax India Allows You Manage & Grow Your Finances
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-gray-300 leading-relaxed"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Fintax India is committed to simplifying financial and business management for brand owners, professionals and entrepreneurs. With a focus on offering high-quality and affordable services, we guide clients at every step of their journey. Further, our promise to reliability, transparency and client satisfaction has helped us for trusted relations with clients.
          </motion.p>
        </div>
      </section>

      <section className="section bg-white py-12 md:py-24">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Why Choose Us & Philosophy */}
          <div>
            <motion.h2 
              className="text-3xl font-bold text-primary mb-6"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6 leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              At Fintax India, we are committed to offering a professionally curated set of financial and corporate services at a pricing that is fair to all. We started with the aim of easing the complexities of business management for owners, and personal financial management, Fintax India has been growing for years. Moreover, from our steady beginnings as a small staff in 2020, we have expanded into a great company, dedicated to serving hundreds of happy clients nationwide.
            </motion.p>
            <motion.a
              href="https://fintaxindia.com/about-us/#"
              className="inline-flex text-accent font-bold mb-12 hover:text-primary transition-colors border-b-2 border-accent pb-1"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our History
            </motion.a>

            <motion.h2 
              className="text-3xl font-bold text-primary mb-6 mt-4"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Philosophy
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-4 leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              At FinTax India, we believe success is directly linked to the success of our clients. Our philosophy says a business grows when it offers value to its clients. Hence, we are committed to building a clear and fair business where client satisfaction is a priority.
            </motion.p>
            <motion.p 
              className="text-gray-600 leading-relaxed"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              We know that in the dynamic business world, it is important to stay aligned with client needs. Hence, we constantly upgrade our services, making sure that we meet the expectations. Moreover, for us, client satisfaction and trust measure our rate of success.
            </motion.p>
          </div>
          
          {/* Right Column: Values */}
          <div className="md:border-l-2 md:border-gray-100 md:pl-12">
            <motion.h3 
              className="text-2xl font-bold text-primary mb-8"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our Values
            </motion.h3>
            <motion.div 
              className="flex flex-col gap-8"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              
              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">High Quality</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">We focus to deliver the best in class services by investing in our technology and processes. Our aim is to offer quick, seamless and accurate solutions which meet the diverse client needs.</p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Reliable Team</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">At our company, each client is served with simplicity and transparency. Our service charges are straightforward without any hidden charges, and we are proud to be a dependable choice for your financial journey.</p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Confidentiality</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">We are dedicated to saving your privacy. Your information is kept confidential, and we never share your details with any party without consent. On taking our services, rest assured about your privacy.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <Tag size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Affordable Pricing</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Our offerings are made with keeping fair and affordable pricing in mind. We aim to offer exceptional value without sacrificing quality, making sure our customers get the greatest outcome at competitive pricing.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <ThumbsUp size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Respect & Fairness</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Our clients are treated with great care and respect. We actively ask for and value feedback, always working to improve our services to offer better results to clients.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start gap-5" variants={mv.staggerItem}>
                <div className="p-3 bg-gray-50 rounded-lg text-accent mt-1">
                  <Handshake size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Trustworthy Relationship</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">We aim to create a long-lasting and trustworthy relationship with each client with valued services. Further, we are continuously finding ways to add value in our services and reduce costs.</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};
