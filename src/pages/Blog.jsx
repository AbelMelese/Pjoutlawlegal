import { Link } from 'react-router-dom';
import {
    Calendar,
    Clock,
    ArrowRight,
    User,
    Tag,
    Search,
    BookOpen,
    TrendingUp,
    Scale,
    Heart,
    Briefcase,
    MessageCircle,
    Users,
    Shield
} from 'lucide-react';
import { useState } from 'react';
import PageHero from '../components/PageHero';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image 2.jpg';
import booksImage from '../assets/books image.jpg';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All',
        'Mediation',
        'Divorce',
        'Family Law',
        'Business',
        'Coaching',
        'Legal Tips'
    ];

    const categoryStyles = {
        'Mediation': { icon: Scale, gradient: 'from-[#1E3A5F] to-[#5B2C6F]' },
        'Divorce': { icon: Heart, gradient: 'from-[#5B2C6F] to-[#5B2C6F]' },
        'Business': { icon: Briefcase, gradient: 'from-[#2A4F7A] to-[#1E3A5F]' },
        'Coaching': { icon: MessageCircle, gradient: 'from-[#2A4F7A] to-[#1E3A5F]' },
        'Family Law': { icon: Users, gradient: 'from-[#5B2C6F] to-[#5B2C6F]' },
        'Legal Tips': { icon: Shield, gradient: 'from-slate-600 to-slate-800' },
    };

    const blogPosts = [
        {
            id: 1,
            title: 'Understanding the Mediation Process: A Complete Guide',
            excerpt: 'Mediation offers a confidential, cost-effective alternative to litigation. Learn how the process works and what to expect during your first session.',
            category: 'Mediation',
            author: 'Phyllis J. Outlaw',
            date: 'January 28, 2026',
            readTime: '8 min read',
            featured: true
        },
        {
            id: 2,
            title: '5 Tips for a Peaceful Divorce: Putting Children First',
            excerpt: 'Divorce doesn\'t have to be a battlefield. Discover strategies to maintain peace and protect your children during this challenging transition.',
            category: 'Divorce',
            author: 'Phyllis J. Outlaw',
            date: 'January 20, 2026',
            readTime: '6 min read',
            featured: false
        },
        {
            id: 3,
            title: 'Business Disputes: When Mediation is the Right Choice',
            excerpt: 'Business conflicts can damage relationships and drain resources. Learn when mediation can save your partnership and protect your bottom line.',
            category: 'Business',
            author: 'Asa Smith',
            date: 'January 15, 2026',
            readTime: '7 min read',
            featured: false
        },
        {
            id: 4,
            title: 'The Role of a Divorce Coach: More Than Just Support',
            excerpt: 'A divorce coach provides strategic guidance, emotional support, and practical tools to help you navigate one of life\'s most challenging transitions.',
            category: 'Coaching',
            author: 'Phyllis J. Outlaw',
            date: 'January 10, 2026',
            readTime: '5 min read',
            featured: false
        },
        {
            id: 5,
            title: 'Child Custody Agreements: What Every Parent Should Know',
            excerpt: 'Creating a custody arrangement that works for everyone requires careful planning. Here\'s what you need to consider for your children\'s well-being.',
            category: 'Family Law',
            author: 'Phyllis J. Outlaw',
            date: 'January 5, 2026',
            readTime: '9 min read',
            featured: false
        },
        {
            id: 6,
            title: 'Preparing for Your First Mediation Session: A Checklist',
            excerpt: 'Proper preparation can make your mediation session more productive. Use this comprehensive checklist to ensure you\'re ready.',
            category: 'Mediation',
            author: 'Asa Smith',
            date: 'December 28, 2025',
            readTime: '4 min read',
            featured: false
        },
        {
            id: 7,
            title: 'How to Communicate Effectively During Family Disputes',
            excerpt: 'Communication breakdowns often escalate family conflicts. Learn techniques to express yourself clearly while maintaining respect.',
            category: 'Family Law',
            author: 'Phyllis J. Outlaw',
            date: 'December 20, 2025',
            readTime: '6 min read',
            featured: false
        },
        {
            id: 8,
            title: 'Legal Tips: Protecting Your Business Before Disputes Arise',
            excerpt: 'Prevention is better than cure. Implement these legal strategies to minimize the risk of costly business disputes.',
            category: 'Legal Tips',
            author: 'Asa Smith',
            date: 'December 15, 2025',
            readTime: '7 min read',
            featured: false
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    const heroSlides = [
        {
            title: "Our Blog",
            subtitle: "Expert insights on mediation, family law, divorce coaching, and business dispute resolution. Stay informed with the latest articles from our experienced team.",
            image: image1
        },
        {
            title: "Mediation Insights",
            subtitle: "Deep dives into how mediation works and why it's often the best path forward.",
            image: image2
        },
        {
            title: "Legal & Coaching Advice",
            subtitle: "Strategic guidance for life's transitions and business challenges.",
            image: booksImage
        }
    ];

    return (
        <div className="overflow-hidden bg-[#f8fafc]">
            {/* Hero Section */}
            <PageHero slides={heroSlides} noSlide>
                <div className="max-w-xl pt-4">
                    <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] shadow-xl"
                        />
                    </div>
                </div>
            </PageHero>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-slate-100 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-slate-900 text-white shadow-lg'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {selectedCategory === 'All' && !searchTerm && featuredPost && (
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 mb-8">
                            <TrendingUp size={20} className="text-[#1E3A5F]" />
                            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Featured Article</span>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                    {(() => {
                                        const style = categoryStyles[featuredPost.category];
                                        const Icon = style?.icon || BookOpen;
                                        return (
                                            <div className={`w-full h-[400px] bg-gradient-to-br ${style?.gradient || 'from-slate-600 to-slate-800'} flex flex-col items-center justify-center gap-6`}>
                                                <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                    <Icon size={56} className="text-white drop-shadow-lg" />
                                                </div>
                                                <p className="text-white/80 text-lg font-['Playfair_Display'] font-bold tracking-wide">{featuredPost.category}</p>
                                                <div className="flex gap-2">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="px-4 py-1.5 bg-[#1E3A5F]/20 text-[#5B2C6F] rounded-full text-sm font-bold">
                                        {featuredPost.category}
                                    </span>
                                    <span className="text-slate-400 text-sm flex items-center gap-1">
                                        <Clock size={14} />
                                        {featuredPost.readTime}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] leading-tight">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                            <User size={18} className="text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{featuredPost.author}</p>
                                            <p className="text-slate-400 text-xs">{featuredPost.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/blog/${featuredPost.id}`}
                                    className="btn-premium inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] text-white rounded-full font-bold text-lg shadow-xl"
                                >
                                    <span>Read Article</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="py-16 md:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display']">
                            {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
                        </h2>
                        <span className="text-slate-500 text-sm">
                            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
                            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(selectedCategory === 'All' && !searchTerm ? regularPosts : filteredPosts).map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        {(() => {
                                            const style = categoryStyles[post.category];
                                            const Icon = style?.icon || BookOpen;
                                            return (
                                                <div className={`w-full h-full bg-gradient-to-br ${style?.gradient || 'from-slate-600 to-slate-800'} flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-transform duration-700`}>
                                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                                        <Icon size={40} className="text-white drop-shadow-lg" />
                                                    </div>
                                                    <p className="text-white/70 text-sm font-bold tracking-wider uppercase">{post.category}</p>
                                                </div>
                                            );
                                        })()}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-bold">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-3 group-hover:text-[#5B2C6F] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                                    <User size={14} className="text-slate-500" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">{post.author}</span>
                                            </div>

                                            <Link
                                                to={`/blog/${post.id}`}
                                                className="flex items-center gap-1 text-[#5B2C6F] font-bold text-sm group-hover:gap-2 transition-all"
                                            >
                                                Read More
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {filteredPosts.length > 6 && (
                        <div className="text-center mt-12">
                            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all">
                                Load More Articles
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="blob bg-[#1E3A5F]/10 w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                        Stay <span className="text-[#1E3A5F]">Informed</span>
                    </h2>
                    <p className="text-xl text-slate-600 mb-10">
                        Subscribe to our newsletter for the latest insights on mediation, family law, and conflict resolution.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] shadow-sm"
                        />
                        <button className="btn-premium px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] text-white rounded-full font-bold shadow-xl">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;


