import {
  AreasMarquee,
  BrandStrip,
  ClosingCta,
  Hero,
  PriceBuilder,
  ReviewsMarquee,
  ServiceList,
  WhatIsDryFitting,
  WhyCards,
} from "@/components/sections";
import { home } from "@/content/home";

export default function HomePage() {
  const { marquee } = home;

  return (
    <>
      <Hero {...home.hero} />
      <BrandStrip
        {...home.brandStrip}
        pauseLabel={marquee.pause}
        playLabel={marquee.play}
      />
      <PriceBuilder {...home.priceBuilder} />
      <WhyCards {...home.why} />
      <ServiceList {...home.services} />
      <WhatIsDryFitting {...home.whatIs} />
      <ReviewsMarquee
        {...home.reviews}
        pauseLabel={marquee.pause}
        playLabel={marquee.play}
      />
      <AreasMarquee
        {...home.areas}
        pauseLabel={marquee.pause}
        playLabel={marquee.play}
      />
      <ClosingCta {...home.closing} />
    </>
  );
}
