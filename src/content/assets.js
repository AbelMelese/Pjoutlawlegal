/**
 * Images that ship with the site. Content stores them as "asset:<key>" so the
 * original optimized, cache-busted files keep being used until someone picks
 * a replacement from the media library (which stores a full https URL).
 */
import designSlide1 from '../assets/design_  slide1.png';
import designSlide2 from '../assets/design_  slide2.png';
import designSlide3 from '../assets/design_  slide3.png';
import designSlide4 from '../assets/design_  slide4.png';
import mediationHero from '../assets/Mediation page.png';
import divorceGenderEquality from '../assets/divorce-gender-equality.png';
import childMediation from '../assets/child mediation.png';
import businessMediation from '../assets/business mediation.jpg';
import officeShoot264 from '../assets/office-shoot-264.jpg';
import courtOrderedMediation from '../assets/court ordered mediation.jpg';
import practicePersonalInjury from '../assets/practice-areas/0300.png';
import practiceCorporateGovernance from '../assets/practice-areas/corporate-governance.webp';
import practiceEmploymentLabor from '../assets/practice-areas/employment-labor.webp';
import practiceConstruction from '../assets/practice-areas/construction.webp';
import aboutHero from '../assets/about the principal.png';
import principalPortrait from "../assets/use this picture in PJO's resume.jpg";
import mediaLogos from '../assets/media-logos-strip.png';
import contactHero from '../assets/Contact Us.png';
import logo from '../assets/pjoa-logo-transparent.png';

export const bundledAssets = {
  'design-slide-1': designSlide1,
  'design-slide-2': designSlide2,
  'design-slide-3': designSlide3,
  'design-slide-4': designSlide4,
  'mediation-hero': mediationHero,
  'divorce-gender-equality': divorceGenderEquality,
  'child-mediation': childMediation,
  'business-mediation': businessMediation,
  'office-shoot-264': officeShoot264,
  'court-ordered-mediation': courtOrderedMediation,
  'practice-personal-injury': practicePersonalInjury,
  'practice-corporate-governance': practiceCorporateGovernance,
  'practice-employment-labor': practiceEmploymentLabor,
  'practice-construction': practiceConstruction,
  'about-hero': aboutHero,
  'principal-portrait': principalPortrait,
  'media-logos': mediaLogos,
  'contact-hero': contactHero,
  logo,
};

const SAFE_URL = /^(https:\/\/|\/(?!\/))/i;

/** Resolve a stored image reference to something an <img src> can use. */
export function resolveImage(src) {
  if (!src) return '';
  if (src.startsWith('asset:')) return bundledAssets[src.slice(6)] ?? '';
  // Only https URLs and same-site paths; blocks javascript:, data:, http:.
  return SAFE_URL.test(src) ? src : '';
}
