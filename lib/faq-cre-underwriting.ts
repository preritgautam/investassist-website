import type { FaqItem } from '@/components/landing/faq-section'

export const creUnderwritingFaqs: FaqItem[] = [
  {
    question: 'How accurate is InvestAssist AI analysis?',
    answer:
      'InvestAssist uses advanced machine learning trained on thousands of CRE deals. Our AI achieves 95%+ accuracy on financial extraction compared to manual analysis. All results are reviewed for quality before delivery. For critical decisions, we recommend having your team review the analysis, as with any underwriting tool.',
  },
  {
    question: 'What file formats does InvestAssist accept?',
    answer:
      'We accept PDF, Excel (.xlsx), and CSV files. Common documents include T-12 statements, rent rolls, offering memorandums, operating statements, and balance sheets. You can upload multiple files per deal—our AI correlates data across documents.',
  },
  {
    question: 'How long does analysis take?',
    answer:
      'Most deals are analyzed in 2-5 minutes after upload. The timeline depends on document complexity and file size. You&apos;ll receive an email notification when your report is ready, and can download it instantly from your dashboard.',
  },
  {
    question: 'Is my deal data secure?',
    answer:
      'Yes. All documents are encrypted in transit and at rest using AES-256 encryption. InvestAssist is SOC 2 Type II compliant. We never sell or share your data, and you can request deletion anytime. Your deal information stays completely confidential.',
  },
  {
    question: 'Can I export reports or integrate with other software?',
    answer:
      'Yes. Reports download as professional PDFs with all visualizations and metrics. Enterprise customers can access our API to embed InvestAssist into their own software. Contact sales for white-label and integration options.',
  },
  {
    question: 'What happens after my 3 free analyses?',
    answer:
      'After free credits are exhausted, you can purchase additional analyses on a pay-as-you-go basis or upgrade to a subscription plan. Enterprise customers receive unlimited analyses plus API access and dedicated support.',
  },
  {
    question: 'Does InvestAssist replace human underwriters?',
    answer:
      'No. InvestAssist is designed to augment your team, not replace it. We automate the tedious data extraction and calculations, freeing your underwriters to focus on deal strategy, market context, and investment decisions. Your expertise remains central.',
  },
  {
    question: 'Can I use InvestAssist for syndication or investor reporting?',
    answer:
      'Absolutely. Many firms use InvestAssist reports in investor decks and offering documents. The professional formatting and detailed metrics make it easy to communicate deal quality to LPs. White-label branding is available for syndication platforms.',
  },
  {
    question: 'How does InvestAssist calculate market benchmarks?',
    answer:
      'We aggregate anonymized market data from CoStar, CBRE, and proprietary sources. The AI identifies comparable properties based on geography, asset class, tenant mix, and lease structure—then compares your deal&apos;s metrics against the comps to highlight outliers and opportunities.',
  },
  {
    question: 'Do you offer an API or developer access?',
    answer:
      'Yes. Enterprise customers get full REST API access, webhooks, and SDKs for JavaScript, Python, and Ruby. You can automate deal submission, retrieve results programmatically, and integrate into your workflows. Contact sales for API documentation and pricing.',
  },
]
