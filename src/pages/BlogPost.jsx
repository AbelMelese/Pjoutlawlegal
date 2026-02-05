import { Link, useParams } from 'react-router-dom';
import {
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    User,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    BookOpen,
    Tag
} from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();

    // Sample blog posts data - in a real app, this would come from an API
    const blogPosts = [
        {
            id: 1,
            title: 'Understanding the Mediation Process: A Complete Guide',
            excerpt: 'Mediation offers a confidential, cost-effective alternative to litigation. Learn how the process works and what to expect during your first session.',
            category: 'Mediation',
            author: 'Phyllis J. Outlaw',
            authorRole: 'Principal Mediator',
            date: 'January 28, 2026',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            content: `
                <p class="lead">Mediation is a structured, interactive process where an impartial third party assists disputing parties in resolving conflict through the use of specialized communication and negotiation techniques.</p>
                
                <h2>What is Mediation?</h2>
                <p>Mediation is a voluntary process where a neutral third party, called a mediator, helps parties in conflict reach a mutually acceptable resolution. Unlike litigation, mediation allows parties to maintain control over the outcome while working collaboratively toward a solution.</p>
                
                <p>The mediator does not make decisions for the parties but rather facilitates communication and helps identify underlying interests and possible solutions. This approach often leads to more creative and satisfying outcomes than those imposed by a court.</p>
                
                <h2>Benefits of Mediation</h2>
                <ul>
                    <li><strong>Cost-Effective:</strong> Mediation typically costs significantly less than litigation.</li>
                    <li><strong>Confidential:</strong> Unlike court proceedings, mediation is private and confidential.</li>
                    <li><strong>Faster Resolution:</strong> Cases that might take months or years in court can often be resolved in days or weeks.</li>
                    <li><strong>Preserves Relationships:</strong> The collaborative nature of mediation can help maintain personal and business relationships.</li>
                    <li><strong>Greater Control:</strong> Parties maintain control over the outcome rather than having a decision imposed by a judge.</li>
                </ul>
                
                <h2>The Mediation Process</h2>
                <p>The mediation process typically follows these steps:</p>
                
                <h3>1. Initial Consultation</h3>
                <p>During the initial consultation, the mediator will explain the process, answer questions, and determine if mediation is appropriate for your situation. This is also an opportunity for you to assess whether the mediator is a good fit for your needs.</p>
                
                <h3>2. Agreement to Mediate</h3>
                <p>Once all parties agree to participate, they sign a mediation agreement that outlines the ground rules, confidentiality provisions, and the mediator's role.</p>
                
                <h3>3. Information Gathering</h3>
                <p>Each party has the opportunity to share their perspective on the dispute. The mediator listens actively and may ask clarifying questions to ensure a complete understanding of the issues.</p>
                
                <h3>4. Identifying Issues and Interests</h3>
                <p>The mediator helps parties move beyond their stated positions to identify underlying interests and concerns. This often reveals common ground that wasn't initially apparent.</p>
                
                <h3>5. Generating Options</h3>
                <p>With a clear understanding of each party's interests, the mediator facilitates brainstorming of possible solutions. All options are considered without judgment.</p>
                
                <h3>6. Negotiation and Agreement</h3>
                <p>Parties evaluate the options and negotiate terms. When an agreement is reached, it is documented in writing and signed by all parties.</p>
                
                <h2>Preparing for Your First Mediation Session</h2>
                <p>To make the most of your mediation session, consider the following preparation tips:</p>
                
                <ul>
                    <li>Gather all relevant documents and information</li>
                    <li>Identify your key interests and priorities</li>
                    <li>Consider what outcomes would be acceptable to you</li>
                    <li>Be prepared to listen to the other party's perspective</li>
                    <li>Come with an open mind and willingness to collaborate</li>
                </ul>
                
                <h2>Conclusion</h2>
                <p>Mediation offers a powerful alternative to traditional litigation. By understanding the process and preparing appropriately, you can maximize your chances of reaching a satisfactory resolution while preserving important relationships and avoiding the time and expense of court proceedings.</p>
                
                <p>If you're facing a dispute and considering mediation, we invite you to schedule a consultation with our experienced team. We're here to help you navigate conflict with clarity and dignity.</p>
            `
        },
        {
            id: 2,
            title: '5 Tips for a Peaceful Divorce: Putting Children First',
            excerpt: 'Divorce doesn\'t have to be a battlefield. Discover strategies to maintain peace and protect your children during this challenging transition.',
            category: 'Divorce',
            author: 'Phyllis J. Outlaw',
            authorRole: 'Principal Mediator',
            date: 'January 20, 2026',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            content: `
                <p class="lead">Divorce is never easy, but it doesn't have to be a war. With the right approach, you can protect your children and maintain your dignity throughout the process.</p>
                
                <h2>1. Keep Communication Civil</h2>
                <p>Even when emotions run high, it's crucial to maintain respectful communication with your spouse. This sets a positive example for your children and makes negotiations more productive.</p>
                
                <h2>2. Focus on Your Children's Needs</h2>
                <p>Remember that your children didn't choose this situation. Prioritize their emotional well-being above winning arguments or proving points.</p>
                
                <h2>3. Consider Mediation</h2>
                <p>Mediation provides a collaborative environment where both parties can work together to find solutions that benefit everyone, especially the children.</p>
                
                <h2>4. Avoid Using Children as Messengers</h2>
                <p>Never put your children in the middle of adult conflicts. Communicate directly with your spouse about schedules, finances, and other matters.</p>
                
                <h2>5. Seek Professional Support</h2>
                <p>A divorce coach or therapist can provide valuable guidance and emotional support during this challenging time.</p>
            `
        }
    ];

    const post = blogPosts.find(p => p.id === parseInt(id)) || blogPosts[0];
    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Image */}
            <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span>Back to Blog</span>
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-1.5 bg-[#c4a052] text-white rounded-full text-sm font-bold">
                                {post.category}
                            </span>
                            <span className="text-white/60 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Author Info */}
                    <div className="flex items-center justify-between pb-8 border-b border-slate-200 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center">
                                <User size={24} className="text-slate-500" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{post.author}</p>
                                <p className="text-slate-500 text-sm">{post.authorRole} • {post.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-sm hidden sm:block">Share:</span>
                            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                <Facebook size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-sky-100 hover:text-sky-500 transition-colors">
                                <Twitter size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                <Linkedin size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Article Body */}
                    <article
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-['Playfair_Display'] prose-headings:text-slate-900 prose-a:text-[#a88c3d] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-li:marker:text-[#c4a052]"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    <div className="flex items-center gap-3 mt-12 pt-8 border-t border-slate-200">
                        <Tag size={18} className="text-slate-400" />
                        <div className="flex flex-wrap gap-2">
                            {['Mediation', 'Conflict Resolution', 'Legal', 'Family'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 cursor-pointer transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 md:p-12 bg-slate-900 rounded-[2rem] text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display'] mb-4">
                            Ready to Resolve Your Dispute?
                        </h3>
                        <p className="text-slate-400 mb-8">
                            Schedule a free consultation with our experienced mediators today.
                        </p>
                        <Link
                            to="/contact"
                            className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-[#c4a052] text-white rounded-full font-bold hover:bg-[#c4a052]"
                        >
                            <span>Get Started</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 md:py-20 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-12 text-center">
                            Related Articles
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <article
                                    key={relatedPost.id}
                                    className="group bg-slate-50 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <span className="text-[#a88c3d] text-sm font-bold">{relatedPost.category}</span>
                                        <h3 className="text-lg font-bold text-slate-900 font-['Playfair_Display'] mt-2 mb-3 group-hover:text-[#a88c3d] transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <Link
                                            to={`/blog/${relatedPost.id}`}
                                            className="inline-flex items-center gap-1 text-slate-600 font-medium text-sm hover:text-[#a88c3d] transition-colors"
                                        >
                                            Read More
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPost;


