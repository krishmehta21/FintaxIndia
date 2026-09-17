import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  useSEO({
    title: 'Privacy Policy | FinTax India',
    description: 'Our commitment to protecting your personal and financial data in compliance with the Digital Personal Data Protection Act, 2023 and ICAI professional standards.'
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16 md:py-20">
      <div className="container max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} className="text-accent" />
            <span>Data Protection & Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary font-heading tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Effective Date: September 18, 2026 • Last Reviewed: September 2026
          </p>
        </div>

        {/* Policy Content Body */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 md:p-12 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          
          {/* Executive Summary */}
          <div className="p-4 sm:p-5 rounded-xl bg-primary/5 border border-primary/15 text-primary">
            <h3 className="font-bold text-base sm:text-lg mb-1.5 flex items-center gap-2 font-heading">
              <Lock size={18} className="text-accent shrink-0" />
              Our Core Confidentiality Commitment
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              FinTax India operates under professional confidentiality obligations governed by the <strong>Chartered Accountants Act, 1949</strong> and the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>. We treat your financial, tax, and corporate information with highest confidentiality and never monetize, sell, or rent your personal data to any third party.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              To provide accurate financial advisory, tax preparation, and statutory filing services, we may collect the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li><strong>Contact & Identity Data:</strong> Full legal name, email address, telephone/WhatsApp number, residential or registered business address.</li>
              <li><strong>Statutory Identifiers:</strong> Permanent Account Number (PAN), Aadhaar number (for authentication as required by statutory portals), GSTIN, Corporate Identification Number (CIN), and Director Identification Number (DIN).</li>
              <li><strong>Financial & Operational Records:</strong> Bank account statements, Form 16/16A, investment proofs, profit & loss statements, balance sheets, sales/purchase registers, and invoice registries.</li>
              <li><strong>Technical Logs:</strong> IP address, device metadata, browser type, and interaction metrics gathered through standard web telemetry to safeguard portal security.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              2. Purpose of Data Processing
            </h2>
            <p className="mb-3">
              We process your data strictly under lawful grounds as defined under Indian laws:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>Preparing and submitting income tax returns, GST returns, and MCA filings on government portals upon your express authorization.</li>
              <li>Conducting financial reviews, tax planning scenarios, and Virtual CFO advisory as agreed in our scope of work.</li>
              <li>Communicating statutory reminders, filing acknowledgments, and relevant regulatory updates.</li>
              <li>Complying with statutory reporting mandates under the Income Tax Act, 1961, Companies Act, 2013, and Prevention of Money Laundering Act (PMLA).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              3. Non-Disclosure & Third-Party Sharing
            </h2>
            <p className="mb-3">
              We maintain absolute zero-commercial-sharing standards. Your information is shared only under the following strictly necessary circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li><strong>Sovereign Portals:</strong> Directly transmitted to sovereign government portals (e.g. Income Tax Department e-Filing, GSTN Portal, MCA21) for statutory compliance authorized by you.</li>
              <li><strong>Designated Professional Associates:</strong> Senior Chartered Accountants, legal associates, and audit partners assigned to your specific engagement, all bound by non-disclosure agreements and professional ethics.</li>
              <li><strong>Legal Compulsion:</strong> When required by an official summons, court order, or statutory investigating authority under applicable Indian law.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              4. Data Security & Storage Architecture
            </h2>
            <p className="mb-3">
              We enforce administrative, technical, and physical safeguards designed to protect sensitive financial records:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>All web communication is encrypted using 256-bit SSL/TLS protocol in transit.</li>
              <li>Storage repositories adhere to strict role-based access controls (RBAC) restricted exclusively to designated advisory personnel.</li>
              <li>Periodic security audits and vulnerability assessments to safeguard client data integrity.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              5. Statutory Record Retention
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Under Indian tax and corporate laws (including Section 149 of the Income Tax Act and Section 128 of the Companies Act, 2013), books of accounts and supporting vouchers must be maintained for a statutory period of up to 8 financial years. We retain historical filing records accordingly to support clients in statutory assessments or departmental inquiries, after which records may be securely purged.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              6. Your Rights Under DPDPA 2023
            </h2>
            <p className="mb-3 text-xs sm:text-sm text-gray-600">
              As a Data Principal under the Digital Personal Data Protection Act, 2023, you hold rights to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
              <li>Request a summary of personal financial data processed by FinTax India.</li>
              <li>Request correction or updating of inaccurate personal data.</li>
              <li>Withdraw consent for optional advisory communications at any time.</li>
              <li>Nominate an individual to exercise rights on your behalf in the event of incapacity.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-3 font-heading">
              7. Grievance Officer & Contact
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              In accordance with the Information Technology Act, 2000 and rules made thereunder, any queries, concerns, or grievances regarding our privacy practices may be addressed to:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs sm:text-sm space-y-1 text-gray-700">
              <p><strong>Grievance Officer:</strong> Compliance & Data Protection Cell</p>
              <p><strong>Firm:</strong> FinTax India Advisory Services</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@fintaxindia.com" className="text-primary font-bold hover:text-accent transition-colors">privacy@fintaxindia.com</a></p>
              <p><strong>Address:</strong> Financial District, New Delhi, India 110001</p>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 text-xs text-gray-500 flex justify-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">View Terms of Service</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Compliance Team</Link>
        </div>

      </div>
    </div>
  );
};
