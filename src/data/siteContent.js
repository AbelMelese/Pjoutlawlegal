import booksImage from '../assets/books image.jpg';
import cityImage from '../assets/image 2.jpg';
import officeImage from '../assets/image1.jpg';
import coachingImage from "../assets/use this image in coaching page.jpg";
import seminarImage from "../assets/use this image in seminars and training.jpg";
import portraitImage from "../assets/use this picture in PJO's resume.jpg";

export const contactDetails = {
  phone: '(202) 548-2999',
  phoneHref: 'tel:+12025482999',
  fax: '(202) 548-8114',
  faxHref: 'tel:+12025488114',
  email: 'lawfirm@pjoutlawlegal.com',
  emailHref: 'mailto:lawfirm@pjoutlawlegal.com',
  addressLines: ['412 H Street, NE', 'Washington, DC 20002'],
  officeHours: 'Monday through Friday, 9:00 AM to 5:00 PM ET',
  serviceArea: 'Serving clients in Washington, DC and Maryland',
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Mediation', to: '/mediation-services' },
  { label: 'Family Law', to: '/divorce-family-law' },
  { label: 'Coaching', to: '/coaching' },
  { label: 'Business', to: '/business-services' },
  { label: 'Insights', to: '/blog' },
  { label: 'Our Team', to: '/meet-attorneys' },
  { label: 'Contact', to: '/contact' },
];

export const mediaAppearances = [
  {
    title: "CNN's Burden of Proof",
    type: 'Television appearance',
    summary: 'Commentary on dispute resolution and legal strategy for public audiences.',
  },
  {
    title: "WHUT's Evening Exchange",
    type: 'Public affairs program',
    summary: 'Conversations on conflict, community, and practical legal education.',
  },
  {
    title: "BET's Business Report",
    type: 'Business segment',
    summary: 'Insights on leadership pressure, workplace disputes, and long-term planning.',
  },
  {
    title: 'C-SPAN and local radio interviews',
    type: 'Media coverage',
    summary: 'Trusted perspective on mediation, advocacy, and civic problem-solving.',
  },
];

export const footerServiceLinks = [
  { label: 'Divorce mediation', to: '/mediation-services' },
  { label: 'Family law counsel', to: '/divorce-family-law' },
  { label: 'Coaching sessions', to: '/coaching' },
  { label: 'Business advising', to: '/business-services' },
];

export const testimonials = [
  {
    quote:
      'Phyllis helped us move from defensiveness to decisions. We left with a workable parenting plan and far less anxiety.',
    author: 'Former mediation client',
  },
  {
    quote:
      'The coaching process gave me structure and calm in the middle of a difficult transition. It was strategic, not generic.',
    author: 'Former coaching client',
  },
  {
    quote:
      'Their business advising sharpened our leadership communication and helped us resolve issues before they became litigation.',
    author: 'Small business client',
  },
];

export const blogPosts = [
  {
    id: 'understanding-the-mediation-process',
    category: 'Mediation',
    title: 'Understanding the Mediation Process',
    excerpt:
      'A practical overview of what mediation is, how the process unfolds, and how to prepare for a productive first session.',
    author: 'Phyllis J. Outlaw',
    authorRole: 'Principal Mediator',
    date: 'January 28, 2026',
    readTime: '8 min read',
    featured: true,
    image: booksImage,
    tags: ['Mediation', 'Preparation', 'Conflict Resolution'],
    intro:
      'Mediation gives people room to resolve conflict privately and constructively while keeping control over the outcome.',
    sections: [
      {
        heading: 'What mediation does well',
        paragraphs: [
          'Unlike litigation, mediation is designed to reduce escalation. The mediator facilitates structure, keeps the conversation productive, and helps each party identify priorities that can support resolution.',
          'That process often saves time, lowers cost, and protects relationships that still matter after the dispute is over.',
        ],
        bullets: [
          'Confidential conversations instead of public court filings',
          'Flexible scheduling and agenda setting',
          'More control over the final agreement',
          'A process that can preserve co-parenting and business relationships',
        ],
      },
      {
        heading: 'A typical mediation sequence',
        paragraphs: [
          'Most matters begin with an intake conversation, followed by document review, scheduling, and one or more sessions focused on the actual points of disagreement.',
          'When the parties reach alignment, the terms are documented clearly so they can be reviewed and formalized if needed.',
        ],
        bullets: [
          'Initial consultation',
          'Document and issue review',
          'Joint or separate working sessions',
          'Draft summary or agreement',
        ],
      },
      {
        heading: 'How to prepare',
        paragraphs: [
          'Preparation matters. Gather key records, define your priorities, and think about where you have room to be flexible before the first session begins.',
        ],
      },
    ],
  },
  {
    id: 'peaceful-divorce-children-first',
    category: 'Family Law',
    title: 'Keeping Children First During Divorce',
    excerpt:
      'Five ways to reduce avoidable harm and make decisions that support long-term stability for children.',
    author: 'Phyllis J. Outlaw',
    authorRole: 'Attorney and Mediator',
    date: 'January 20, 2026',
    readTime: '6 min read',
    featured: false,
    image: officeImage,
    tags: ['Divorce', 'Children', 'Parenting Plans'],
    intro:
      'Children experience divorce through routine changes, emotional tension, and uncertainty. Better planning reduces that damage.',
    sections: [
      {
        heading: 'Reduce conflict around the child',
        paragraphs: [
          'Children should not carry messages, hear legal strategy, or feel responsible for easing tension between adults.',
          'The healthiest plans focus on predictability, respectful communication, and realistic schedules.',
        ],
        bullets: [
          'Keep direct conflict away from children',
          'Use a clear co-parenting calendar',
          'Avoid last-minute changes when possible',
        ],
      },
      {
        heading: 'Build a durable parenting plan',
        paragraphs: [
          'A strong parenting plan addresses school routines, holidays, transportation, communication, and decision-making authority before problems arise.',
        ],
      },
    ],
  },
  {
    id: 'business-disputes-before-litigation',
    category: 'Business',
    title: 'Business Disputes Before They Become Litigation',
    excerpt:
      'Where early intervention, neutral facilitation, and stronger communication systems can save time and money.',
    author: 'Asa Smith',
    authorRole: 'Business Advisor',
    date: 'January 15, 2026',
    readTime: '7 min read',
    featured: false,
    image: cityImage,
    tags: ['Business', 'Leadership', 'Mediation'],
    intro:
      'Most business conflicts do not start with a lawsuit. They start with ambiguity, friction, and decisions that stay unresolved for too long.',
    sections: [
      {
        heading: 'Why conflicts grow',
        paragraphs: [
          'Leadership teams often postpone difficult conversations while teams continue operating with mixed expectations. That delay increases frustration and raises the cost of resolution.',
        ],
        bullets: [
          'Undefined roles or authority',
          'Contract interpretation gaps',
          'Communication breakdowns across teams',
          'Emotional residue from prior disputes',
        ],
      },
      {
        heading: 'A better intervention point',
        paragraphs: [
          'Mediation and advising are most effective when the parties still want the relationship to work and are willing to test structured solutions.',
        ],
      },
    ],
  },
  {
    id: 'the-role-of-a-divorce-coach',
    category: 'Coaching',
    title: 'What a Divorce Coach Actually Helps With',
    excerpt:
      'Divorce coaching is not therapy and not legal representation. It is structured guidance for decisions, preparation, and communication.',
    author: 'Phyllis J. Outlaw',
    authorRole: 'Certified Divorce Coach',
    date: 'January 10, 2026',
    readTime: '5 min read',
    featured: false,
    image: coachingImage,
    tags: ['Coaching', 'Divorce', 'Decision Support'],
    intro:
      'A divorce coach helps clients stay organized, communicate better, and make decisions with more confidence.',
    sections: [
      {
        heading: 'Where coaching adds value',
        paragraphs: [
          'Clients often need a structured thinking partner while preparing for mediation, legal meetings, or difficult family conversations.',
        ],
        bullets: [
          'Clarifying goals before negotiations',
          'Preparing for hard conversations',
          'Managing emotional overload',
          'Building next-step plans',
        ],
      },
    ],
  },
  {
    id: 'preparing-for-your-first-mediation-session',
    category: 'Mediation',
    title: 'Preparing for Your First Mediation Session',
    excerpt:
      'A short checklist for making your first session more focused, efficient, and useful.',
    author: 'Asa Smith',
    authorRole: 'Mediator',
    date: 'December 28, 2025',
    readTime: '4 min read',
    featured: false,
    image: booksImage,
    tags: ['Mediation', 'Checklist'],
    intro:
      'Good preparation makes mediation more efficient and lowers the chances of wasting time on preventable confusion.',
    sections: [
      {
        heading: 'Bring the right materials',
        paragraphs: [
          'Relevant records, timelines, and notes help the mediator identify what is negotiable and what needs clarification.',
        ],
        bullets: [
          'Contracts or agreements',
          'Financial records where relevant',
          'Key dates and event summaries',
          'Questions you want answered',
        ],
      },
    ],
  },
];

export const teamMembers = [
  {
    name: 'Phyllis J. Outlaw, J.D.',
    role: 'Principal Mediator and Founding Member',
    image: portraitImage,
    summary:
      'A court-approved mediator and attorney with more than three decades of experience across mediation, adjudication, litigation, and public service.',
    bio: [
      'Phyllis J. Outlaw has served clients in legal, judicial, and alternative dispute resolution settings for more than 30 years.',
      'Her background includes service as a magistrate, administrative law judge, and former chairperson of the Attorney Grievance Commission.',
      'That range of experience gives clients grounded guidance in complex family, workplace, and business disputes.',
    ],
    credentials: [
      'Court-approved mediator',
      'Former administrative law judge',
      'Former chairperson, Attorney Grievance Commission',
      'Member, State Bar of Michigan',
    ],
  },
  {
    name: 'Asa Smith, J.D.',
    role: 'Co-Founding Member and Business Advisor',
    image: cityImage,
    summary:
      'A multi-state attorney focused on employment law, workplace management, and advisory services for leaders and organizations.',
    bio: [
      'Asa Smith advises businesses, nonprofits, and leadership teams on workplace systems, policy, and conflict prevention.',
      'His background spans employment law, handbook and policy development, and dispute resolution across the employee lifecycle.',
      'He brings a practical systems lens to business coaching and organizational mediation.',
    ],
    credentials: [
      'Member, California State Bar',
      'Member, Maryland State Bar',
      'Member, Michigan State Bar',
      'Member, New York State Bar',
    ],
  },
];

export const heroMediaCards = {
  home: {
    eyebrow: 'Media spotlight',
    title: 'Trusted voice in public conversations about conflict and resolution',
    image: seminarImage,
    list: mediaAppearances.slice(0, 3).map((item) => item.title),
  },
  coaching: {
    eyebrow: 'Workshops and training',
    title: 'Interactive sessions for teams, agencies, and mission-driven organizations',
    image: seminarImage,
    list: ['Leadership development', 'Conflict management', 'EEO and harassment training'],
  },
};
