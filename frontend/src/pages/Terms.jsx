import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { FileText, AlertCircle, Scale, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Terms = () => {
  useSEO({
    title: 'Terms of Service | FinTax India',
    description: 'Terms and conditions governing professional engagement, advisory scope, regulatory disclosures, and service limitations with FinTax India.'
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16 md:py-20">
      <div className="container max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale size={14} className="text-accent" />
            <span>Legal Engagement Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary font-heading tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Effective Date: September 18, 2026 • Last Reviewed: September 2026
          </p>
        </div>

        {/* Terms Content Body */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          
          {/* Statutory Regulatory Notice */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950">
            <h3 className="font-bold text-base sm:text-lg mb-1.5 flex items-center gap-2 font-heading text-amber-900">
              <ShieldAlert size={18} className="text-amber-700 shrink-0" />
              ICAI Regulatory Compliance & Non-Solicitation Notice
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              In accordance with the guidelines prescribed by the <strong>Institute of Chartered Accountants of India (ICAI)</strong> under the <strong>Chartered Accountants Act, 1949</strong>, this website is maintained strictly for informational and educational purposes. Nothing contained on this site should be construed as an advertisement, solicitation, or personal promotion of professional services.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              1. Scope of Engagement & Advisory Services
            </h2>
            <p className="mb-3">
              FinTax India provides financial advisory, tax planning, accounting assistance, and statutory compliance filing services. The specific scope, timeline, deliverables, and fees for any engagement shall be governed by an agreed Engagement Letter or formal Scope of Work document mutually executed prior to the commencement of professional services.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Informal website interactions, inquiries submitted via web forms, or initial diagnostic evaluations do not automatically establish an attorney-client or Chartered Accountant-client retainer relationship until formally accepted by FinTax India.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              2. Accuracy & Authenticity of Client Information
            </h2>
            <p className="mb-3">
              Our tax computations, audit preparations, and statutory filings are directly derived from the information, records, vouchers, and documentation furnished by the client:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>The client represents and warrants that all financial records, revenue statements, expense receipts, bank accounts, and asset disclosures provided are true, complete, and accurate.</li>
              <li>FinTax India and its associate professionals rely in good faith on the veracity of client-submitted documents and are not liable for errors, omissions, or penalties arising from fabricated, withheld, or fraudulent information.</li>
              <li>The client is solely responsible for timely verification and sign-off on final return drafts and OTP-based e-verification before statutory deadlines.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              3. Sovereign Authority & Outcome Disclaimer
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs sm:text-sm space-y-2 text-gray-700">
              <p className="font-semibold text-gray-900">
                Important Limitation Regarding Government Discretion:
              </p>
              <p>
                FinTax India applies diligent professional care and adherence to statutory laws. However, the assessment of tax liability, issuance of scrutiny notices (including intimations under Section 143(1), notices under Section 142(1), 143(2), or 148), approval of tax refunds, and imposition of interest or penalties remain the sole sovereign prerogative of the <strong>Income Tax Department</strong>, <strong>Goods and Services Tax Network (GSTN)</strong>, and the <strong>Ministry of Corporate Affairs (MCA)</strong>.
              </p>
              <p>
                FinTax India does not claim or guarantee that any return will be immune from statutory audit selection, departmental verification, or random computer-assisted scrutiny selection (CASS).
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              4. Professional Fees & Payment Terms
            </h2>
            <p className="mb-3 text-xs sm:text-sm text-gray-600">
              All advisory and filing fees quoted are in Indian National Rupees (INR) and are subject to applicable GST unless stated otherwise:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>Fees are payable in accordance with the billing schedule outlined in the engagement agreement.</li>
              <li>Government statutory challans (advance tax, self-assessment tax, GST dues, MCA late fees) are separate from professional advisory fees and must be funded directly by the client.</li>
              <li>Once work on data verification or return drafting has commenced, fee retainers are non-refundable.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              5. Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              To the maximum extent permitted by applicable Indian law, the total cumulative liability of FinTax India, its partners, Chartered Accountants, and employees for any claims, losses, or damages arising out of or in connection with the services rendered shall be limited strictly to the total professional fee received for the specific filing or engagement in dispute. In no event shall FinTax India be liable for indirect, consequential, punitive, or loss-of-profit damages.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              6. Intellectual Property & Advisory Insights
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              All website content, explanatory guides, proprietary tax calculators, workflows, and published editorial materials are the intellectual property of FinTax India and protected under Indian Copyright laws. Unauthorized reproduction or commercial redistribution without prior written consent is strictly prohibited.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              7. Governing Law & Dispute Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              These Terms shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>. Any dispute, claim, or controversy arising out of or relating to these Terms or the services provided shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>New Delhi, India</strong>.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs sm:text-sm space-y-1 text-gray-700">
              <p><strong>Legal & Compliance Desk:</strong> FinTax India Advisory Services</p>
              <p><strong>Email:</strong> <a href="mailto:legal@fintaxindia.com" className="text-primary font-bold hover:text-accent transition-colors">legal@fintaxindia.com</a></p>
              <p><strong>Registered Address:</strong> Financial District, New Delhi, India 110001</p>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 text-xs text-gray-500 flex justify-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">View Privacy Policy</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Schedule a Consultation</Link>
        </div>

      </div>
    </div>
  );
};
