"use client"

import { SUPPORT_EMAIL, SUPPORT_MAILTO } from "@/lib/brand"
import Link from "next/link"
import { BrandMark } from "@/components/ui/logo"
import { LegalBackLink } from "@/components/legal/legal-back-link"
import { HeaderActions } from "@/components/ui/header-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Database, Shield, Lock, Globe, Users, AlertTriangle, CheckCircle } from "lucide-react"

export default function DataProcessingAgreementPage() {
  const sections = [
    {
      id: "definitions",
      title: "1. Definitions",
      icon: FileText,
      content: `For the purposes of this Data Processing Agreement ("DPA"):

"Controller" means the entity that determines the purposes and means of processing Personal Data (you, the Customer).

"Processor" means the entity that processes Personal Data on behalf of the Controller (InvestAssist).

"Personal Data" means any information relating to an identified or identifiable natural person.

"Processing" means any operation performed on Personal Data, including collection, storage, use, disclosure, and deletion.

"Data Subject" means the individual to whom Personal Data relates.

"Sub-processor" means any third party engaged by InvestAssist to process Personal Data.

"Security Incident" means any unauthorized access, acquisition, use, or disclosure of Personal Data.

"Applicable Data Protection Law" means all laws and regulations relating to data protection, including GDPR, CCPA, PIPEDA, and provincial privacy laws.`
    },
    {
      id: "scope",
      title: "2. Scope and Purpose",
      icon: Database,
      content: `This DPA applies to the processing of Personal Data by InvestAssist on behalf of the Customer in connection with the InvestAssist platform and services.

SUBJECT MATTER:
The provision of investment deal management services including document management, investor communications, financial modeling, and AI-powered analysis.

NATURE OF PROCESSING:
Collection, storage, organization, retrieval, use, transmission, and deletion of Personal Data as necessary to provide the Services.

PURPOSE:
To enable the Customer to manage investment deals, communicate with investors, and utilize platform features.

CATEGORIES OF DATA SUBJECTS:
• Customer employees and team members
• Investors and limited partners
• Deal counterparties and contacts
• Third-party service providers

TYPES OF PERSONAL DATA:
• Contact information (name, email, phone, address)
• Professional information (job title, company, credentials)
• Financial information (investment amounts, distributions)
• Communications and correspondence
• Usage data and platform interactions`
    },
    {
      id: "obligations-processor",
      title: "3. Processor Obligations",
      icon: Shield,
      content: `InvestAssist, as Processor, agrees to:

PROCESSING INSTRUCTIONS:
• Process Personal Data only on documented instructions from the Customer
• Inform the Customer if an instruction appears to infringe Applicable Data Protection Law
• Not process Personal Data for any purpose other than providing the Services

CONFIDENTIALITY:
• Ensure all personnel processing Personal Data are bound by confidentiality obligations
• Limit access to Personal Data to personnel who require access to perform the Services

SECURITY:
• Implement appropriate technical and organizational measures to protect Personal Data
• Maintain SOC 2 Type II certification
• Conduct regular security assessments and penetration testing
• Implement encryption for data in transit and at rest

ASSISTANCE:
• Assist the Customer in responding to Data Subject requests
• Assist with data protection impact assessments when required
• Assist with regulatory consultations and notifications`
    },
    {
      id: "obligations-controller",
      title: "4. Controller Obligations",
      icon: Users,
      content: `The Customer, as Controller, agrees to:

LAWFUL BASIS:
• Ensure there is a lawful basis for processing Personal Data
• Provide appropriate privacy notices to Data Subjects
• Obtain necessary consents where required

INSTRUCTIONS:
• Provide clear, documented processing instructions
• Ensure instructions comply with Applicable Data Protection Law
• Respond promptly to InvestAssist inquiries regarding instructions

DATA QUALITY:
• Ensure Personal Data provided is accurate and up-to-date
• Promptly notify InvestAssist of any corrections or updates

COOPERATION:
• Cooperate with InvestAssist in fulfilling obligations under this DPA
• Provide information necessary for InvestAssist to comply with its obligations`
    },
    {
      id: "sub-processors",
      title: "5. Sub-processors",
      icon: Globe,
      content: `AUTHORIZATION:
The Customer provides general authorization for InvestAssist to engage Sub-processors to process Personal Data.

CURRENT SUB-PROCESSORS:
• Amazon Web Services (AWS) - Cloud infrastructure and hosting
• Vercel - Application hosting and edge computing
• Stripe - Payment processing
• SendGrid - Email delivery services
• OpenAI - AI processing (anonymized data only)
• Google Cloud - Document processing and analytics

REQUIREMENTS:
InvestAssist will ensure that each Sub-processor:
• Is bound by data protection obligations consistent with this DPA
• Implements appropriate technical and organizational security measures
• Only processes Personal Data to the extent necessary

NOTIFICATION:
• InvestAssist will maintain a list of current Sub-processors
• Customer will be notified of any changes to Sub-processors with 30 days' notice
• Customer may object to a new Sub-processor within 14 days of notification

OBJECTION:
If Customer objects to a Sub-processor, the parties will work in good faith to resolve the objection. If resolution is not possible, Customer may terminate affected services.`
    },
    {
      id: "data-subject-rights",
      title: "6. Data Subject Rights",
      icon: Users,
      content: `ASSISTANCE:
InvestAssist will assist the Customer in responding to Data Subject requests to exercise their rights, including:

• Right of access
• Right to rectification
• Right to erasure ("right to be forgotten")
• Right to restriction of processing
• Right to data portability
• Right to object
• Rights related to automated decision-making

RESPONSE:
• InvestAssist will promptly notify Customer of any Data Subject request received directly
• InvestAssist will not respond directly to Data Subject requests without Customer authorization (except to direct them to Customer)
• InvestAssist will provide reasonable assistance to enable Customer to respond within required timeframes

TOOLS:
InvestAssist provides self-service tools in the platform to facilitate Data Subject requests, including data export and deletion features.`
    },
    {
      id: "security-incidents",
      title: "7. Security Incidents",
      icon: AlertTriangle,
      content: `NOTIFICATION:
InvestAssist will notify the Customer of any Security Incident without undue delay and within 72 hours of becoming aware of the incident.

NOTIFICATION CONTENT:
The notification will include:
• Description of the nature of the incident
• Categories and approximate number of Data Subjects affected
• Categories and approximate number of Personal Data records affected
• Contact information for InvestAssist's security team
• Description of measures taken or proposed to address the incident

COOPERATION:
InvestAssist will:
• Cooperate with Customer's investigation of the incident
• Take reasonable steps to mitigate the effects of the incident
• Provide updates on the investigation and remediation efforts
• Preserve evidence related to the incident

CUSTOMER OBLIGATIONS:
Customer is responsible for:
• Notifying supervisory authorities as required by law
• Notifying affected Data Subjects as required by law
• Coordinating public communications regarding the incident`
    },
    {
      id: "audits",
      title: "8. Audits and Compliance",
      icon: CheckCircle,
      content: `DOCUMENTATION:
InvestAssist will maintain documentation demonstrating compliance with this DPA and Applicable Data Protection Law.

AUDIT RIGHTS:
Customer may, upon reasonable notice:
• Request and review InvestAssist's security certifications and audit reports
• Request completion of security questionnaires
• Conduct or commission an audit of InvestAssist's processing activities (subject to reasonable limitations)

AUDIT PROCESS:
• Audits will be conducted during normal business hours
• Customer will provide at least 30 days' notice
• Scope will be limited to matters relevant to this DPA
• Customer will bear the costs of any third-party audits
• Results will be treated as confidential information

CERTIFICATIONS:
InvestAssist maintains the following certifications:
• SOC 2 Type II
• ISO 27001 (in progress)

Copies of audit reports and certifications are available upon request.`
    },
    {
      id: "international-transfers",
      title: "9. International Data Transfers",
      icon: Globe,
      content: `TRANSFER MECHANISMS:
For transfers of Personal Data outside of Canada or the EEA, InvestAssist will ensure appropriate safeguards are in place:

• Standard Contractual Clauses (SCCs) - EU Commission approved clauses
• Binding Corporate Rules where applicable
• Adequacy decisions where available

DATA LOCALIZATION:
• Primary data storage is in Canada and the United States
• Enterprise customers may request specific data residency arrangements
• Sub-processors may process data in other jurisdictions as listed in Section 5

SUPPLEMENTARY MEASURES:
InvestAssist implements supplementary measures including:
• Encryption of data in transit and at rest
• Access controls and authentication requirements
• Regular security assessments
• Contractual protections with Sub-processors`
    },
    {
      id: "term-termination",
      title: "10. Term and Termination",
      icon: FileText,
      content: `TERM:
This DPA remains in effect for the duration of the Customer's use of InvestAssist services.

TERMINATION:
Upon termination of services:
• InvestAssist will cease processing Personal Data
• Customer may request export of Personal Data within 30 days
• InvestAssist will delete Personal Data within 90 days of termination
• Backups will be deleted according to standard backup retention schedules

SURVIVAL:
The following provisions will survive termination:
• Confidentiality obligations
• Obligations regarding Security Incidents
• Cooperation with audits for a reasonable period
• Any accrued rights or obligations

RETURN OF DATA:
Upon request, InvestAssist will:
• Export Personal Data in a commonly used format
• Provide confirmation of deletion
• Retain data only as required by law`
    },
    {
      id: "liability",
      title: "11. Liability",
      icon: AlertTriangle,
      content: `LIMITATION:
Each party's liability under this DPA is subject to the limitations of liability in the main Services Agreement.

ALLOCATION:
• Each party is liable for its own violations of Applicable Data Protection Law
• InvestAssist is liable for acts and omissions of its Sub-processors
• Customer is liable for ensuring lawful basis and providing accurate instructions

INDEMNIFICATION:
Each party agrees to indemnify the other for any fines, penalties, or damages arising from the indemnifying party's breach of this DPA or Applicable Data Protection Law.`
    },
    {
      id: "general",
      title: "12. General Provisions",
      icon: FileText,
      content: `GOVERNING LAW:
This DPA is governed by the laws of the Province of Ontario, Canada.

JURISDICTION:
Any disputes will be resolved in the courts of Ontario, Canada.

AMENDMENTS:
InvestAssist may update this DPA to reflect changes in Applicable Data Protection Law. Material changes will be communicated to Customer with 30 days' notice.

CONFLICT:
In case of conflict between this DPA and the main Services Agreement, this DPA will prevail with respect to data protection matters.

CONTACT:
For questions about this DPA, contact:
support@investassist.ai

InvestAssist
325 Front Street West, Suite 400
Toronto, ON M5V 2Y1
Canada`
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
              <Database className="h-6 w-6 text-brand-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Data Processing Agreement</h1>
              <p className="text-sm text-muted-foreground">Last updated: March 15, 2026</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This Data Processing Agreement governs how InvestAssist processes personal data on your behalf in compliance with GDPR, CCPA, PIPEDA, and other applicable data protection laws.
          </p>
        </div>

        {/* Enterprise Note */}
        <Card className="border-brand-200 bg-brand-50/50 mb-8">
          <CardContent className="card-pad">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-brand-700 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Enterprise Customers</h3>
                <p className="text-sm text-muted-foreground">
                  If you require a signed DPA or custom terms, please contact our legal team at{" "}
                  <a href={SUPPORT_MAILTO} className="text-brand-700 hover:text-brand-700">
                    {SUPPORT_EMAIL}
                  </a>
                  . We can provide a signed copy of this standard DPA or negotiate custom terms as needed.
                </p>
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

        {/* Contact */}
        <div className="mt-10 card-pad bg-brand-50 border border-brand-200/50 rounded-sm text-center">
          <h3 className="font-semibold text-foreground mb-2">Need a Signed DPA?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enterprise customers can request a signed copy or negotiate custom terms.
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
