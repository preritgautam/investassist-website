"use client"

import { SUPPORT_EMAIL, SUPPORT_MAILTO } from "@/lib/brand"
import Link from "next/link"
import { BrandMark } from "@/components/ui/logo"
import { LegalBackLink } from "@/components/legal/legal-back-link"
import { HeaderActions } from "@/components/ui/header-actions"
import { Button } from "@/components/ui/button"
import { Card,CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, AlertTriangle, Ban, Lock, Scale, FileText, CheckCircle, XCircle } from "lucide-react"

export default function AcceptableUsePolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `This Acceptable Use Policy ("AUP") governs the use of InvestAssist's services and platform. It is designed to protect our users, our platform, and the broader internet community from harmful activities.

By using InvestAssist, you agree to comply with this AUP. Violation of this policy may result in suspension or termination of your account without refund.

This AUP applies to all users of InvestAssist, including:
• Account holders and administrators
• Team members and collaborators
• Investors and other authorized users
• Anyone accessing the platform through shared links or data rooms`
    },
    {
      id: "prohibited-content",
      title: "2. Prohibited Content",
      icon: Ban,
      content: `You may not use InvestAssist to create, store, share, or distribute content that:

ILLEGAL CONTENT:
• Violates any applicable law, regulation, or court order
• Promotes or facilitates illegal activities
• Infringes on intellectual property rights (copyright, trademark, patents)
• Contains stolen or misappropriated information

HARMFUL CONTENT:
• Contains malware, viruses, or other harmful code
• Is defamatory, libelous, or fraudulent
• Constitutes harassment, bullying, or threats
• Contains hate speech or discrimination based on protected characteristics
• Promotes violence or self-harm

INAPPROPRIATE CONTENT:
• Pornographic, sexually explicit, or obscene material
• Content depicting or exploiting minors
• Gratuitously violent or graphic content
• Content that is misleading or deceptive`
    },
    {
      id: "prohibited-activities",
      title: "3. Prohibited Activities",
      icon: XCircle,
      content: `You may not engage in the following activities:

SECURITY VIOLATIONS:
• Attempting to gain unauthorized access to systems, accounts, or data
• Bypassing or circumventing security measures
• Performing vulnerability scans or penetration tests without authorization
• Exploiting security vulnerabilities
• Sharing account credentials or allowing unauthorized access

SYSTEM ABUSE:
• Interfering with or disrupting the platform's operations
• Overloading systems through excessive requests or denial-of-service attacks
• Using automated tools to scrape, crawl, or extract data
• Reverse engineering, decompiling, or disassembling the platform
• Mining cryptocurrency or running unauthorized computational workloads

FRAUD AND DECEPTION:
• Creating fake accounts or impersonating others
• Providing false information during registration or verification
• Using the platform for phishing, scams, or fraud
• Manipulating data, analytics, or reports

SPAM AND ABUSE:
• Sending unsolicited bulk communications
• Using the platform to harvest email addresses or contact information
• Engaging in any form of spam or promotional abuse`
    },
    {
      id: "financial-compliance",
      title: "4. Financial Industry Compliance",
      icon: Scale,
      content: `Given the nature of InvestAssist as a financial services platform, additional requirements apply:

SECURITIES COMPLIANCE:
• You must comply with all applicable securities laws and regulations
• You may not use the platform to facilitate insider trading or market manipulation
• Offering memorandums and investor communications must be truthful and compliant
• You are responsible for ensuring appropriate investor accreditation

ANTI-MONEY LAUNDERING:
• You may not use the platform to launder money or finance terrorism
• You must comply with applicable KYC (Know Your Customer) requirements
• Suspicious activities must be reported to appropriate authorities

DATA ACCURACY:
• Financial data and projections must be presented honestly
• You may not misrepresent deal terms, returns, or risk factors
• Historical performance must be accurately represented

PROFESSIONAL CONDUCT:
• Maintain professional standards in investor communications
• Respect confidentiality of deal information
• Honor commitments made through the platform`
    },
    {
      id: "resource-usage",
      title: "5. Resource Usage",
      icon: Lock,
      content: `To ensure fair access for all users, the following resource usage limits apply:

STORAGE:
• Each account is subject to storage limits based on subscription tier
• Large file uploads must be within specified size limits
• Excessive storage usage may be throttled or require upgrade

API USAGE:
• API calls are rate-limited to prevent abuse
• Automated tools must respect rate limits
• Bulk operations should be scheduled during off-peak hours

CREDITS:
• Credits must be used for their intended purpose
• Automated credit consumption is monitored for abuse
• Credit sharing between accounts is prohibited

FAIR USE:
• Platform resources should be used for legitimate business purposes
• Resource-intensive operations may be subject to additional review
• We reserve the right to limit usage that impacts other users`
    },
    {
      id: "data-handling",
      title: "6. Data Handling Requirements",
      icon: Shield,
      content: `When using InvestAssist, you must handle data responsibly:

YOUR DATA:
• You are responsible for the accuracy of data you upload
• You must have the right to use and share data you upload
• Personal data must be collected and shared in compliance with privacy laws

INVESTOR DATA:
• Protect investor personal information appropriately
• Only share investor data with authorized parties
• Comply with investor data access requests

CONFIDENTIAL INFORMATION:
• Maintain confidentiality of deal information as appropriate
• Use access controls to limit data exposure
• Report any data breaches or unauthorized access

DATA EXPORT:
• Exported data must be handled securely
• You remain responsible for data after export
• Third-party sharing must comply with applicable agreements`
    },
    {
      id: "enforcement",
      title: "7. Enforcement",
      icon: AlertTriangle,
      content: `MONITORING:
InvestAssist may monitor usage to detect violations of this AUP. Monitoring may include:
• Automated scanning for prohibited content
• Review of reported violations
• Analysis of usage patterns

REPORTING VIOLATIONS:
If you become aware of a violation of this AUP, please report it to:
• Email: support@investassist.ai
• In-app reporting feature

VIOLATION CONSEQUENCES:
Depending on the severity and nature of the violation, we may:
• Issue a warning and request remediation
• Temporarily suspend access to the platform
• Permanently terminate the account
• Remove or disable access to content
• Report violations to law enforcement
• Pursue legal remedies

APPEALS:
If you believe enforcement action was taken in error, you may appeal by contacting support@investassist.ai within 30 days. Appeals will be reviewed within 10 business days.

NO REFUNDS:
Accounts terminated for AUP violations are not entitled to refunds.`
    },
    {
      id: "examples",
      title: "8. Examples of Violations",
      icon: XCircle,
      content: `The following are examples of AUP violations (non-exhaustive):

CLEAR VIOLATIONS:
✗ Uploading documents containing malware
✗ Creating fake investor profiles
✗ Sharing login credentials with unauthorized users
✗ Using AI credits to process unrelated content
✗ Scraping data from other users' deals
✗ Sending bulk promotional emails to investor contacts
✗ Misrepresenting financial returns or projections
✗ Accessing another user's account without permission

ACCEPTABLE USE:
✓ Managing legitimate real estate investment deals
✓ Communicating with qualified investors
✓ Generating reports and analysis for deal evaluation
✓ Collaborating with team members on due diligence
✓ Using API for authorized integrations
✓ Exporting your own data for backup or reporting`
    },
    {
      id: "updates",
      title: "9. Policy Updates",
      icon: FileText,
      content: `We may update this AUP from time to time to address new threats, clarify guidelines, or reflect changes in our services.

NOTIFICATION:
• Material changes will be communicated via email
• The "Last Updated" date will be revised
• Continued use after changes constitutes acceptance

REVIEW:
• We recommend reviewing this policy periodically
• Questions about the policy can be directed to support@investassist.ai`
    },
    {
      id: "contact",
      title: "10. Contact Information",
      icon: CheckCircle,
      content: `For questions about this Acceptable Use Policy:

GENERAL INQUIRIES:
Email: support@investassist.ai
Phone: +1-647-999-5515

REPORT VIOLATIONS:
Email: support@investassist.ai

LEGAL MATTERS:
Email: support@investassist.ai

MAIL:
InvestAssist
325 Front Street West, Suite 400
Toronto, ON M5V 2Y1
Canada

All disputes arising from this policy shall be resolved in the courts of Ontario, Canada.`
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
              <Shield className="h-6 w-6 text-brand-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Acceptable Use Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 15, 2026</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This policy outlines what is and isn't allowed when using InvestAssist to ensure a safe, professional environment for all users.
          </p>
        </div>

        {/* Summary Card */}
        <Card className="border-brand-200 bg-brand-50/50 mb-8">
          <CardContent className="card-pad">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-brand-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Key Points</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use InvestAssist only for legitimate investment management purposes</li>
                  <li>• Do not upload illegal, harmful, or inappropriate content</li>
                  <li>• Protect your account credentials and don't share access</li>
                  <li>• Comply with all applicable financial regulations</li>
                  <li>• Violations may result in account termination without refund</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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

        {/* Report Violation */}
        <div className="mt-10 card-pad bg-muted rounded-sm text-center">
          <h3 className="font-semibold text-foreground mb-2">Report a Violation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you encounter content or behavior that violates this policy, please report it.
          </p>
          <a href={SUPPORT_MAILTO}>
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
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
