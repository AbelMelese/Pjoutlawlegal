import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { blogPosts } from '../data/siteContent';
import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';

const categories = ['All', 'Mediation', 'Family Law', 'Business', 'Coaching'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const visiblePosts =
    selectedCategory === 'All' && !searchTerm.trim() && featuredPost
      ? filteredPosts.filter((post) => post.id !== featuredPost.id)
      : filteredPosts;

  return (
    <div>
      <PageHero
        eyebrow="Insights and resources"
        title="Useful articles for difficult decisions."
        description="The blog now has a cleaner filter/search flow, stronger card hierarchy, and article previews that stay readable across devices."
        slides={[
          { title: 'Books', image: booksImage },
          { title: 'Office', image: officeImage },
          { title: 'City', image: cityImage },
        ]}
      >
        <div className="surface-panel rounded-[1.4rem] p-3 sm:p-4 mt-2">
          <label className="sr-only" htmlFor="search-posts">
            Search articles
          </label>
          <div className="flex items-center gap-3 text-slate-800">
            <Search size={18} />
            <input
              id="search-posts"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search articles"
              className="w-full bg-transparent outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </PageHero>

      <section className="page-section page-section--compact">
        <div className="section-shell">
          <div className="filters-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`tag-pill ${selectedCategory === category ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="page-section">
          <div className="section-shell split-layout">
            <div className="media-frame">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <div className="media-overlay">
                <p className="eyebrow">Featured article</p>
                <h3 className="text-3xl">{featuredPost.title}</h3>
              </div>
            </div>

            <div className="content-card">
              <p className="eyebrow">{featuredPost.category}</p>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <div className="article-meta">
                <span>{featuredPost.author}</span>
                <span>{featuredPost.date}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <Link to={`/blog/${featuredPost.id}`} className="primary-button">
                <span>Read article</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section soft-band">
        <div className="section-shell">
          <SectionHeading
            eyebrow="All articles"
            title={`Browse ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'}.`}
            align="center"
          />

          <div className="article-grid mt-10">
            {visiblePosts.length ? (
              visiblePosts.map((post) => (
                <article key={post.id} className="article-card">
                  <div className="article-card-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="article-card-body">
                    <div className="article-meta">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="primary-button">
                      <span>Read article</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <article className="content-card">
                <h3>No articles matched your search.</h3>
                <p>Try a different keyword or switch back to all categories.</p>
              </article>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
