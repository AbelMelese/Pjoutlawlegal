import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Home from '../../pages/Home';
import MediationServices from '../../pages/MediationServices';
import PracticeAreas from '../../pages/PracticeAreas';
import AboutPhyllis from '../../pages/AboutPhyllis';
import Contact from '../../pages/Contact';
import LegalPage from '../../pages/LegalPage';
import { ContentPreviewProvider } from '../../content';
import { seoForPath } from '../../content/seo';

const PAGE_COMPONENTS = {
  home: Home,
  mediation: MediationServices,
  practiceAreas: PracticeAreas,
  about: AboutPhyllis,
  contact: Contact,
  privacy: () => <LegalPage contentKey="privacy" />,
  terms: () => <LegalPage contentKey="terms" />,
  settings: Contact, // business details are most visible on the Contact page + header/footer
};

/** Google-style result previews for the SEO settings. */
function SearchPreview({ seo }) {
  return (
    <div className="space-y-4 bg-white p-6">
      <p className="text-sm text-slate-500">How pages may appear in Google results. Google sometimes rewrites titles and descriptions.</p>
      {(seo.pages ?? []).map((page) => {
        const meta = seoForPath(seo, page.path);
        return (
          <div key={page.path} className="max-w-2xl">
            <p className="text-sm text-slate-600">{meta.canonical}</p>
            <p className="truncate text-xl text-[#1a0dab]">{meta.title}</p>
            <p className="line-clamp-2 text-sm text-slate-700">{meta.description}</p>
            {meta.noindex ? <p className="mt-1 text-xs font-semibold text-amber-700">Hidden from search engines</p> : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Renders the real public page with draft content. `inert` stops links and
 * buttons inside the preview from navigating away from the editor.
 */
export default function PagePreview({ areaKey, draft }) {
  if (areaKey === 'seo') return <SearchPreview seo={draft} />;
  const Page = PAGE_COMPONENTS[areaKey];
  if (!Page) return null;
  return (
    <ContentPreviewProvider overrides={{ [areaKey]: draft }}>
      <div inert className="pointer-events-none select-none bg-[#F5F3EF]" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Navbar />
        <div className="public-preview">
          <Page />
        </div>
        <Footer />
      </div>
    </ContentPreviewProvider>
  );
}
