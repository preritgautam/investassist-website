"use client"

import { SUPPORT_EMAIL, SUPPORT_MAILTO } from "@/lib/brand"
import Link from "next/link"
import { BrandMark } from "@/components/ui/logo"
import { LegalBackLink } from "@/components/legal/legal-back-link"
import { HeaderActions } from "@/components/ui/header-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, CreditCard, Shield, Globe, Gavel } from "lucide-react"

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: FileText,
      content: `By accessing or using InvestAssist ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years old and have the legal capacity to enter into a binding agreement.

We reserve the right to update these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.`
    },
    {
      id: "description",
      title: "2. Description of Service",
      icon: Globe,
      content: `InvestAssist is a professional investment deal management platform that provides:

• Deal management and workflow automation
• Financial modeling and analysis tools
• Investor relationship management
• Document management and data rooms
• AI-powered deal analysis and insights
• Capital call and distribution management
• Market data and comparable analysis

The Service is provided on an "as is" and "as available" basis. We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice.`
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      icon: Users,
      content: `To access certain features of the Service, you must create an account. When creating an account, you agree to:

• Provide accurate, current, and complete information
• Maintain and promptly update your account information
• Keep your password secure and confidential
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized access

We reserve the right to suspend or terminate accounts that violate these Terms, contain false information, or engage in fraudulent activity.

You may not share your account credentials with others or allow multiple people to use your account, unless explicitly authorized under an enterprise plan.`
    },
    {
      id: "billing",
      title: "4. Billing and Payments",
      icon: CreditCard,
      content: `Certain features of the Service require payment of fees. By subscribing to a paid plan, you agree to:

• Pay all applicable fees as described at the time of purchase
• Provide valid payment information
• Authorize us to charge your payment method for recurring fees

CREDIT SYSTEM: Credits are used for premium features including AI analysis, document generation, and advanced analytics. Credits are non-refundable and non-transferable. Unused credits do not expire.

REFUNDS: Subscription fees are non-refundable except as required by law or as explicitly stated in our refund policy. Credit purchases are final and non-refundable.

PRICE CHANGES: We may change our prices at any time. Price changes will be communicated in advance and will apply to subsequent billing cycles.`
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use",
      icon: Shield,
      content: `You agree not to use the Service to:

• Violate any applicable laws or regulations
• Infringe upon the rights of others, including intellectual property rights
• Transmit harmful code, viruses, or malware
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the Service or servers
• Collect user information without consent
• Use the Service for any illegal or fraudulent purpose
• Impersonate any person or entity
• Harass, abuse, or harm another person
• Send unsolicited communications (spam)

Violation of these rules may result in immediate termination of your account without refund.`
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      icon: Scale,
      content: `The Service and its original content, features, and functionality are owned by InvestAssist and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

YOUR CONTENT: You retain ownership of any content you submit, post, or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing the Service.

OUR CONTENT: You may not copy, modify, distribute, sell, or lease any part of our Service or included software, nor may you reverse engineer or attempt to extract the source code of that software.`
    },
    {
      id: "limitation",
      title: "7. Limitation of Liability",
      icon: AlertTriangle,
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, INVESTASSIST SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:

• Loss of profits, data, use, goodwill, or other intangible losses
• Any unauthorized access to or alteration of your transmissions or data
• Any interruption or cessation of the Service
• Any bugs, viruses, or errors in the Service
• Any content obtained from the Service

In no event shall our total liability exceed the amount you paid to us in the twelve (12) months preceding the claim.

Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.`
    },
    {
      id: "indemnification",
      title: "8. Indemnification",
      icon: Shield,
      content: `You agree to defend, indemnify, and hold harmless InvestAssist, its affiliates, officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:

• Your use of and access to the Service
• Your violation of any term of these Terms
• Your violation of any third-party right, including intellectual property rights
• Any claim that your content caused damage to a third party

This defense and indemnification obligation will survive termination of these Terms and your use of the Service.`
    },
    {
      id: "termination",
      title: "9. Termination",
      icon: AlertTriangle,
      content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.

Upon termination:
• Your right to use the Service will immediately cease
• You may request export of your data within 30 days
• After 90 days, your data will be permanently deleted
• Any credits or prepaid amounts are forfeited

All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`
    },
    {
      id: "governing-law",
      title: "10. Governing Law & Disputes",
      icon: Gavel,
      content: `These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.

All disputes arising out of or relating to these Terms or the Service shall be resolved exclusively in the courts located in Ontario, Canada. You consent to the personal jurisdiction of such courts and waive any objection based on venue or inconvenient forum.

DISPUTE RESOLUTION: Before filing a claim, you agree to attempt to resolve the dispute informally by contacting us at support@investassist.ai. If a dispute is not resolved within 30 days, either party may proceed with formal legal action.

CLASS ACTION WAIVER: You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.`
    },
    {
      id: "general",
      title: "11. General Provisions",
      icon: FileText,
      content: `ENTIRE AGREEMENT: These Terms constitute the entire agreement between you and InvestAssist regarding the Service and supersede all prior agreements.

SEVERABILITY: If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.

WAIVER: The failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.

ASSIGNMENT: You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.

NOTICES: We may provide notices to you via email, regular mail, or postings on the Service. You may contact us at support@investassist.ai.`
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
            <div className="h-12 w-12 rounded-sm bg-muted flex items-center justify-center">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Terms of Service</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 15, 2026</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Please read these Terms of Service carefully before using InvestAssist. These terms govern your use of our platform and services.
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
        <div className="mt-10 card-pad bg-muted rounded-sm text-center">
          <h3 className="font-semibold text-foreground mb-2">Questions about these Terms?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our legal team for clarification or concerns.
          </p>
          <a href={SUPPORT_MAILTO}>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
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
