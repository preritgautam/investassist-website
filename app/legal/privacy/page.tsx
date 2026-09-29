"use client"

import { SUPPORT_EMAIL, SUPPORT_MAILTO } from "@/lib/brand"
import Link from "next/link"
import { BrandMark } from "@/components/ui/logo"
import { LegalBackLink } from "@/components/legal/legal-back-link"
import { HeaderActions } from "@/components/ui/header-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Database, Lock, Globe, UserCheck, Bell, FileText, Scale } from "lucide-react"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `InvestAssist ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our investment deal management platform.

By using InvestAssist, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.

This policy applies to:
• The InvestAssist web application at investassist.ai
• Our mobile applications (when available)
• All related services and communications`
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: Database,
      content: `INFORMATION YOU PROVIDE:
• Account Information: Name, email address, phone number, company name, job title
• Profile Information: Photo, biography, professional credentials
• Financial Information: Payment card details (processed by our payment provider)
• Deal Information: Property details, financial models, investor data, documents
• Communications: Messages, emails, support requests, and feedback

AUTOMATICALLY COLLECTED INFORMATION:
• Device Information: IP address, browser type, operating system, device identifiers
• Usage Data: Pages visited, features used, time spent, clicks, navigation patterns
• Location Data: General geographic location based on IP address
• Cookies: Session cookies, preference cookies, and analytics cookies

INFORMATION FROM THIRD PARTIES:
• Authentication providers (Google) when you use social sign-in
• Integrated services (CRM, property management systems) when you connect them
• Market data providers for deal analysis features`
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We use collected information for the following purposes:

SERVICE DELIVERY:
• Provide, maintain, and improve the Service
• Process transactions and manage your account
• Enable deal management, collaboration, and investor communications
• Generate AI-powered analysis and insights

COMMUNICATIONS:
• Send service-related notifications and updates
• Respond to your inquiries and support requests
• Send marketing communications (with your consent)

ANALYTICS & IMPROVEMENT:
• Analyze usage patterns to improve user experience
• Develop new features and services
• Conduct research and analysis

SECURITY & COMPLIANCE:
• Detect and prevent fraud, abuse, and security incidents
• Comply with legal obligations and enforce our terms
• Protect the rights and safety of our users`
    },
    {
      id: "data-sharing",
      title: "4. How We Share Your Information",
      icon: UserCheck,
      content: `We do NOT sell your personal information. We may share your information in the following circumstances:

WITH YOUR CONSENT:
• When you invite team members or investors to access your deals
• When you connect third-party integrations
• When you explicitly authorize sharing

SERVICE PROVIDERS:
• Cloud hosting providers (AWS, Vercel)
• Payment processors (Stripe)
• Analytics providers (with anonymized data)
• Customer support tools

BUSINESS PURPOSES:
• To comply with legal obligations, subpoenas, or court orders
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets
• To enforce our terms and policies

AGGREGATED DATA:
• We may share aggregated, de-identified data for research, industry analysis, or marketing purposes. This data cannot be used to identify you.`
    },
    {
      id: "data-security",
      title: "5. Data Security",
      icon: Lock,
      content: `We implement robust security measures to protect your information:

ENCRYPTION:
• Data in transit: TLS 1.3 encryption for all communications
• Data at rest: AES-256 encryption for stored data
• Database encryption for sensitive fields

ACCESS CONTROLS:
• Role-based access control (RBAC)
• Multi-factor authentication available
• Regular access reviews and audit logs

INFRASTRUCTURE:
• SOC 2 Type II certified infrastructure
• Regular security assessments and penetration testing
• Automated threat detection and monitoring
• Secure backup and disaster recovery procedures

INCIDENT RESPONSE:
• Dedicated security team for incident response
• Breach notification within 72 hours as required by law
• Post-incident analysis and remediation

While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.`
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      icon: Database,
      content: `We retain your information for as long as necessary to provide the Service and fulfill the purposes outlined in this policy:

ACTIVE ACCOUNTS:
• Account information: Retained while your account is active
• Deal data: Retained until you delete the deal or close your account
• Usage logs: Retained for 12 months

DELETED CONTENT:
• Deleted items: Moved to trash for 30 days, then permanently deleted
• Closed accounts: Data retained for 90 days, then permanently deleted
• Backups: May contain deleted data for up to 30 additional days

LEGAL REQUIREMENTS:
• Financial records: Retained for 7 years for tax/audit purposes
• Legal holds: Data may be retained longer if required by law

You may request deletion of your data at any time through your account settings or by contacting support@investassist.ai.`
    },
    {
      id: "your-rights",
      title: "7. Your Privacy Rights",
      icon: UserCheck,
      content: `Depending on your location, you may have the following rights regarding your personal information:

ACCESS: Request a copy of the personal information we hold about you.

CORRECTION: Request correction of inaccurate or incomplete information.

DELETION: Request deletion of your personal information, subject to legal retention requirements.

PORTABILITY: Request your data in a portable, machine-readable format.

OBJECTION: Object to certain processing activities, including marketing.

RESTRICTION: Request limitation of how we process your data.

WITHDRAWAL: Withdraw consent for processing based on consent.

To exercise these rights, contact support@investassist.ai or use the tools in your account settings. We will respond to requests within 30 days.

FOR CALIFORNIA RESIDENTS (CCPA):
• You have the right to know what personal information is collected
• You have the right to request deletion of your information
• You have the right to opt-out of the sale of personal information (we do not sell data)
• You have the right to non-discrimination for exercising your rights`
    },
    {
      id: "cookies",
      title: "8. Cookies and Tracking",
      icon: Bell,
      content: `We use cookies and similar technologies to enhance your experience:

ESSENTIAL COOKIES:
• Authentication and session management
• Security features
• Core functionality

PREFERENCE COOKIES:
• Remember your settings and preferences
• Language and display preferences

ANALYTICS COOKIES:
• Understand how users interact with the Service
• Identify areas for improvement
• Track feature adoption

MANAGING COOKIES:
• Most browsers allow you to control cookies through settings
• Disabling essential cookies may prevent you from using certain features
• We honor Do Not Track (DNT) browser signals

THIRD-PARTY TRACKING:
• We use analytics services that may set their own cookies
• We do not allow third-party advertising cookies`
    },
    {
      id: "international",
      title: "9. International Data Transfers",
      icon: Globe,
      content: `InvestAssist is based in Ontario, Canada. Your information may be transferred to and processed in countries other than your own.

DATA TRANSFERS:
• We use cloud infrastructure in North America
• Some service providers may process data in other regions
• We ensure appropriate safeguards are in place for transfers

SAFEGUARDS:
• Standard Contractual Clauses (SCCs) for transfers outside Canada
• Data Processing Agreements with all processors
• Compliance with applicable data protection laws

FOR EU/EEA USERS:
• We comply with GDPR requirements
• EU-based users can exercise rights under GDPR
• Contact our Data Protection Officer at support@investassist.ai

FOR CANADIAN USERS:
• We comply with PIPEDA and applicable provincial laws
• You have rights under Canadian privacy legislation`
    },
    {
      id: "children",
      title: "10. Children's Privacy",
      icon: Shield,
      content: `InvestAssist is not intended for use by children under 18 years of age. We do not knowingly collect personal information from children.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us at support@investassist.ai. If we discover that we have collected personal information from a child without verification of parental consent, we will take steps to delete that information.`
    },
    {
      id: "changes",
      title: "11. Changes to This Policy",
      icon: FileText,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.

NOTIFICATION:
• Material changes will be communicated via email or prominent notice in the Service
• The "Last Updated" date will be revised
• Continued use after changes constitutes acceptance

REVIEW:
• We encourage you to review this policy periodically
• Historical versions are available upon request`
    },
    {
      id: "contact",
      title: "12. Contact Us",
      icon: Scale,
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

EMAIL: support@investassist.ai
PHONE: +1-647-999-5515

MAIL:
InvestAssist
Attn: Privacy Team
325 Front Street West, Suite 400
Toronto, ON M5V 2Y1
Canada

DATA PROTECTION OFFICER:
For GDPR-related inquiries: support@investassist.ai

We will respond to your inquiry within 30 days.`
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="prose-container flex items-center justify-between py-3">
          <LegalBackLink />
          <HeaderActions>
            <BrandMark href={null} />
          </HeaderActions>
        </div>
      </header>

      <main className="prose-container py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-sm bg-brand-50 border border-brand-200/50 flex items-center justify-center">
              <Shield className="h-6 w-6 text-brand-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 15, 2026</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Your privacy is important to us. This policy explains how InvestAssist collects, uses, and protects your personal information.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="border-border rounded-sm mb-8">
          <CardContent className="card-pad">
            <h2 className="font-semibold text-foreground mb-4">Table of Contents</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-brand-700 hover:text-brand-700 hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <Card key={section.id} id={section.id} className="border-border rounded-sm scroll-mt-20">
              <CardContent className="card-pad">
                <div className="flex items-start gap-3 mb-4">
                  <div className="hidden sm:flex h-10 w-10 rounded-sm bg-muted items-center justify-center shrink-0">
                    <section.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground text-balance sm:pt-2">{section.title}</h2>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line sm:pl-13">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 card-pad bg-brand-50 border border-brand-200/50 rounded-sm text-center">
          <h3 className="font-semibold text-foreground mb-2">Privacy Questions?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our privacy team for any questions or to exercise your rights.
          </p>
          <a href={SUPPORT_MAILTO}>
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              {SUPPORT_EMAIL}
            </Button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="prose-container py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InvestAssist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
