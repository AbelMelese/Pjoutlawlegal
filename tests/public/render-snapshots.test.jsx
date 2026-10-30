// @vitest-environment node
/**
 * Locks the rendered HTML of every public page, plus the shared header and
 * footer. The CMS refactor must leave the default (unedited) content
 * rendering exactly as the original hard-coded pages did, so any change
 * here is a visible change on the live site and needs a deliberate review.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import Home from '../../src/pages/Home';
import MediationServices from '../../src/pages/MediationServices';
import PracticeAreas from '../../src/pages/PracticeAreas';
import AboutPhyllis from '../../src/pages/AboutPhyllis';
import OnlinePayment from '../../src/pages/OnlinePayment';
import Contact from '../../src/pages/Contact';
import LegalPage from '../../src/pages/LegalPage';

const routes = [
  ['/', Home],
  ['/mediation-services', MediationServices],
  ['/practice-areas', PracticeAreas],
  ['/about-phyllis-j-outlaw', AboutPhyllis],
  ['/online-payment', OnlinePayment],
  ['/contact', Contact],
  ['/privacy-policy', () => <LegalPage contentKey="privacy" />],
  ['/terms-of-use', () => <LegalPage contentKey="terms" />],
];

const render = (path, element) =>
  renderToStaticMarkup(<MemoryRouter initialEntries={[path]}>{element}</MemoryRouter>);

describe('public site renders unchanged', () => {
  it.each(routes)('page %s', (path, Page) => {
    expect(render(path, <Page />)).toMatchSnapshot();
  });

  it('header', () => {
    expect(render('/', <Navbar />)).toMatchSnapshot();
  });

  it('footer', () => {
    expect(render('/', <Footer />)).toMatchSnapshot();
  });
});
