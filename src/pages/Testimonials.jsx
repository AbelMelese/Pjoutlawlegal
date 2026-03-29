import PageHero from '../components/PageHero';
import officeImage from '../assets/image 2.jpg';

const testimonials = [
  {
    quote:
      "I am very pleased and satisfied with the firm's work. They keep me fully informed both in person and with a written copy of all details. The attorneys have been competent, thorough and timely in their legal work.",
    author: 'Terrance Howell',
    role: 'Prince Georges County, Maryland',
  },
  {
    quote:
      'Phyllis J. Outlaw & Associates are highly skilled in their approach to personnel matters. The attorneys are very professional and courteous with their clients and treat them with the utmost respect.',
    author: 'Quinsola N. McCray',
    role: 'Washington, D.C.',
  },
  {
    quote:
      'Phyllis J. Outlaw & Associates provides exceptional legal services and always represents our best interest. The attorneys are accessible and highly responsive to our requests.',
    author: 'Dr. Mary Quinn',
    role: 'Council of Women Ministers & Male Support Division, Inc.',
  },
  {
    quote:
      "Phyllis J. Outlaw and Associates' managerial-employee training programs are highly effective and would be an asset to any organization.",
    author: 'Ann Brown',
    role: 'Mary Kay Cosmetics, Charlotte, North Carolina',
  },
];

const Testimonials = () => {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <PageHero
        slides={[
          {
            title: 'Testimonials',
            subtitle:
              'Comments from clients and organizations served by Phyllis J. Outlaw & Associates.',
            image: officeImage,
          },
        ]}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
              Client Comments
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 shadow-sm"
              >
                <p className="text-xl md:text-2xl font-['Playfair_Display'] text-slate-800 leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.author}</h3>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-600">
                  {item.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
