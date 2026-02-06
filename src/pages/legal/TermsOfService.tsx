import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Briefcase, AlertTriangle, Users, CreditCard, Shield, Wrench, Globe, Scale, Ban, Clock, Mail } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service" 
        description="Read the terms and conditions governing your use of Xyren's website and services. Understand our policies on intellectual property, liability, and service usage."
        canonical="/legal/terms-of-service"
        noIndex={false}
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        <article className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: February 6, 2026</p>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-card/50 border-border/50">
              <CardContent className="p-6 md:p-8">
                <p className="text-foreground/90 leading-relaxed">
                  These Terms of Service ("Terms") govern your access to and use of https://xyren.me (the "Site") 
                  and any products or services provided by Xyren ("Xyren," "we," "us," or "our").
                </p>
                <p className="text-muted-foreground mt-4">
                  By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, do not use the Site.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Services */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">1. Services</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90 mb-4">
                    Xyren provides productized website systems and related digital services designed to help 
                    service-based businesses capture and manage inbound leads.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    All services are provided according to the scope, timeline, and deliverables described at the time of purchase or engagement.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-muted-foreground mb-3">We reserve the right to:</p>
                    <ul className="space-y-1.5 text-foreground/90">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Refuse service</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Modify service offerings</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Discontinue features or services</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">at any time, with or without notice.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 2: No Guarantees */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">2. No Guarantees or Promises</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">You acknowledge and agree that:</p>
                  <ul className="space-y-3 text-foreground/90 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      We do not guarantee business results, revenue, leads, conversions, rankings, or performance outcomes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      Website performance depends on factors outside our control, including traffic quality, market conditions, pricing, offer strength, and client execution
                    </li>
                  </ul>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      All services are provided on an "as is" and "as available" basis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 3: Client Responsibilities */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">3. Client Responsibilities</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">You agree to:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Provide accurate and complete information when requested</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Respond in a timely manner to required inputs, approvals, or assets</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Use the delivered website and systems in compliance with applicable laws</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Delays caused by missing information or unresponsiveness may impact timelines and are not the responsibility of Xyren.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 4: Payments */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">4. Payments, Fees, and Refunds</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90 mb-4">All fees are disclosed prior to purchase.</p>
                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <p className="text-muted-foreground mb-3">Unless explicitly stated otherwise:</p>
                    <ul className="space-y-1.5 text-foreground/90">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Payments are due in advance</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Fees are non-refundable once work has started</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Failure to pay may result in suspension or termination of services</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Chargebacks, payment disputes, or abuse of payment systems may result in immediate termination.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 5: Intellectual Property */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">Our Property</h3>
                    <p className="text-foreground/90 mb-4">
                      All systems, templates, frameworks, copy structures, designs, processes, and proprietary methods 
                      used by Xyren remain the intellectual property of Xyren unless explicitly transferred in writing.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-muted-foreground mb-3">You may not:</p>
                      <ul className="grid grid-cols-2 gap-2 text-foreground/90">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Resell</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />License</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Reverse-engineer</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Repurpose</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">any Xyren systems or materials outside the intended use.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">Client Content</h3>
                    <p className="text-foreground/90">
                      You retain ownership of content you provide. You grant Xyren a limited license to use that 
                      content solely to deliver services.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Section 6: Acceptable Use */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Ban className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">6. Acceptable Use</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">You agree not to use the Site or services to:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Violate any laws or regulations</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Transmit malicious code or spam</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Attempt unauthorized access to systems or data</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Abuse, harass, or interfere with other users</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to suspend or terminate access for violations.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 7: Third-Party Tools */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">7. Third-Party Tools & Services</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90 mb-4">
                    Xyren may integrate or rely on third-party platforms (e.g., hosting, analytics, scheduling, AI tools).
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <p className="text-muted-foreground mb-3">We are not responsible for:</p>
                    <ul className="grid grid-cols-2 gap-2 text-foreground/90">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Downtime</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Changes</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Data handling</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Failures</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">caused by third-party services.</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your use of those tools may be subject to separate terms.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 8: Limitation of Liability */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">To the maximum extent permitted by law, Xyren shall not be liable for:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Indirect, incidental, or consequential damages</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Loss of revenue, profits, data, or business opportunities</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Service interruptions or errors</li>
                  </ul>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Our total liability for any claim shall not exceed the amount paid to Xyren for the specific service giving rise to the claim.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 9: Indemnification */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">9. Indemnification</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    You agree to indemnify and hold harmless Xyren, its owners, employees, and partners from any claims, damages, or expenses arising from:
                  </p>
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Your use of the Site or services</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Your content</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Your violation of these Terms</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 10: Termination */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">10. Termination</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">We may terminate or suspend access to the Site or services immediately if:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />You violate these Terms</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />You misuse the services</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Payment obligations are not met</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Termination does not entitle you to refunds unless explicitly stated otherwise.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 11: Governing Law */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">11. Governing Law</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90">
                    These Terms are governed by the laws of your applicable jurisdiction, without regard to conflict-of-law principles.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 12: Changes */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">12. Changes to These Terms</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90">
                    We may update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Contact Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Contact Us</h2>
              </div>
              
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 md:p-8">
                  <p className="text-muted-foreground mb-4">For questions about these Terms, contact:</p>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-foreground">Xyren</p>
                    <p className="text-foreground/90">
                      Email: <a href="mailto:herzen@herzenco.co" className="text-primary hover:underline">herzen@herzenco.co</a>
                    </p>
                    <p className="text-foreground/90">
                      Website: <a href="https://xyren.me" className="text-primary hover:underline">https://xyren.me</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
