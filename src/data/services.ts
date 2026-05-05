import { Banknote, TrendingUp, Shield, Calculator, Plane, type LucideIcon } from "lucide-react";

export type ServiceCategory = "Loans" | "Wealth Creation" | "Insurance" | "Accounting" | "Holiday Club";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  benefit: string;
  eligibility: string;
  documents: string[];
  processingTime: string;
  icon: LucideIcon;
}

export const categoryMeta: Record<ServiceCategory, { icon: LucideIcon; label: string }> = {
  Loans: { icon: Banknote, label: "Loans" },
  "Wealth Creation": { icon: TrendingUp, label: "Wealth Creation" },
  Insurance: { icon: Shield, label: "Insurance" },
  Accounting: { icon: Calculator, label: "Accounting" },
  "Holiday Club": { icon: Plane, label: "Holiday Club" },
};

export const services: Service[] = [
  {
    slug: "home-loan",
    name: "Home Loan",
    category: "Loans",
    tagline: "Own your dream home with rates starting at 8.4%*",
    benefit: "Up to ₹5 Cr funding with flexible 30-year tenure and zero hidden charges.",
    eligibility: "Salaried or self-employed, age 23–65, monthly income ₹25,000+",
    documents: ["PAN & Aadhaar", "Salary slips (3 months)", "Bank statements (6 months)", "Property documents"],
    processingTime: "Approval in 48 hours",
    icon: Banknote,
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    category: "Loans",
    tagline: "Fuel your business — collateral-free up to ₹50 lakh",
    benefit: "Quick disbursal, minimal paperwork and competitive interest rates for MSMEs.",
    eligibility: "Business vintage 2+ years, annual turnover ₹40 L+",
    documents: ["GST returns", "ITR (2 years)", "Bank statements (12 months)", "Business proof"],
    processingTime: "Disbursal in 72 hours",
    icon: Banknote,
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    category: "Loans",
    tagline: "Instant personal loan up to ₹25 lakh",
    benefit: "Zero collateral, minimal documentation, and competitive interest rates.",
    eligibility: "Salaried employees, age 21–60, monthly income ₹15,000+",
    documents: ["PAN & Aadhaar", "Salary slips (3 months)", "Bank statements (6 months)", "Employment proof"],
    processingTime: "Approval in 24 hours",
    icon: Banknote,
  },
  {
    slug: "mutual-funds",
    name: "Mutual Funds",
    category: "Wealth Creation",
    tagline: "Professional wealth management through mutual funds",
    benefit: "Diversified portfolio managed by experts with potential for high returns.",
    eligibility: "Individuals aged 18+, minimum investment ₹500",
    documents: ["PAN & Aadhaar", "Bank account details", "KYC documents"],
    processingTime: "Account setup in 24 hours",
    icon: TrendingUp,
  },
  {
    slug: "sip-investment",
    name: "Systematic Investment Plan (SIP)",
    category: "Wealth Creation",
    tagline: "Disciplined investing with as low as ₹500/month",
    benefit: "Power of compounding with regular investments and rupee cost averaging.",
    eligibility: "Individuals aged 18+, monthly income ₹10,000+",
    documents: ["PAN & Aadhaar", "Bank mandate", "KYC documents"],
    processingTime: "SIP setup in 48 hours",
    icon: TrendingUp,
  },
  {
    slug: "fixed-deposits",
    name: "Fixed Deposits",
    category: "Wealth Creation",
    tagline: "Safe and secure investment with guaranteed returns",
    benefit: "Fixed returns with flexible tenure options and tax benefits.",
    eligibility: "Individuals and companies, minimum investment ₹10,000",
    documents: ["PAN & Aadhaar", "Bank account details", "KYC documents"],
    processingTime: "FD opening in 24 hours",
    icon: TrendingUp,
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    category: "Insurance",
    tagline: "Comprehensive health coverage for your family",
    benefit: "Cashless hospitalization, no claim bonus, and tax benefits.",
    eligibility: "Individuals aged 18–65, families",
    documents: ["PAN & Aadhaar", "Medical history", "Age proof"],
    processingTime: "Policy issuance in 24 hours",
    icon: Shield,
  },
  {
    slug: "term-insurance",
    name: "Term Insurance",
    category: "Insurance",
    tagline: "Secure your family's financial future",
    benefit: "High coverage at low premiums with tax benefits under 80C.",
    eligibility: "Individuals aged 18–60, income proof required",
    documents: ["PAN & Aadhaar", "Income proof", "Medical history"],
    processingTime: "Policy issuance in 48 hours",
    icon: Shield,
  },
  {
    slug: "motor-insurance",
    name: "Motor Insurance",
    category: "Insurance",
    tagline: "Complete protection for your vehicles",
    benefit: "Third-party liability, own damage cover, and add-on options.",
    eligibility: "Vehicle owners with valid registration",
    documents: ["Vehicle registration", "Driving license", "Previous policy"],
    processingTime: "Policy issuance instantly",
    icon: Shield,
  },
  {
    slug: "accounting-services",
    name: "Accounting & Auditing",
    category: "Accounting",
    tagline: "Professional accounting and auditing services",
    benefit: "Complete financial management with compliance and reporting.",
    eligibility: "Businesses requiring accounting support",
    documents: ["Business registration", "Financial records", "GST registration"],
    processingTime: "Consultation within 24 hours",
    icon: Calculator,
  },
  {
    slug: "tax-consulting",
    name: "Tax Consulting",
    category: "Accounting",
    tagline: "Expert tax planning and consulting services",
    benefit: "Optimize tax structure and ensure compliance with regulations.",
    eligibility: "Individuals and businesses with tax planning needs",
    documents: ["PAN & Aadhaar", "ITR documents", "Financial statements"],
    processingTime: "Consultation within 48 hours",
    icon: Calculator,
  },
  {
    slug: "holiday-packages",
    name: "Holiday Club - Flights & Packages",
    category: "Holiday Club",
    tagline: "Exclusive holiday packages and flight deals",
    benefit: "Premium travel experiences with discounted rates and special offers.",
    eligibility: "Individuals and families seeking travel packages",
    documents: ["ID proof", "Travel documents", "Booking confirmation"],
    processingTime: "Package confirmation in 24 hours",
    icon: Plane,
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
