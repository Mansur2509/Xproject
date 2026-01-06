import { Hero } from '@widgets/hero';
import { AboutSection } from '@widgets/about-section';
import { ServicesSection } from '@widgets/services-section';
import { EventsPreview } from '@widgets/events-preview';
import { TeamPreview } from '@widgets/team-preview';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <EventsPreview />
      <TeamPreview />
    </>
  );
};
