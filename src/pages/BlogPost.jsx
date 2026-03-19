import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/siteContent';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((entry) => entry.id === id) || blogPosts[0];
  const relatedPosts = blogPosts.filter((entry) => entry.id !== post.id).slice(0, 3);

  return (
    <div>
      <section className="page-section">
        <div className="section-shell split-layout">
          <div>
            <Link to="/blog" className="tag-pill">
              <ArrowLeft size={16} className="mr-2" />
              Back to insights
            </Link>

            <div className="section-heading section-heading-left mt-8">
              <p className="eyebrow">{post.category}</p>
              <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] max-w-[12ch]">
                {post.title}
              </h1>
              <p className="section-description">{post.excerpt}</p>
            </div>

            <div className="article-meta mt-6">
              <span>{post.author}</span>
              <span>{post.authorRole}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="media-frame">
            <img src={post.image} alt={post.title} />
            <div className="media-overlay">
              <p className="eyebrow">Featured insight</p>
              <h3 className="text-3xl">{post.title}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell">
          <div className="content-card article-content">
            <p>{post.intro}</p>
            {post.sections.map((section) => (
              <div key={section.heading} className="article-content">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <div className="filters-row">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-shell">
          <div className="cta-panel">
            <p className="eyebrow">Need direct support?</p>
            <h2>Talk through your situation with someone who does this work every day.</h2>
            <div className="hero-actions">
              <Link to="/contact" className="primary-button">
                <span>Request consultation</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section soft-band">
        <div className="section-shell">
          <div className="section-heading section-heading-center">
            <p className="eyebrow">Related reading</p>
            <h2>More articles</h2>
          </div>

          <div className="article-grid mt-10">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="article-card">
                <div className="article-card-image">
                  <img src={relatedPost.image} alt={relatedPost.title} />
                </div>
                <div className="article-card-body">
                  <div className="article-meta">
                    <span>{relatedPost.category}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                  <h3>{relatedPost.title}</h3>
                  <p>{relatedPost.excerpt}</p>
                  <Link to={`/blog/${relatedPost.id}`} className="primary-button">
                    <span>Read article</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
