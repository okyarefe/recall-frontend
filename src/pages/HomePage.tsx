import { AuthCta } from '@/features/auth';
import {
  CtaBanner,
  Faq,
  FeatureGrid,
  Hero,
  HowItWorks,
  PricingPlans,
  SectionHeading,
} from '@/features/marketing';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Hero action={<AuthCta label="Get started" size="lg" />} />
      </section>

      <section id="how-it-works" className={styles.section}>
        <SectionHeading
          eyebrow="How it works"
          title="From document to exam in three steps"
        />
        <HowItWorks />
      </section>

      <section id="features" className={styles.section}>
        <SectionHeading
          eyebrow="Features"
          title="Built for studying your own material"
          description="Not generic trivia: every question comes from what you uploaded."
        />
        <FeatureGrid />
      </section>

      <section id="pricing" className={styles.section}>
        <SectionHeading
          eyebrow="Pricing"
          title="Placeholder pricing headline"
          description="Placeholder line about plans and pricing."
        />
        <PricingPlans />
      </section>

      <section id="faq" className={styles.section}>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Faq />
      </section>

      <section className={styles.section}>
        <CtaBanner action={<AuthCta label="Get started" size="lg" />} />
      </section>
    </div>
  );
}
