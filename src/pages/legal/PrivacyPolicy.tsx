import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";

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
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground"><strong>Last updated:</strong> February 6, 2026</p>

            <p>
              Xyren ("Xyren," "we," "us," or "our") operates the website https://xyren.me (the "Site"). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard information from 
              visitors and users of our Site and services.
            </p>
            <p>If you do not agree with this policy, do not use the Site.</p>

            <hr />

            <h2>1. Information We Collect</h2>
            <p>We collect information in the following ways:</p>

            <h3>A. Information You Voluntarily Provide</h3>
            <p>When you submit forms or interact with our services, we may collect:</p>
            
            <h4>Lead & Contact Information</h4>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Business website URL (optional)</li>
              <li>Industry or business type (optional)</li>
              <li>Questionnaire responses (goals, challenges, timelines, or similar)</li>
              <li>Source page or form where the submission occurred (automatically recorded)</li>
            </ul>
            <p>This information is used to respond to inquiries, qualify leads, and provide our services.</p>

            <h3>B. Automatically Collected Usage & Analytics Data</h3>
            <p>When you visit the Site, we automatically collect certain technical and behavioral data, including:</p>
            
            <h4>Session & Page Analytics</h4>
            <ul>
              <li>Anonymous session identifiers</li>
              <li>Pages visited and page paths</li>
              <li>Time spent on pages</li>
              <li>Scroll depth percentages</li>
              <li>Referrer URLs</li>
              <li>Approximate geographic location (country and city)</li>
              <li>Browser type, operating system, and device type</li>
              <li>Screen and viewport dimensions</li>
              <li>Campaign tracking parameters (UTM tags)</li>
            </ul>

            <h4>Behavioral Events</h4>
            <ul>
              <li>Button and call-to-action clicks</li>
              <li>Form interactions (start, submit, errors)</li>
              <li>Scroll milestones (25%, 50%, 75%, 100%)</li>
            </ul>
            <p>This data is aggregated and used to analyze performance, improve usability, and optimize conversions.</p>

            <h3>C. Chat Interactions</h3>
            <p>If you interact with our AI-powered chat features, we may collect:</p>
            <ul>
              <li>Messages exchanged during the conversation</li>
              <li>URLs or content submitted for analysis</li>
            </ul>
            <p>Chat data is used to provide responses, improve service quality, and troubleshoot issues.</p>

            <h3>D. Third-Party Analytics</h3>
            <p>We use Vercel Analytics, which collects:</p>
            <ul>
              <li>Page views</li>
              <li>Unique visitors</li>
              <li>Core Web Vitals and performance metrics</li>
            </ul>
            <p>These analytics are used solely to understand site performance and improve user experience.</p>

            <hr />

            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to inquiries and communicate with you</li>
              <li>Provide and improve our services</li>
              <li>Analyze site usage and performance</li>
              <li>Track marketing and campaign effectiveness</li>
              <li>Maintain security and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p><strong>We do not sell personal data.</strong></p>

            <hr />

            <h2>3. Legal Bases for Processing (GDPR)</h2>
            <p>If you are located in the European Economic Area (EEA), we process personal data under the following legal bases:</p>
            <ul>
              <li>Your consent</li>
              <li>Performance of a contract or pre-contractual steps</li>
              <li>Legitimate business interests (analytics, security, optimization)</li>
              <li>Compliance with legal obligations</li>
            </ul>

            <hr />

            <h2>4. Data Sharing & Disclosure</h2>
            <p>We may share data:</p>
            <ul>
              <li>With service providers and infrastructure partners (e.g., hosting, analytics) strictly for operational purposes</li>
              <li>If required by law, regulation, or legal process</li>
              <li>To protect our rights, property, or safety</li>
            </ul>
            <p><strong>We do not share personal data for advertising resale or data brokerage.</strong></p>

            <hr />

            <h2>5. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to:</p>
            <ul>
              <li>Fulfill the purposes described in this policy</li>
              <li>Meet legal, accounting, or reporting requirements</li>
            </ul>
            <p>Analytics data may be retained in aggregated or anonymized form.</p>

            <hr />

            <h2>6. Your Rights</h2>

            <h3>GDPR Rights (EEA & UK Users)</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h3>CCPA Rights (California Residents)</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Know what personal data is collected</li>
              <li>Request deletion of personal data</li>
              <li>Opt out of the sale of personal data (we do not sell data)</li>
              <li>Not be discriminated against for exercising your rights</li>
            </ul>
            <p>
              Requests can be made by contacting us at:<br />
              Email: <a href="mailto:herzen@herzenco.co">herzen@herzenco.co</a>
            </p>

            <hr />

            <h2>7. Cookies & Tracking Technologies</h2>
            <p>We use cookies and similar technologies for:</p>
            <ul>
              <li>Session tracking</li>
              <li>Analytics and performance monitoring</li>
              <li>Campaign attribution</li>
            </ul>
            <p>You may control cookies through your browser settings. Disabling cookies may affect functionality.</p>

            <hr />

            <h2>8. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational safeguards to protect personal data. 
              However, no system is 100% secure.
            </p>

            <hr />

            <h2>9. Children's Privacy</h2>
            <p>Our services are not intended for individuals under 18. We do not knowingly collect data from children.</p>

            <hr />

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a 
              revised "Last updated" date.
            </p>

            <hr />

            <h2>11. Contact Us</h2>
            <p>For questions or privacy requests, contact:</p>
            <p>
              <strong>Xyren</strong><br />
              Email: <a href="mailto:herzen@herzenco.co">herzen@herzenco.co</a><br />
              Website: <a href="https://xyren.me">https://xyren.me</a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
