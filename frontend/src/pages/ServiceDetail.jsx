import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';
import { Spinner } from '../components/Spinner';
import { motion } from 'framer-motion';
import { useMotionVariants } from '../utils/motion';

const getImageForService = (id) => {
  const images = [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000'
  ];
  return images[id % images.length];
};

const LOCAL_SERVICES = {
  'income-tax-filing': {
    id: 1,
    title: 'Income Tax Filing',
    short_description: 'Enjoy stress-free and accurate income tax filing options with us.',
    full_description: [
      'Filing income tax does not have to be complex. At Fintax India, we guide you prepare and filing tax returns on time and accurately. Further, we make sure you get all the deductions you are entitled to and stay aligned with the taxation laws.',
      'Our dedicated tax professionals analyze your unique financial situation to identify every possible avenue for tax optimization. We take the burden of compliance off your shoulders, ensuring that deadlines are met without last-minute scrambling.',
      'Whether you are an individual freelancer, an expanding startup, or a seasoned enterprise, our scalable filing solutions adapt to the complexity of your income streams, providing peace of mind year-round.'
    ],
    features: [
      'Comprehensive Tax Return Preparation',
      'Maximum Deduction Identification',
      'Audit Assistance & Representation',
      'Advance Tax Calculation & Remittance'
    ]
  },
  'financial-services': {
    id: 2,
    title: 'Financial Services',
    short_description: 'We provide complete financial planning and management services.',
    full_description: [
      'Managing your money well can assist you meet your goals. Fintax India offers financial planning, wealth management and investment advice. We provide customised plans to help you grow and save your wealth. This way you can achieve your financial dreams.',
      'Our holistic approach goes beyond simple number crunching. We sit down with you to understand your short-term liquidity needs and long-term legacy goals, crafting a resilient financial roadmap that adapts to market volatility.',
      'By leveraging industry-leading analytics and deep market expertise, we construct diversified portfolios that balance risk and reward, ensuring your capital works just as hard as you do.'
    ],
    features: [
      'Personalized Wealth Management',
      'Retirement & Succession Planning',
      'Portfolio Diversification Strategy',
      'Risk Assessment & Mitigation'
    ]
  },
  'gst-filing': {
    id: 3,
    title: 'GST Filing',
    short_description: 'Effective GST filing to keep your business compliant.',
    full_description: [
      'If dealing with GST confuses you, we are here to help! Fintax India handles complete GST registration, filing and compliance. Moreover, we keep up with the latest GST laws to ensure your filings are rightly done. Let us do the GSt work for you so that you can focus on your business.',
      'The Goods and Services Tax framework undergoes frequent amendments, making strict compliance a moving target for many businesses. Our team continuously monitors these regulatory shifts to shield your business from unforeseen penalties.',
      'From monthly GSTR filings to complex annual reconciliations and ITC optimization, we provide end-to-end support that transforms indirect tax from a compliance headache into a seamless operational process.'
    ],
    features: [
      'Seamless GST Registration',
      'Monthly/Quarterly GSTR Filings',
      'Input Tax Credit (ITC) Reconciliation',
      'E-Way Bill Generation & Management'
    ]
  },
  'loan-services': {
    id: 4,
    title: 'Loan Services',
    short_description: 'Professional guidance in securing the correct loan as per your needs.',
    full_description: [
      'Need a new loan for a project or personal requirement? We are ready to assist you. We can help you get the right loan, for your home, business or personal need. Moreover, we offer competitive rates and flexible conditions. As well as we guide you through the entire process of loaning.',
      'Navigating the credit landscape can be daunting with countless financial institutions offering varying terms. We act as your financial liaison, preparing ironclad project reports and financial statements that maximize your approval odds.',
      'Our network of banking partners allows us to negotiate on your behalf, ensuring you secure funding structures that align with your cash flow realities and long-term expansion goals.'
    ],
    features: [
      'Working Capital & Term Loans',
      'Project Finance Syndication',
      'Mortgage & Home Loan Advisory',
      'CMA Data & Project Report Prep'
    ]
  },
  'insurance-services': {
    id: 5,
    title: 'Insurance Services',
    short_description: 'Personalised insurance plans for a secured future.',
    full_description: [
      'Safeguarding what’s important to you is important for us. Fintax India provides a range of insurance services. Such as life, health and company insurance. We work with the best insurance companies to get the best plan for you. This way, we make sure you have the coverage you need.',
      'Unforeseen events can derail years of hard work in a matter of moments. We conduct comprehensive risk audits for both individuals and corporations to identify critical vulnerabilities in your current coverage.',
      'Rather than pushing generic policies, we curate bespoke insurance portfolios that provide airtight protection against liability, property damage, and health emergencies without bloated premiums.'
    ],
    features: [
      'Corporate Health & Group Life',
      'Keyman Insurance Policies',
      'Director & Officer (D&O) Liability',
      'Comprehensive Risk Assessment'
    ]
  },
  'corporate-services': {
    id: 6,
    title: 'Corporate Services',
    short_description: 'We are experts at offering end-to-end corporate solutions for your business.',
    full_description: [
      'Running a business includes many tasks, and we are here to help you. From starting a fresh company to managing corporate governance and compliance, our experts offer the support you need to run the business smoothly.',
      'Proper corporate structuring is the bedrock of a successful enterprise. Whether you are incorporating a new entity, executing a merger, or navigating complex ROC compliance, our legal and financial experts ensure impeccable execution.',
      'We act as your outsourced CFO and compliance team, allowing founders to focus entirely on product and market growth while we handle the intricate administrative machinery behind the scenes.'
    ],
    features: [
      'Company Incorporation (PVT, LLP, OPC)',
      'ROC & MCA Compliance Filing',
      'Mergers & Acquisitions Advisory',
      'Virtual CFO Services'
    ]
  },
  'market-analysis': {
    id: 7,
    title: 'Market Analysis',
    short_description: 'In-depth market research to help you make informed decisions.',
    full_description: [
      'Gain a competitive edge with our comprehensive market analysis. We dive deep into industry trends, competitor positioning, and consumer behaviors to provide you with actionable insights that drive strategic growth.',
      'Data without interpretation is just noise. Our analysts synthesize complex market data into clear, visual intelligence reports that empower leadership teams to make aggressive, calculated moves in their sector.',
      'Whether you are contemplating geographic expansion or launching a new product line, our feasibility studies and market forecasts provide the empirical foundation necessary to mitigate launch risks.'
    ],
    features: [
      'Competitor Benchmarking',
      'Market Feasibility Studies',
      'Consumer Behavior Analytics',
      'Industry Trend Forecasting'
    ]
  },
  'quality-resourcing': {
    id: 8,
    title: 'Quality Resourcing',
    short_description: 'Connecting you with top-tier talent and essential resources.',
    full_description: [
      'Finding the right people and assets is crucial for scaling your business. Our quality resourcing service ensures you are matched with highly skilled professionals and robust operational resources tailored to your specific industry needs.',
      'We understand that human capital is your most valuable asset. Beyond just recruitment, we assist in establishing organizational structures, compensation benchmarking, and talent retention strategies.',
      'Our extensive network allows us to source specialized C-suite executives and technical experts who seamlessly integrate into your company culture and drive immediate operational impact.'
    ],
    features: [
      'C-Suite Executive Search',
      'Compensation Benchmarking',
      'Organizational Structuring',
      'Specialized Talent Acquisition'
    ]
  },
  'talented-consultants': {
    id: 9,
    title: 'Talented Consultants',
    short_description: 'Expert guidance from industry-leading professionals.',
    full_description: [
      'Our team of seasoned consultants brings decades of combined experience across various financial and corporate sectors. We partner with you to overcome complex challenges, optimize processes, and unlock new avenues for sustainable success.',
      'We do not believe in one-size-fits-all advisory. Our consultants embed themselves within your organization to truly understand the friction points hindering your growth, delivering bespoke, actionable strategies.',
      'From crisis management to digital transformation of legacy financial systems, our experts provide the steady hand and visionary thinking required to navigate modern business complexities.'
    ],
    features: [
      'Strategic Process Optimization',
      'Financial System Transformation',
      'Crisis Management Advisory',
      'Change Management Support'
    ]
  }
};

import { useSEO } from '../hooks/useSEO';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: service ? `${service.title} | FinTax India` : 'Services | FinTax India',
    description: service ? service.description : 'Professional tax and financial services in India.'
  });
  const mv = useMotionVariants();

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (LOCAL_SERVICES[slug]) {
          setService(LOCAL_SERVICES[slug]);
        } else {
          const data = await api.getService(slug);
          setService(data);
        }
      } catch (err) {
        setError('Service record not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>;
  }

  if (error || !service) {
    return (
      <div className="section container text-center pt-32">
        <div className="alert alert-error max-w-2xl mx-auto mb-6">{error}</div>
        <button onClick={() => navigate('/services')} className="btn btn-outline">
          Return to Expertise
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16">
        <motion.div 
          className="absolute inset-0 z-0"
          variants={mv.imageScaleFade}
          initial="hidden"
          whileInView="visible"
          viewport={mv.viewportConfig}
        >
          <img 
            src={getImageForService(service.id)} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors font-bold uppercase text-xs tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              <ArrowLeft size={16} /> All Expertise
            </Link>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {service.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl leading-relaxed mb-8"
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {service.short_description}
          </motion.p>
          <motion.div
            variants={mv.textFadeDelay}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn btn-accent px-8 py-3">
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-4xl">
          <motion.div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16" 
            variants={mv.textFade}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            {Array.isArray(service.full_description) 
              ? service.full_description.map((p, i) => <p key={i} className="mb-6">{p}</p>)
              : <p className="mb-6">{service.full_description}</p>
            }

            {service.features && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-primary mb-6">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0"></div>
                      <span className="text-gray-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
            
          <motion.div 
            className="bg-gray-50 p-10 md:p-16 border border-gray-200 text-center rounded-lg shadow-sm"
            variants={mv.headingRise}
            initial="hidden"
            whileInView="visible"
            viewport={mv.viewportConfig}
          >
            <h3 className="text-3xl font-bold text-primary mb-4">Require Action on This Service?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Lodge a formal inquiry with our experts to discuss how this specific protocol applies to your organization.
            </p>
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn btn-primary px-8 py-4">
              Initiate Inquiry
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
