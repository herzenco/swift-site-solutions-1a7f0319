import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Database, BarChart3, MessageSquare, Globe, Lock, Users, FileText, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy" 
        description="Learn how Xyren collects, uses, and protects your data. Our privacy policy covers lead information, analytics, chat interactions, and your rights under GDPR and CCPA."
        canonical="/legal/privacy-policy"
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
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: February 6, 2026</p>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-card/50 border-border/50">
              <CardContent className="p-6 md:p-8">
                <p className="text-foreground/90 leading-relaxed">
                  Xyren ("Xyren," "we," "us," or "our") operates the website https://xyren.me (the "Site"). 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard information from 
                  visitors and users of our Site and services.
                </p>
                <p className="text-muted-foreground mt-4">
                  If you do not agree with this policy, do not use the Site.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">We collect information in the following ways:</p>

              <div className="space-y-6">
                {/* A. Voluntarily Provided */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">A. Information You Voluntarily Provide</h3>
                    <p className="text-muted-foreground mb-4">When you submit forms or interact with our services, we may collect:</p>
                    
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-foreground mb-3">Lead & Contact Information</h4>
                      <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Full name</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Email address</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Phone number (optional)</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Business website URL (optional)</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Industry or business type (optional)</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Questionnaire responses</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Source page (automatically recorded)</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">This information is used to respond to inquiries, qualify leads, and provide our services.</p>
                  </CardContent>
                </Card>

                {/* B. Automatically Collected */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">B. Automatically Collected Usage & Analytics Data</h3>
                    <p className="text-muted-foreground mb-4">When you visit the Site, we automatically collect certain technical and behavioral data:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          Session & Page Analytics
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Anonymous session identifiers</li>
                          <li>• Pages visited and page paths</li>
                          <li>• Time spent on pages</li>
                          <li>• Scroll depth percentages</li>
                          <li>• Referrer URLs</li>
                          <li>• Geographic location (country, city)</li>
                          <li>• Browser, OS, and device type</li>
                          <li>• Screen and viewport dimensions</li>
                          <li>• UTM campaign parameters</li>
                        </ul>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          Behavioral Events
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Button and CTA clicks</li>
                          <li>• Form interactions (start, submit, errors)</li>
                          <li>• Scroll milestones (25%, 50%, 75%, 100%)</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">This data is aggregated and used to analyze performance, improve usability, and optimize conversions.</p>
                  </CardContent>
                </Card>

                {/* C. Chat Interactions */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">C. Chat Interactions</h3>
                    <p className="text-muted-foreground mb-4">If you interact with our AI-powered chat features, we may collect:</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <ul className="space-y-1.5 text-muted-foreground">
                        <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" />Messages exchanged during the conversation</li>
                        <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" />URLs or content submitted for analysis</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Chat data is used to provide responses, improve service quality, and troubleshoot issues.</p>
                  </CardContent>
                </Card>

                {/* D. Third-Party Analytics */}
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">D. Third-Party Analytics</h3>
                    <p className="text-muted-foreground mb-4">We use Vercel Analytics, which collects:</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <ul className="space-y-1.5 text-muted-foreground">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Page views</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Unique visitors</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Core Web Vitals and performance metrics</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">These analytics are used solely to understand site performance and improve user experience.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Section 2: How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">We use collected information to:</p>
                  <ul className="grid md:grid-cols-2 gap-3 text-foreground/90 mb-6">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Respond to inquiries and communicate with you</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Provide and improve our services</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Analyze site usage and performance</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Track marketing and campaign effectiveness</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Maintain security and prevent abuse</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />Comply with legal obligations</li>
                  </ul>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="font-medium text-primary">We do not sell personal data.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 3: Legal Bases (GDPR) */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">3. Legal Bases for Processing (GDPR)</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">If you are located in the European Economic Area (EEA), we process personal data under the following legal bases:</p>
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Your consent</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Performance of a contract or pre-contractual steps</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Legitimate business interests (analytics, security, optimization)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Compliance with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 4: Data Sharing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">4. Data Sharing & Disclosure</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">We may share data:</p>
                  <ul className="space-y-2 text-foreground/90 mb-6">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />With service providers and infrastructure partners (e.g., hosting, analytics) strictly for operational purposes</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />If required by law, regulation, or legal process</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />To protect our rights, property, or safety</li>
                  </ul>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="font-medium text-primary">We do not share personal data for advertising resale or data brokerage.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 5: Data Retention */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">5. Data Retention</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">We retain personal data only for as long as necessary to:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Fulfill the purposes described in this policy</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Meet legal, accounting, or reporting requirements</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">Analytics data may be retained in aggregated or anonymized form.</p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 6: Your Rights */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">GDPR Rights (EEA & UK Users)</h3>
                    <p className="text-muted-foreground mb-4">You have the right to:</p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Access your personal data</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Correct inaccurate data</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Request deletion</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Restrict or object to processing</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Request data portability</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Withdraw consent at any time</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/30 border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">CCPA Rights (California Residents)</h3>
                    <p className="text-muted-foreground mb-4">You have the right to:</p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Know what personal data is collected</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Request deletion of personal data</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Opt out of the sale of personal data</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Not be discriminated against</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/30 border-border/50 mt-6">
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Requests can be made by contacting us at:{" "}
                    <a href="mailto:herzen@herzenco.co" className="text-primary hover:underline">herzen@herzenco.co</a>
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 7: Cookies */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">7. Cookies & Tracking Technologies</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">We use cookies and similar technologies for:</p>
                  <ul className="space-y-2 text-foreground/90 mb-4">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Session tracking</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Analytics and performance monitoring</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Campaign attribution</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">You may control cookies through your browser settings. Disabling cookies may affect functionality.</p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 8: Security */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">8. Data Security</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90">
                    We implement reasonable administrative, technical, and organizational safeguards to protect personal data. 
                    However, no system is 100% secure.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 9: Children's Privacy */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">9. Children's Privacy</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90">
                    Our services are not intended for individuals under 18. We do not knowingly collect data from children.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 10: Changes */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">10. Changes to This Policy</h2>
              </div>
              
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground/90">
                    We may update this Privacy Policy from time to time. Updates will be posted on this page with a 
                    revised "Last updated" date.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Section 11: Contact */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">11. Contact Us</h2>
              </div>
              
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 md:p-8">
                  <p className="text-muted-foreground mb-4">For questions or privacy requests, contact:</p>
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

export default PrivacyPolicy;
