import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

export const QA = () => {
  const [qaItems, setQaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mv = useMotionVariants();
  
  // Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  // Accordion state
  const [openId, setOpenId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ category: '', question: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const data = await api.getQA();
        setQaItems(data);
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load Q&A records.');
      } finally {
        setLoading(false);
      }
    };
    fetchQA();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const filteredQA = qaItems.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          qa.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? qa.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await api.submitQA(formData);
      setSubmitSuccess(true);
      setFormData({ category: '', question: '', email: '' });
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide after 5 seconds
    } catch (err) {
      setSubmitError('Failed to submit question. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Header for Q&A */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"></div>
        <div className="container relative z-10 max-w-4xl text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Questions & Answers
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            Official clarifications on common financial and regulatory queries.
          </motion.p>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container max-w-4xl">
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 mb-12"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <input 
              type="text" 
              placeholder="Search knowledge base..." 
              className="form-control flex-grow"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select 
              className="form-control md:w-64"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12"><Spinner size={40} /></div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : filteredQA.length === 0 ? (
            <div className="py-12 text-center text-muted italic">No records found matching criteria.</div>
          ) : (
            <motion.div 
              className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              {filteredQA.map(qa => (
                <motion.div 
                  key={qa.id} 
                  className="border-b border-gray-100 last:border-b-0"
                  variants={mv.staggerItem}
                >
                  <button 
                    className="w-full text-left p-6 font-heading font-semibold text-lg text-primary hover:text-accent transition-colors flex justify-between items-center focus-visible:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-accent inset-0"
                    onClick={() => toggleAccordion(qa.id)}
                    aria-expanded={openId === qa.id}
                  >
                    <span className="pr-8">{qa.question}</span>
                    {openId === qa.id ? <Minus size={20} className="flex-shrink-0 text-accent" /> : <Plus size={20} className="flex-shrink-0 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {openId === qa.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600">
                          <p className="whitespace-pre-line mb-4">{qa.answer}</p>
                          <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 rounded-sm">
                            {qa.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Submit Form Section */}
      <section className="section bg-white border-t border-gray-100">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-3xl font-bold text-primary mb-4"
              variants={mv.headingRise}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Submit Inquiry
            </motion.h2>
            <motion.p 
              className="text-muted"
              variants={mv.textFadeDelay}
              initial="hidden"
              whileInView="visible"
              viewport={mv.viewportConfig}
            >
              Our panel will review your query and publish formal clarifications.
            </motion.p>
          </div>
          
          <AnimatePresence>
            {submitSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="alert alert-success text-center mb-8 font-semibold"
              >
                Your inquiry has been successfully submitted for review.
              </motion.div>
            )}
          </AnimatePresence>

          {submitError && <div className="alert alert-error mb-6 text-center">{submitError}</div>}

          <motion.form 
            onSubmit={handleFormSubmit} 
            className={`transition-opacity duration-300 ${submitSuccess ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <div className="form-group">
              <label htmlFor="category" className="form-label">Classification *</label>
              <input 
                type="text" 
                id="category"
                name="category"
                required 
                className="form-control" 
                placeholder="e.g. Audit, Taxation"
                value={formData.category}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address (Optional)</label>
              <input 
                type="email" 
                id="email"
                name="email"
                className="form-control" 
                placeholder="For direct correspondence"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="question" className="form-label">Inquiry Details *</label>
              <textarea 
                id="question"
                name="question"
                required 
                rows="4" 
                className="form-control resize-y"
                placeholder="State your question clearly..."
                value={formData.question}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <div className="mt-8 text-center">
              <button type="submit" className="btn btn-primary w-full md:w-auto px-12" disabled={submitting}>
                {submitting ? 'Processing...' : 'Submit to Panel'}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};
