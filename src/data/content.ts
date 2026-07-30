// Single source of truth for all editable site copy.
// Nothing in the components below should hard-code long-form text —
// it should read from here so the record can be edited in one place.

export const brand = {
  name: "UC Strategy Group",
  shortName: "UCSG",
  logoFile: "logo.png",
  contactEmail: "danieltlwong@berkeley.edu",
  disclaimer: "Not affiliated with the University of California",
  copyrightYear: 2026,
};

export type Contact = { name: string; email: string; calendly: string };

export const contacts: Contact[] = [
  {
    name: "Daniel Wong",
    email: "danieltlwong@berkeley.edu",
    calendly: "https://calendly.com/danieltlwong-berkeley",
  },
  {
    name: "Emily Hui",
    email: "emilyhui@berkeley.edu",
    calendly: "https://calendly.com/emilyhui",
  },
];

export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "Campuses", href: "#campuses" },
  { label: "Free session", href: "#diagnostic" },
  { label: "Pricing", href: "#pricing" },
];

export const intro = {
  fileNo: "File No. 09 / 09",
  headline: "Strategic Success in the UC System",
  subheadline:
    "Built on firsthand admissions experience. Our guidance covers every stage of the University of California application process, from a team admitted to all nine UC campuses.",
  primaryCta: { label: "Book free diagnostic", href: "#diagnostic" },
  secondaryCta: { label: "Dive into the process", href: "#process" },
  credibility: [
    { value: "9/9", label: "UC campuses admitted to" },
    { value: "50+", label: "PIQs read and revised" },
    { value: "200+", label: "Hours of application review" },
  ],
};

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  portraitFile: string;
  school: string;
  schoolCode: string;
  major: string;
  bio: string;
  expertise: string[];
  funFact: string;
};

export const team: TeamMember[] = [
  {
    id: "daniel-wong",
    name: "Daniel Wong",
    initials: "DW",
    portraitFile: "daniel.png",
    school: "UC Berkeley",
    schoolCode: "UCB",
    major: "Business Administration & Data Science",
    bio: "As a student in UC Berkeley's Global Management Program, Daniel specializes in helping students strategically position their experiences, leadership, and achievements throughout the UC application process. Leveraging his background in entrepreneurship, finance, and data analysis, he works with students to develop compelling narratives that authentically showcase their interests, impact, and intellectual curiosity.",
    expertise: [
      "UC Admissions Strategy",
      "PIQ Development",
      "Leadership Positioning",
      "Activity List Optimization",
      "Extracurricular Strategy",
      "Business & Entrepreneurship",
    ],
    funFact:
      "Daniel has a 6-year-old German Shepherd named Big Boy, who is somehow both the most enthusiastic and goofy member of the family.",
  },
  {
    id: "emily-hui",
    name: "Emily Hui",
    initials: "EH",
    portraitFile: "emily.png",
    school: "UC Berkeley",
    schoolCode: "UCB",
    major: "Applied Mathematics & Computer Science",
    bio: "Emily's interests in computational problem-solving and emerging technologies shape her approach to admissions consulting. She helps students strengthen their essays, refine activity lists, and communicate complex interests in a way that reflects both intellectual depth and personal authenticity. Combining rigor with empathy, Emily empowers students to present their strongest possible applications.",
    expertise: [
      "STEM Admissions",
      "Computer Science Admissions",
      "Technical Project Positioning",
      "Academic Narrative Development",
      "Service & Leadership",
      "Activity Organization",
    ],
    funFact:
      "Emily enjoys exploring different cultures through food and proudly considers herself the world's biggest oyster enthusiast.",
  },
  {
    id: "surdish-randhawa",
    name: "Surdish Randhawa",
    initials: "SR",
    portraitFile: "surdish.png",
    school: "UCLA",
    schoolCode: "UCLA",
    major: "Biology",
    bio: "As a pre-med student, Surdish draws on his experiences in scientific research, public health initiatives, and STEM-focused extracurriculars to help students develop compelling application narratives. He works closely with students to refine their essays and activities lists while highlighting the unique experiences and perspectives that make each application stand out.",
    expertise: [
      "Pre-Med Admissions",
      "PIQ Development",
      "Research Positioning",
      "Healthcare Pathways",
      "STEM Admissions",
      "Clinical Experience Positioning",
    ],
    funFact:
      "Surdish qualified for the Brawl Stars Global Championships, bringing his competitive edge both in and out of his professional roles.",
  },
];

export const whyUs = {
  eyebrow: "Why families choose us",
  heading: "Different by design",
  intro: "We're not a general college prep service. Here's what sets our approach apart.",
  points: [
    {
      title: "UC Specialists",
      body: "Unlike general college consultants, we focus exclusively on the University of California system. Every recommendation is tailored specifically to what UC admissions readers value.",
    },
    {
      title: "Recent admissions experience",
      body: "We successfully navigated the UC admissions process ourselves and understand what today's applicants face. Our advice is based on current admissions realities, not outdated application cycles.",
    },
    {
      title: "Multi-disciplinary expertise",
      // Note: "pre-law" removed — no team member's background supports it; kept to
      // business, STEM, and pre-med, which match the three bios above.
      body: "Our team combines expertise across business, STEM, and pre-med pathways, allowing us to help students position their experiences effectively regardless of academic interest.",
    },
  ],
};

export const approach = {
  eyebrow: "Our approach",
  heading: "Every angle of your application, covered",
  intro: "We work on the parts that matter most, correcting mistakes before they are even made.",
  services: [
    {
      title: "Personal Insight Questions",
      body: "Find the right stories, sharpen your voice, and make every one of your 4 PIQs genuinely memorable to UC readers.",
    },
    {
      title: "Activities and awards",
      body: "How you frame your extracurriculars and honors is a craft. We help you show depth, leadership, and impact the way UC readers want to see it.",
    },
    {
      title: "Major and campus strategy",
      body: "Major choice dramatically affects your admit odds. We run the numbers and build a list that maximizes chances without compromising your goals.",
    },
    {
      title: "Timeline management",
      body: "A personalized roadmap from the day you join our program through the November deadline, ensuring every component of your application is completed on time and nothing is missed.",
    },
    {
      title: "Full application review",
      body: "Before you submit, we review every section of your application, including courses, grades, activities, honors, and more. We will catch anything that could cost you.",
    },
    {
      title: "Free diagnostic first",
      body: "Before you pay anything, we assess your full profile and give you an honest read on your odds at each campus.",
    },
  ],
};

export type Campus = {
  code: string;
  name: string;
  city: string;
  logo: string;
  description: string;
  /** Real-world coordinates, used to project each campus onto the map. */
  lat: number;
  lon: number;
};

export const admissionsRecord = {
  eyebrow: "Admissions record",
  heading: "Admitted to all 9 UC campuses",
  intro: "As a team, we applied to every UC and hold admission offers from all nine, so we know exactly what each campus is looking for.",
  mapHint: "Hover a pin to open its record",
  campuses: [
    {
      code: "UCB",
      name: "UC Berkeley",
      city: "Berkeley, California",
      logo: "logo-berkeley.png",
      description:
        "Known for its world-renowned research, entrepreneurial culture, and leadership across engineering, business, and the sciences.",
      lat: 37.8719,
      lon: -122.2585,
    },
    {
      code: "UCLA",
      name: "UCLA",
      city: "Los Angeles, California",
      logo: "logo-ucla.png",
      description:
        "A powerhouse in film, medicine, and the arts, set in the heart of Los Angeles with deep ties to entertainment and business.",
      lat: 34.0689,
      lon: -118.4452,
    },
    {
      code: "UCSD",
      name: "UC San Diego",
      city: "La Jolla, California",
      logo: "logo-ucsd.png",
      description:
        "A leader in biotech, oceanography, and computer science, anchored by a top research hospital on the La Jolla coast.",
      lat: 32.8801,
      lon: -117.234,
    },
    {
      code: "UCSB",
      name: "UC Santa Barbara",
      city: "Santa Barbara, California",
      logo: "logo-ucsb.png",
      description:
        "Renowned physics and materials science programs paired with a laid-back, ocean-side campus culture.",
      lat: 34.414,
      lon: -119.8489,
    },
    {
      code: "UCI",
      name: "UC Irvine",
      city: "Irvine, California",
      logo: "logo-uci.png",
      description:
        "Strong engineering and biological sciences programs at the center of Orange County's tech and biotech corridor.",
      lat: 33.6405,
      lon: -117.8443,
    },
    {
      code: "UCD",
      name: "UC Davis",
      city: "Davis, California",
      logo: "logo-ucdavis.png",
      description:
        "The nation's top program in agricultural and veterinary sciences, with deep strength in environmental and life sciences.",
      lat: 38.5382,
      lon: -121.7617,
    },
    {
      code: "UCSC",
      name: "UC Santa Cruz",
      city: "Santa Cruz, California",
      logo: "logo-ucsc.png",
      description:
        "A self-directed academic culture with standout programs in marine biology and computer science, set in a redwood-forest campus.",
      lat: 36.9741,
      lon: -122.0308,
    },
    {
      code: "UCR",
      name: "UC Riverside",
      city: "Riverside, California",
      logo: "logo-ucr.png",
      description:
        "A rising research university with standout programs in entomology and public policy, and one of the most diverse student bodies in the system.",
      lat: 33.9737,
      lon: -117.3281,
    },
    {
      code: "UCM",
      name: "UC Merced",
      city: "Merced, California",
      logo: "logo-ucmerced.png",
      description:
        "The newest UC campus, built around interdisciplinary research and expanding access to higher education in the Central Valley.",
      lat: 37.3661,
      lon: -120.4244,
    },
  ] as Campus[],
};

export const fit = {
  eyebrow: "A note on fit",
  heading: "A two-way fit",
  body: [
    "We work with a limited number of students each cycle. Doing this well takes time and attention, and every student we take on gets our full focus.",
    "During the free diagnostic, we figure out if we're the right fit for each other. We factor in your goals, your timeline, and where you stand right now, and if we're not the right match, we'll tell you honestly.",
  ],
  principles: [
    {
      title: "Limited Cohort",
      body: "We cap the number of students we work with each application cycle to protect quality.",
    },
    {
      title: "Mutual Evaluation",
      body: "The diagnostic acts as a two-way assessment to make sure we can genuinely move the needle for you.",
    },
    {
      title: "Honest Direction",
      body: "If your profile or timeline isn't something we can help with, we'll say so and point you in the right direction.",
    },
  ],
};

export const process = {
  eyebrow: "The process",
  heading: "Our process",
  steps: [
    {
      title: "Free diagnostic session",
      badge: "Free · 30 min",
      body: "Together, we go through profile audits, admit odds, gap analysis, and a strategic preview before any commitment.",
    },
    {
      title: "Strategy and school list",
      body: "In addition to helping you understand impacted programs, we assist to finalize your campus list, major selections, and application approach.",
    },
    {
      title: "PIQ development",
      body: "Brainstorm all 4 Personal Insight Questions together, then multiple rounds of drafts and feedback until each one is genuinely strong.",
    },
    {
      title: "Activities and honors review",
      body: "We go through how you're presenting every extracurricular, award, and experience to make sure nothing is undersold.",
    },
    {
      title: "Final application sweep",
      body: "A complete review of every section before you hit submit.",
    },
  ],
};

export type PerEssayOption = {
  slug: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  cta: string;
};

export type Plan = {
  slug: string;
  name: string;
  badge?: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Choosing what you need",
  intro: "All plans start with a free diagnostic. Payment plans available on request.",
  perEssay: [
    {
      slug: "single-piq-review",
      name: "Single PIQ review",
      description: "One round of detailed written feedback on any Personal Insight Question.",
      price: "$79",
      unit: "/ essay",
      cta: "Get started",
    },
    {
      slug: "unlimited-piq-revisions",
      name: "Unlimited PIQ revisions",
      description: "Back-and-forth feedback on a single essay until it's right.",
      price: "$149",
      unit: "/ essay",
      cta: "Get started",
    },
  ] as PerEssayOption[],
  plans: [
    {
      slug: "piq-intensive",
      name: "PIQ Intensive",
      price: "$349",
      billing: "one-time · good entry-level",
      features: [
        "60-minute strategy call",
        "Brainstorm all 4 PIQs",
        "Essay roadmap",
        "Activity list review",
      ],
      cta: "Get started",
    },
    {
      slug: "uc-application-package",
      name: "UC Application Package",
      badge: "Most popular",
      price: "$1,999",
      billing: "full application cycle",
      features: [
        "Strategy session",
        "Major selection",
        "Activities & honors optimization",
        "3 rounds of edits for all PIQs",
        "Full UC application review",
        "Email support",
      ],
      cta: "Get started",
      featured: true,
    },
    {
      slug: "uc-admission-accelerator",
      name: "UC Admission Accelerator",
      price: "$3,999",
      billing: "full application cycle",
      features: [
        "Everything in UC Application Package",
        "Unlimited PIQ revisions",
        "Priority response (24 hrs)",
        "Waitlist strategy",
        "Interview prep (if applicable)",
        "Monthly check-ins",
      ],
      cta: "Get started",
    },
  ] as Plan[],
};

export const paymentPage = {
  fileNo: "File No. 09 / 09",
  eyebrow: "Next steps",
  heading: "Let's get your file moving.",
  intro:
    "Every plan starts the same way: a free diagnostic session, then payment via Zelle before your first working session.",
  steps: [
    {
      title: "Book your free diagnostic",
      body: "Pick whichever consultant's calendar works best for your schedule.",
    },
    {
      title: "Send payment via Zelle",
      body: "Scan the QR code below. Include your name and selected plan in the memo.",
    },
    {
      title: "We get to work",
      body: "Once payment is confirmed, we schedule your first working session and open your file.",
    },
  ],
  fallbackHeading: "Start your file.",
  zelleQr: "zelle-qr.png",
  zelleNote: "Open your banking app and scan to pay via Zelle.",
};

export type FaqItem = { question: string; answer: string; flagged?: boolean };

export const faq: FaqItem[] = [
  {
    question: "What makes your team different from other admissions consultants?",
    answer:
      "We focus exclusively on the UC system, not general college prep. We've been through this process recently ourselves, and our team spans business, STEM, and pre-med backgrounds. See \"Built differently\" above for the full picture.",
  },
  {
    question: "Do you guarantee admission to a UC campus?",
    answer:
      "No. Admissions decisions are made solely by each campus, and no consultant can guarantee acceptance. What we can do is make sure your application presents your strongest, most authentic case.",
  },
  {
    question: "Which students do you work with?",
    answer:
      "High school students applying to the University of California system across all nine undergraduate campuses and a range of intended majors.",
  },
  {
    question: "What's included in a single PIQ review?",
    answer:
      "One round of detailed written feedback on any Personal Insight Question you send us. If you want back-and-forth revision instead of a single pass, the unlimited-revisions option or a full package is the better fit.",
  },
  {
    question: "Can you help students applying to competitive majors?",
    answer:
      "Yes. Our team's combined backgrounds in business, computer science, applied math, and pre-med let us speak specifically to a range of competitive majors and how to position for them.",
  },
  {
    question: "How do meetings take place?",
    answer:
      "Format and scheduling are confirmed when you book your free diagnostic session.",
  },
  {
    question: "When should I start working with a consultant?",
    answer:
      "There's no fixed start date. Our process runs from onboarding through the November UC deadline, so the right time to start is whenever you're ready. The free diagnostic is a good way to figure out your timeline.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. All plans start with a free diagnostic, and payment plans are available on request.",
  },
  {
    question: "How do we pay?",
    answer: "We accept Zelle. After choosing a plan, you'll get a QR code and Zelle details on the payment page.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book your free diagnostic session below. There's no cost and no commitment. It's the starting point for every plan we offer.",
  },
];

export const finalCta = {
  eyebrow: "Free first session",
  heading: "Book your free 30-minute diagnostic",
  body: "We'll review your full profile and give you an honest read on where you stand and what it'll take to get in.",
  scheduleLabel: "Schedule your meeting",
  bookNowLabel: "Book now",
  bookingUrl: "https://calendly.com/emilyhui",
  questionsLabel: "Questions?",
};

export const footer = {
  nav,
  disclaimerLine: `© ${brand.copyrightYear} ${brand.name} · ${brand.disclaimer}`,
  contactLabel: "Contact",
};
