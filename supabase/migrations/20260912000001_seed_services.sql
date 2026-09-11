-- SQL Migration for FinTax India Seed Data
-- File: supabase/migrations/20260912000001_seed_services.sql

INSERT INTO public.services (title, slug, short_description, full_description, icon_name, display_order, is_published)
VALUES
(
    'Income Tax Filing',
    'income-tax-filing',
    'Accurate, on-time income tax filing for individuals and businesses, with attention to every deduction you''re entitled to.',
    'Whether you''re salaried, self-employed, or running a business, getting your income tax return right matters — both for compliance and for making sure you''re not overpaying. This covers return preparation and filing, tax computation, advance tax planning, and handling notices or scrutiny from the tax department if they come up.',
    'file-text',
    1,
    true
),
(
    'GST Registration & Filing',
    'gst-services',
    'End-to-end GST support — registration, monthly/quarterly filing, and audits — so you stay compliant without the paperwork headache.',
    'GST compliance is one of the most common places businesses slip up, simply because the filing cycle is relentless. This service covers new GST registration, regular return filing, reconciliation, and support during GST audits or department queries.',
    'receipt',
    2,
    true
),
(
    'TDS Compliance',
    'tds-compliance',
    'TDS deduction, deposit, and return filing handled correctly and on time, avoiding penalties for late or incorrect compliance.',
    'TDS rules apply to a wide range of payments businesses make — salaries, rent, professional fees, contractor payments — and getting the deduction rate or filing deadline wrong leads to unnecessary penalties. This service covers TDS calculation, deposit, quarterly return filing, and correction of past filing errors.',
    'calculator',
    3,
    true
),
(
    'Business Registration',
    'business-registration',
    'Guidance on choosing and setting up the right business structure — proprietorship, partnership, LLP, or private limited company.',
    'Starting a business in India means navigating registration requirements that vary depending on the structure you choose. This service helps you decide what fits your situation, then handles the actual registration process along with any related licenses (GST, Shops & Establishment, Professional Tax, etc.).',
    'briefcase',
    4,
    true
),
(
    'Accounting & Bookkeeping',
    'accounting-bookkeeping',
    'Reliable day-to-day bookkeeping and financial statement preparation, so your books stay audit-ready year-round.',
    'Clean, up-to-date books make every other financial decision easier — from loan applications to tax filing to simply knowing where your business stands. This covers regular bookkeeping, ledger maintenance, and preparation of financial statements.',
    'book-open',
    5,
    true
),
(
    'Tax Advisory & Planning',
    'tax-advisory',
    'Forward-looking tax planning to help you make informed financial decisions before deadlines force your hand.',
    'Good tax outcomes come from planning ahead, not scrambling in March. This service covers tax-saving strategy for individuals and businesses, investment structuring, and advice tailored to your specific financial situation.',
    'trending-up',
    6,
    true
),
(
    'NRI Taxation',
    'nri-taxation',
    'Tax guidance for NRIs on Indian income, property sales, and repatriation — handled remotely, wherever you are.',
    'NRIs dealing with Indian tax obligations face rules that don''t always match what non-resident status might suggest — particularly around property sales, TDS on such sales, and repatriating funds abroad. This service covers NRI income tax filing, capital gains guidance, and compliance support, all manageable remotely.',
    'globe',
    7,
    true
),
(
    'Reports & Documentation',
    'reports-documentation',
    'Financial reports and documentation prepared for loan applications, investor due diligence, or institutional requirements.',
    'Banks, investors, and institutions often need specific financial documentation before they''ll move forward — projected financials, net worth certificates, or reports formatted to their requirements. This service prepares those documents accurately and on the timeline you need.',
    'folder-check',
    8,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_published = EXCLUDED.is_published,
    updated_at = timezone('utc'::text, now());
