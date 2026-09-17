
-- Dummy data for design review and layout testing

INSERT INTO public.blog_posts (
    title, slug, excerpt, content, cover_image_url, category, status, published_at
) VALUES 
(
    'GST Council Unveils New E-Invoicing Rules for Small Businesses',
    'gst-council-einvoicing-rules',
    'Understand the latest changes to GST e-invoicing thresholds and what it means for your business compliance.',
    '# Important Updates to E-Invoicing\n\nThe GST Council has recently lowered the threshold for mandatory e-invoicing. This aims to digitize transaction reporting and minimize input tax credit discrepancies.\n\n## Key Changes\n\nBusinesses with an aggregate turnover exceeding the new limit must now generate electronic invoices through the Invoice Registration Portal (IRP). Failure to comply may result in penalties and denial of ITC for your buyers.\n\n### What You Need to Do\n\nEnsure your ERP or billing software is integrated with the IRP. Our team at FinTax India can assist with system readiness and compliance training to ensure a smooth transition.',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    'GST Updates',
    'published',
    NOW() - INTERVAL '2 days'
),
(
    'ITR Filing Deadlines You Shouldn''t Miss This Year',
    'itr-filing-deadlines-not-to-miss',
    'A comprehensive guide to income tax return deadlines for individuals and corporate entities.',
    '# Filing Your ITR on Time\n\nFiling your Income Tax Return on time is crucial to avoid late fees and interest under Section 234A. \n\n## Individual Taxpayers\n\nFor most salaried individuals and non-audit cases, the deadline is fast approaching. Ensure you have your Form 16, AIS, and capital gains statements ready for reconciliation.\n\n### Audit Cases\n\nFor businesses requiring a tax audit, the due date differs. Timely filing of the audit report is a prerequisite. Contact your relationship manager at FinTax India to begin the audit proceedings early.',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    'ITR Filing',
    'published',
    NOW() - INTERVAL '5 days'
),
(
    'Top 5 Overlooked Tax Deductions for Salaried Professionals',
    'overlooked-tax-deductions-salaried',
    'Maximize your take-home pay by leveraging these often forgotten Section 80C and 80D deductions.',
    '# Maximize Your Take-Home Pay\n\nWhile most professionals utilize the standard 80C limit (PPF, ELSS, Life Insurance), several other deductions are frequently overlooked.\n\n## Medical and Health\n\nPreventive health check-ups and medical insurance premiums for elderly parents offer additional deduction avenues under Section 80D.\n\n## Education and Housing\n\nInterest paid on education loans (80E) and additional benefits on affordable housing can significantly lower your taxable bracket. Consult with our advisors to restructure your salary components efficiently.',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    'Tax Saving Tips',
    'published',
    NOW() - INTERVAL '10 days'
),
(
    'Important MCA Updates on Annual Return Disclosures',
    'mca-updates-annual-return',
    'The Ministry of Corporate Affairs has introduced new disclosure requirements for private limited companies.',
    '# Enhanced Corporate Transparency\n\nThe MCA has rolled out updated forms for annual filings, mandating greater transparency regarding shareholding patterns and director KYC.\n\n## What''s New\n\nCompanies must now disclose more granular data regarding related-party transactions and CSR spending. The CSR-2 form has been tightly integrated with the annual return workflow.\n\n### Compliance Deadlines\n\nEnsure your secretarial records are updated. Our corporate advisory team is helping clients navigate these enhanced disclosure norms seamlessly.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'Compliance Alerts',
    'published',
    NOW() - INTERVAL '15 days'
),
(
    'Structuring Your Startup for Foreign Direct Investment',
    'startup-structuring-fdi',
    'Key financial and regulatory considerations for Indian startups looking to attract foreign venture capital.',
    '# Attracting Global Capital\n\nForeign investors require a robust compliance framework and clean cap tables before deploying capital. Proper entity structuring is the first step.\n\n## FEMA and RBI Guidelines\n\nIssuance of equity instruments to non-residents must comply with FDI pricing guidelines and requires timely filing of the FC-GPR form via the FIRMS portal.\n\n## Valuation and Taxation\n\nProper valuation by a registered valuer and mitigating angel tax implications under Section 56(2)(viib) are critical. FinTax India provides end-to-end transactional support for inbound investments.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'Corporate Advisory',
    'published',
    NOW() - INTERVAL '20 days'
),
(
    'Understanding the New RBI Guidelines on Digital Lending',
    'rbi-guidelines-digital-lending',
    'How the Reserve Bank of India''s recent regulatory framework impacts fintech lending platforms and borrowers.',
    '# A Safer Digital Lending Ecosystem\n\nThe RBI has issued comprehensive guidelines to regulate digital lending, focusing on borrower protection and data privacy.\n\n## Regulated Entities\n\nThe onus of compliance lies heavily on Regulated Entities (REs) like banks and NBFCs, who must ensure their Lending Service Providers (LSPs) adhere to the new norms.\n\n### Direct Fund Flows\n\nLoan disbursements and repayments must happen directly between the bank account of the borrower and the RE. Pass-through or pool accounts by LSPs are strictly prohibited. We help fintechs align their operational flows with the RBI mandate.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'General Finance',
    'published',
    NOW() - INTERVAL '25 days'
);

