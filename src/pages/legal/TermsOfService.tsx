import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";

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
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <h1>Terms of Service</h1>
            <p className="text-muted-foreground"><strong>Last updated:</strong> February 6, 2026</p>

            <p>
              These Terms govern your access to and use of https://xyren.me and any services provided by Xyren.
            </p>

            <hr />

            <h2>1. Use of the Site</h2>
            <p>
              You agree to use the Site only for lawful purposes and in accordance with these Terms. You may not:
            </p>
            <ul>
              <li>Attempt to interfere with site functionality</li>
              <li>Access data not intended for you</li>
              <li>Use the Site for abusive, fraudulent, or unlawful activity</li>
            </ul>

            <hr />

            <h2>2. Services</h2>
            <p>
              Xyren provides productized websites and related digital services. All services are provided 
              "as is" and subject to availability, scope, and stated deliverables.
            </p>
            <p>We reserve the right to modify or discontinue services at any time.</p>

            <hr />

            <h2>3. No Guarantees</h2>
            <p>We do not guarantee:</p>
            <ul>
              <li>Business results</li>
              <li>Revenue outcomes</li>
              <li>Conversion rates</li>
              <li>Search engine rankings</li>
            </ul>
            <p>Results depend on many external factors outside our control.</p>

            <hr />

            <h2>4. Intellectual Property</h2>
            <p>
              All content, designs, systems, and materials on the Site are owned by Xyren or licensed to us. 
              You may not copy, resell, or reuse materials without written permission.
            </p>

            <hr />

            <h2>5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Xyren shall not be liable for:</p>
            <ul>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Errors, interruptions, or delays</li>
            </ul>

            <hr />

            <h2>6. Indemnification</h2>
            <p>
              You agree to indemnify and hold Xyren harmless from claims arising out of your use of the 
              Site or violation of these Terms.
            </p>

            <hr />

            <h2>7. Governing Law</h2>
            <p>
              These Terms are governed by the laws of your applicable jurisdiction, without regard to 
              conflict-of-law principles.
            </p>

            <hr />

            <h2>8. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the Site constitutes acceptance of 
              the updated Terms.
            </p>

            <hr />

            <h2>Contact Us</h2>
            <p>For questions about these Terms, contact:</p>
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

export default TermsOfService;
