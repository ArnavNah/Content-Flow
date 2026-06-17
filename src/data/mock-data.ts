export interface MockSuggestion {
  id: number;
  title: string;
  description: string;
  type: "Inspiration" | "Repurpose" | "Video" | "Curation" | "Strategy" | "Opinion";
  source: string;
  difficulty: "Fast" | "Medium" | "High";
  platform: "LinkedIn" | "Twitter" | "Newsletter" | "Video Script";
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  type: "Product Launch" | "Newsletter Growth" | "Personal Brand" | "Agency Growth" | "SaaS Launch";
  status: "Active" | "Completed" | "Draft";
  startDate: string; // ISO date format YYYY-MM-DD
  endDate: string; // ISO date format YYYY-MM-DD
  workspaceId: "personal" | "agency" | "startup";
  members: string[];
}

export interface MockContentAsset {
  id: number;
  title: string;
  type: "LinkedIn Post" | "Twitter Thread" | "Newsletter" | "Video Script";
  status: "Published" | "Draft" | "Review" | "Idea" | "Scheduled";
  performance: string;
  perfValue: number;
  date: string; // ISO String
  workspaceId: "personal" | "agency" | "startup";
  campaignId?: number;
}

export interface WorkspaceMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface WorkspaceConfig {
  id: "personal" | "agency" | "startup";
  name: string;
  type: string;
  healthScore: number;
  baselineKPIs: {
    assets: number;
    reach: number;
    engagement: number;
    drafts: number;
  };
  members: WorkspaceMember[];
  weeklyActivity: { day: string; assets: number }[];
}

export const WORKSPACES: WorkspaceConfig[] = [
  {
    id: "personal",
    name: "Personal Brand",
    type: "Personal",
    healthScore: 96,
    baselineKPIs: {
      assets: 2483,
      reach: 184000,
      engagement: 8.4,
      drafts: 37
    },
    members: [
      { name: "John Doe", role: "Owner", initials: "JD", color: "bg-emerald-500/10 text-emerald-600" },
      { name: "Alice Smith", role: "Writer", initials: "AS", color: "bg-blue-500/10 text-blue-600" },
      { name: "Koby Lee", role: "Editor", initials: "KL", color: "bg-indigo-500/10 text-indigo-600" }
    ],
    weeklyActivity: [
      { day: "Mon", assets: 12 },
      { day: "Tue", assets: 8 },
      { day: "Wed", assets: 15 },
      { day: "Thu", assets: 9 },
      { day: "Fri", assets: 18 }
    ]
  },
  {
    id: "agency",
    name: "Growth Agency",
    type: "Agency",
    healthScore: 88,
    baselineKPIs: {
      assets: 9420,
      reach: 742000,
      engagement: 6.8,
      drafts: 145
    },
    members: [
      { name: "John Doe", role: "Director", initials: "JD", color: "bg-emerald-500/10 text-emerald-600" },
      { name: "Sarah Connor", role: "Strategist", initials: "SC", color: "bg-pink-500/10 text-pink-600" },
      { name: "Marcus Aurelius", role: "Copywriter", initials: "MA", color: "bg-amber-500/10 text-amber-600" },
      { name: "Cleopatra Philopator", role: "Designer", initials: "CP", color: "bg-purple-500/10 text-purple-600" }
    ],
    weeklyActivity: [
      { day: "Mon", assets: 34 },
      { day: "Tue", assets: 42 },
      { day: "Wed", assets: 29 },
      { day: "Thu", assets: 51 },
      { day: "Fri", assets: 48 }
    ]
  },
  {
    id: "startup",
    name: "SaaS Startup",
    type: "Team",
    healthScore: 91,
    baselineKPIs: {
      assets: 1240,
      reach: 320000,
      engagement: 7.9,
      drafts: 24
    },
    members: [
      { name: "John Doe", role: "Founder", initials: "JD", color: "bg-emerald-500/10 text-emerald-600" },
      { name: "Elon Musk", role: "Evangelist", initials: "EM", color: "bg-blue-500/10 text-blue-600" },
      { name: "Gwynne Shotwell", role: "Operations", initials: "GS", color: "bg-indigo-500/10 text-indigo-600" }
    ],
    weeklyActivity: [
      { day: "Mon", assets: 5 },
      { day: "Tue", assets: 12 },
      { day: "Wed", assets: 8 },
      { day: "Thu", assets: 14 },
      { day: "Fri", assets: 22 }
    ]
  }
];

// Generate 50+ AI suggestions
export const MOCK_SUGGESTIONS: MockSuggestion[] = [
  { id: 1, title: "Top 5 LinkedIn Hooks For Founders", description: "Repurpose your recent 'bootstrapping' thesis into high-engagement hook frameworks.", type: "Inspiration", source: "Founder trends", difficulty: "Fast", platform: "LinkedIn" },
  { id: 2, title: "Convert Recent Newsletter To Thread", description: "Transform 'Scaling to 10k subscribers' into a 7-part high-value Twitter/X thread.", type: "Repurpose", source: "Edition #43", difficulty: "Medium", platform: "Twitter" },
  { id: 3, title: "Repurpose Blog Into Video Script", description: "Rebuild '5 copywriting rules' into a 60-second engaging short-form video outline.", type: "Video", source: "Website blog", difficulty: "High", platform: "Video Script" },
  { id: 4, title: "Create Weekly Content Roundup", description: "Assemble a digest post of your published assets to share as a weekly recap.", type: "Curation", source: "Active library", difficulty: "Fast", platform: "Newsletter" },
  { id: 5, title: "Create Product Launch Sequence", description: "Draft a 3-part teaser sequence announcing ContentFlow 2.0 features.", type: "Strategy", source: "Product specs", difficulty: "High", platform: "LinkedIn" },
  { id: 6, title: "Generate Founder Story Post", description: "Tell the emotional story of your first $100 MRR milestone to build connection.", type: "Inspiration", source: "Company lore", difficulty: "Medium", platform: "LinkedIn" },
  { id: 7, title: "Convert Case Study to Thread", description: "Turn the 'Acme Corp' client success story into an educational Twitter carousel.", type: "Repurpose", source: "Case study library", difficulty: "Medium", platform: "Twitter" },
  { id: 8, title: "Write Newsletter: 'The AI Shift'", description: "Draft a thought-provoking editorial about how local state is replacing API databases.", type: "Inspiration", source: "Tech trends", difficulty: "High", platform: "Newsletter" },
  { id: 9, title: "Design Video Outline: 'Day in Life'", description: "Create a fast-paced 45-second TikTok/Reels script covering your dev workflow.", type: "Video", source: "Daily logs", difficulty: "Fast", platform: "Video Script" },
  { id: 10, title: "Create Thought Leadership Post", description: "Discuss the death of generic SaaS templates and the rise of premium bespoke layouts.", type: "Strategy", source: "Design manifesto", difficulty: "Medium", platform: "LinkedIn" },
  { id: 11, title: "Draft Post: 'Why We Don't Build APIs'", description: "A contrarian take on the power of client-side operations to spark discussions.", type: "Opinion", source: "Product principles", difficulty: "Fast", platform: "LinkedIn" },
  { id: 12, title: "Convert YouTube Video to Newsletter", description: "Summarize the key takeaways from your latest whiteboard session.", type: "Repurpose", source: "YouTube video #12", difficulty: "Medium", platform: "Newsletter" },
  { id: 13, title: "Write Thread: '10 Dev Utilities'", description: "List the exact command-line tools that saved you 10 hours this week.", type: "Curation", source: "Developer notes", difficulty: "Fast", platform: "Twitter" },
  { id: 14, title: "Write Script: 'Pitching to VCs'", description: "Create a humorous 30-second script detailing the difference in seed vs series A pitches.", type: "Video", source: "Founder experiences", difficulty: "Medium", platform: "Video Script" },
  { id: 15, title: "Draft Weekly Team Digest", description: "Highlight the top achievements, failures, and learnings of your team this week.", type: "Curation", source: "Slack logs", difficulty: "Fast", platform: "Newsletter" },
  { id: 16, title: "Create 3 LinkedIn Hooks for Engineers", description: "Craft highly targeted hooks aimed at software developers scaling tech stacks.", type: "Inspiration", source: "Engineering blog", difficulty: "Fast", platform: "LinkedIn" },
  { id: 17, title: "Convert Newsletter to LinkedIn Post", description: "Adapt 'The Newsletter Growth Guide' into a single long-form LinkedIn post.", type: "Repurpose", source: "Newsletter #24", difficulty: "Medium", platform: "LinkedIn" },
  { id: 18, title: "Write Post: '5 Mistakes I Made in Sales'", description: "Showcase transparency by discussing early sales calls that went completely wrong.", type: "Inspiration", source: "CRM history", difficulty: "Medium", platform: "LinkedIn" },
  { id: 19, title: "Create Thread: 'The Bootstrapping Blueprint'", description: "Detail the exact financial playbook of growing from $0 to $50k MRR.", type: "Strategy", source: "Financial records", difficulty: "High", platform: "Twitter" },
  { id: 20, title: "Draft Post: 'We're Hiring!'", description: "Write an engaging, non-generic job description for a lead growth engineer.", type: "Strategy", source: "Recruiting specs", difficulty: "Fast", platform: "LinkedIn" },
  { id: 21, title: "Write Video Script: 'How We Scale'", description: "Script a 3-minute video showing your database design and load balances.", type: "Video", source: "Tech architecture", difficulty: "High", platform: "Video Script" },
  { id: 22, title: "Write Newsletter: 'Design Tokens Explained'", description: "Explain why UI tokens are the foundation of modern component design systems.", type: "Inspiration", source: "Design tokens", difficulty: "Medium", platform: "Newsletter" },
  { id: 23, title: "Create Thread: '5 Figma Hacks'", description: "Detail design shortcuts that speed up mockup workflows by 2x.", type: "Curation", source: "Figma projects", difficulty: "Fast", platform: "Twitter" },
  { id: 24, title: "Repurpose Blog into Thread", description: "Turn 'Optimizing NextJS SEO' into a 5-step Twitter tutorial.", type: "Repurpose", source: "SEO blog post", difficulty: "Medium", platform: "Twitter" },
  { id: 25, title: "Draft Post: 'The MVP Fallacy'", description: "Argue against minimum viable products in favor of premium, polished initial versions.", type: "Opinion", source: "Product strategy", difficulty: "Medium", platform: "LinkedIn" },
  { id: 26, title: "Write Script: 'Figma to Code'", description: "A 60-second video script demonstrating how to translate design tokens into CSS variables.", type: "Video", source: "UI setups", difficulty: "Fast", platform: "Video Script" },
  { id: 27, title: "Create Weekly Resources list", description: "Share the top 3 libraries, articles, and repos you discovered this week.", type: "Curation", source: "Browser bookmarks", difficulty: "Fast", platform: "Newsletter" },
  { id: 28, title: "Write Post: 'Why We Love HSL'", description: "Detail how HSL tailored colors enable perfect dark modes and accents.", type: "Inspiration", source: "UI guidelines", difficulty: "Medium", platform: "LinkedIn" },
  { id: 29, title: "Draft Post: 'Attio vs Salesforce'", description: "A comparative review of modern workspaces versus enterprise databases.", type: "Strategy", source: "Sales logs", difficulty: "High", platform: "LinkedIn" },
  { id: 30, title: "Convert Thread into Newsletter", description: "Expand a popular thread about productivity hacks into a full newsletter edition.", type: "Repurpose", source: "Twitter analytics", difficulty: "Medium", platform: "Newsletter" },
  { id: 31, title: "Write Thread: 'NextJS Hydration'", description: "Explain what causes hydration mismatches and how local states fix them.", type: "Inspiration", source: "NextJS documentation", difficulty: "Medium", platform: "Twitter" },
  { id: 32, title: "Write Script: 'Bootstrapping vs VC'", description: "A debate-style script comparing the pros and cons of bootstrap funding.", type: "Video", source: "Finance docs", difficulty: "High", platform: "Video Script" },
  { id: 33, title: "Draft Post: 'The Power of Glassmorphism'", description: "Explain why glass textures create premium, professional dashboard interfaces.", type: "Inspiration", source: "Visual styles", difficulty: "Fast", platform: "LinkedIn" },
  { id: 34, title: "Write Newsletter: 'Writing Cold Emails'", description: "Draft the exact copy templates that landed 20% conversion rates.", type: "Strategy", source: "Outreach CRM", difficulty: "High", platform: "Newsletter" },
  { id: 35, title: "Create Thread: 'The Tailwind V4 Guide'", description: "List the top 3 breaking changes in Tailwind v4 that every dev should know.", type: "Curation", source: "Tailwind release logs", difficulty: "Fast", platform: "Twitter" },
  { id: 36, title: "Convert Podcast transcript to LinkedIn", description: "Convert an interview quote into an inspiring story-driven LinkedIn post.", type: "Repurpose", source: "Podcast interview", difficulty: "Medium", platform: "LinkedIn" },
  { id: 37, title: "Draft Post: 'No-Code is Dead'", description: "A contrarian post arguing that custom agentic coding has made no-code obsolete.", type: "Opinion", source: "AI research", difficulty: "Medium", platform: "LinkedIn" },
  { id: 38, title: "Write Video Script: 'SaaS Architecture'", description: "A 2-minute whiteboard video script explaining scalable serverless layouts.", type: "Video", source: "Server layouts", difficulty: "High", platform: "Video Script" },
  { id: 39, title: "Write Weekly Startup Roundup", description: "Share key metrics and ship updates for your startup team.", type: "Curation", source: "Sprint plans", difficulty: "Fast", platform: "Newsletter" },
  { id: 40, title: "Draft Post: 'Why We Hate Boring Dashboards'", description: "Explain why standard Bootstrap designs are killing user retention.", type: "Inspiration", source: "UX research", difficulty: "Fast", platform: "LinkedIn" },
  { id: 41, title: "Create Thread: '10 Recharts Tricks'", description: "Show how custom HTML tooltips and gradients make data dashboards premium.", type: "Curation", source: "Chart components", difficulty: "Medium", platform: "Twitter" },
  { id: 42, title: "Convert YouTube Transcript to Thread", description: "Convert your 'API Design' video into a 10-part coding tutorial thread.", type: "Repurpose", source: "YouTube video #15", difficulty: "Medium", platform: "Twitter" },
  { id: 43, title: "Write Newsletter: 'Building in Public'", description: "Discuss why building in public creates an organic moat that copycats can't touch.", type: "Strategy", source: "SaaS principles", difficulty: "Medium", platform: "Newsletter" },
  { id: 44, title: "Write Script: 'The Perfect CTA'", description: "A 45-second script detailing where and how to place call-to-actions.", type: "Video", source: "Conversion logs", difficulty: "Fast", platform: "Video Script" },
  { id: 45, title: "Draft Post: 'Saying No to Customers'", description: "Discuss how saying no to feature requests saved your product roadmap.", type: "Strategy", source: "Product backlog", difficulty: "Medium", platform: "LinkedIn" },
  { id: 46, title: "Create Thread: 'The NextJS 16 Blueprint'", description: "Outline key Turbopack configuration settings for high performance.", type: "Inspiration", source: "NextJS 16 docs", difficulty: "High", platform: "Twitter" },
  { id: 47, title: "Repurpose Case Study into Newsletter", description: "Break down how Acme Corp cut development costs by 40% with ContentFlow.", type: "Repurpose", source: "Acme case study", difficulty: "Medium", platform: "Newsletter" },
  { id: 48, title: "Draft Post: 'The AI Hype is Over'", description: "Argue that focus has shifted from wrappers to deeply integrated agentic systems.", type: "Opinion", source: "AI market reports", difficulty: "Medium", platform: "LinkedIn" },
  { id: 49, title: "Write Script: 'My Biggest Failure'", description: "A 90-second script detailing the time you accidentally deleted a production database.", type: "Video", source: "Tech postmortems", difficulty: "Medium", platform: "Video Script" },
  { id: 50, title: "Create Thread: '5 Attio Database Views'", description: "Share the exact database pipelines you use to track founder relations.", type: "Curation", source: "CRM templates", difficulty: "Fast", platform: "Twitter" }
];

// Helper to generate a date offset in hours/days
const getDateOffset = (daysAgo: number, hoursAgo: number = 0): string => {
  const date = new Date("2026-06-16T18:00:00.000Z");
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Generate 100+ content assets
export const MOCK_CONTENT_ASSETS: MockContentAsset[] = [
  // SCHEDULED CONTENT FOR PERSONAL BRAND
  { id: 9001, title: "The ultimate guide to glassmorphism in SaaS UI", type: "LinkedIn Post", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-18T10:00:00.000Z", workspaceId: "personal" },
  { id: 9002, title: "Why Next.js local state transitions feel like magic", type: "Twitter Thread", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-19T14:30:00.000Z", workspaceId: "personal" },
  { id: 9003, title: "ContentFlow AI product updates - June edition", type: "Newsletter", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-21T09:00:00.000Z", workspaceId: "personal" },
  { id: 9004, title: "SaaS growth strategies for the next decade", type: "Video Script", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-23T16:00:00.000Z", workspaceId: "personal" },
  { id: 9005, title: "Designing beautiful high-fidelity calendars", type: "LinkedIn Post", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-24T11:00:00.000Z", workspaceId: "personal" },

  // SCHEDULED CONTENT FOR GROWTH AGENCY
  { id: 9006, title: "How we scale inbound lead flow by 5x", type: "LinkedIn Post", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-18T08:00:00.000Z", workspaceId: "agency" },
  { id: 9007, title: "The exact cold email templates we use for enterprise B2B", type: "Newsletter", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-20T09:00:00.000Z", workspaceId: "agency" },
  { id: 9008, title: "B2B client retention tactics that save deals", type: "Twitter Thread", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-22T14:00:00.000Z", workspaceId: "agency" },

  // SCHEDULED CONTENT FOR SAAS STARTUP
  { id: 9009, title: "Why building in public is your greatest organic moat", type: "LinkedIn Post", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-18T12:00:00.000Z", workspaceId: "startup" },
  { id: 9010, title: "Introducing ContentFlow Command Palette (Ctrl+K)", type: "Twitter Thread", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-20T15:00:00.000Z", workspaceId: "startup" },
  { id: 9011, title: "Serverless caching strategies for real-time dashboards", type: "Newsletter", status: "Scheduled", performance: "Scheduled", perfValue: 0, date: "2026-06-22T08:30:00.000Z", workspaceId: "startup" },

  // PERSONAL BRAND (workspace: personal)
  { id: 1, title: "How I Built My Agency from Scratch", type: "LinkedIn Post", status: "Published", performance: "12.3K Reach", perfValue: 12300, date: getDateOffset(0, 2), workspaceId: "personal", campaignId: 101 },
  { id: 2, title: "Why Founders Fail at Delegation", type: "Twitter Thread", status: "Published", performance: "8.4K Reach", perfValue: 8400, date: getDateOffset(0, 5), workspaceId: "personal", campaignId: 101 },
  { id: 3, title: "Scaling Content Operations with AI", type: "Newsletter", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(1, 1), workspaceId: "personal", campaignId: 101 },
  { id: 4, title: "SaaS Launch Announcement Video", type: "Video Script", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(1, 4), workspaceId: "personal", campaignId: 101 },
  { id: 5, title: "10 Frameworks for Writing Better Code", type: "LinkedIn Post", status: "Published", performance: "24.5K Reach", perfValue: 24500, date: getDateOffset(3), workspaceId: "personal", campaignId: 101 },
  { id: 6, title: "NextJS 16 is officially here. Let's talk Turbopack", type: "LinkedIn Post", status: "Published", performance: "18.2K Reach", perfValue: 18200, date: getDateOffset(4), workspaceId: "personal" },
  { id: 7, title: "5 copywriting rules for landing pages", type: "Twitter Thread", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(0, 1), workspaceId: "personal" },
  { id: 8, title: "Top 5 AI tools we use daily", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(0, 8), workspaceId: "personal" },
  { id: 9, title: "Why bootstrapping is the new VC", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(0, 12), workspaceId: "personal" },
  { id: 10, title: "ContentFlow AI product roadshow", type: "Video Script", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(1), workspaceId: "personal" },
  { id: 11, title: "Scaling from 0 to 10k subscribers", type: "Newsletter", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(2), workspaceId: "personal" },
  { id: 12, title: "How we designed our billing system", type: "LinkedIn Post", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(3), workspaceId: "personal" },
  { id: 13, title: "Stop writing boring subject lines", type: "Newsletter", status: "Published", performance: "8.4K Opens", perfValue: 8400, date: getDateOffset(7), workspaceId: "personal", campaignId: 102 },
  { id: 14, title: "SaaS growth strategies that actually scale", type: "Newsletter", status: "Published", performance: "7.9K Opens", perfValue: 7900, date: getDateOffset(10), workspaceId: "personal", campaignId: 102 },
  { id: 15, title: "The design tokens guide for developers", type: "LinkedIn Post", status: "Published", performance: "14.2K Reach", perfValue: 14200, date: getDateOffset(8), workspaceId: "personal", campaignId: 102 },
  { id: 16, title: "Building a SaaS in public: Week 1 recap", type: "LinkedIn Post", status: "Published", performance: "15.6K Reach", perfValue: 15600, date: getDateOffset(6), workspaceId: "personal", campaignId: 102 },
  { id: 17, title: "Figma shortcuts for faster layouts", type: "Twitter Thread", status: "Published", performance: "9.3K Reach", perfValue: 9300, date: getDateOffset(12), workspaceId: "personal" },
  { id: 18, title: "Why you should never use raw CSS again", type: "LinkedIn Post", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(4), workspaceId: "personal" },
  { id: 19, title: "Cold emailing templates that convert at 20%", type: "Newsletter", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(2), workspaceId: "personal" },
  { id: 20, title: "Figma to Code video outline", type: "Video Script", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(3), workspaceId: "personal" },
  { id: 21, title: "Why we love HSL tailored colors", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(5), workspaceId: "personal" },
  { id: 22, title: "NextJS hydration mismatches fixed", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(6), workspaceId: "personal" },
  { id: 23, title: "The Bootstrapping Blueprint: Financial guide", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(8), workspaceId: "personal" },
  { id: 24, title: "SaaS architecture whiteboard sketch", type: "Video Script", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(10), workspaceId: "personal" },
  { id: 25, title: "Saying no to customer feature requests", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(12), workspaceId: "personal" },
  { id: 26, title: "Why we hate boring generic Bootstrap layouts", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(14), workspaceId: "personal" },
  { id: 27, title: "10 Recharts tips for SaaS dashboards", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(15), workspaceId: "personal" },
  { id: 28, title: "Acme Corp client case study outline", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(16), workspaceId: "personal" },
  { id: 29, title: "The AI Hype: Why integrations matter", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(18), workspaceId: "personal" },
  { id: 30, title: "Slowing down client-side navigations", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(20), workspaceId: "personal" },
  { id: 31, title: "Why we built ContentFlow AI in NextJS", type: "LinkedIn Post", status: "Published", performance: "11.2K Reach", perfValue: 11200, date: getDateOffset(14), workspaceId: "personal" },
  { id: 32, title: "5 Figma plugins you cannot live without", type: "Twitter Thread", status: "Published", performance: "7.2K Reach", perfValue: 7200, date: getDateOffset(16), workspaceId: "personal" },
  { id: 33, title: "The newsletter marketing blueprint", type: "Newsletter", status: "Published", performance: "6.8K Opens", perfValue: 6800, date: getDateOffset(18), workspaceId: "personal" },
  { id: 34, title: "Why most founders fail in seed rounds", type: "Video Script", status: "Published", performance: "15.4K Views", perfValue: 15400, date: getDateOffset(20), workspaceId: "personal" },
  { id: 35, title: "Productivity hacks that saved me 10 hours", type: "LinkedIn Post", status: "Published", performance: "9.2K Reach", perfValue: 9200, date: getDateOffset(22), workspaceId: "personal" },
  { id: 36, title: "Building a SaaS in public: Launch prep", type: "LinkedIn Post", status: "Published", performance: "10.4K Reach", perfValue: 10400, date: getDateOffset(24), workspaceId: "personal" },
  { id: 37, title: "Tailwind CSS v4 config tutorial", type: "Twitter Thread", status: "Published", performance: "5.8K Reach", perfValue: 5800, date: getDateOffset(26), workspaceId: "personal" },
  { id: 38, title: "How we landed our first 10 B2B clients", type: "Newsletter", status: "Published", performance: "5.4K Opens", perfValue: 5400, date: getDateOffset(28), workspaceId: "personal" },
  { id: 39, title: "Whiteboard session: NextJS routing", type: "Video Script", status: "Published", performance: "12.2K Views", perfValue: 12200, date: getDateOffset(30), workspaceId: "personal" },

  // GROWTH AGENCY (workspace: agency)
  { id: 40, title: "Acme Corp: Scaling pipeline by 300%", type: "LinkedIn Post", status: "Published", performance: "48.2K Reach", perfValue: 48200, date: getDateOffset(0, 1), workspaceId: "agency", campaignId: 201 },
  { id: 41, title: "Client Acquisition Funnel Blueprint", type: "Twitter Thread", status: "Published", performance: "34.1K Reach", perfValue: 34100, date: getDateOffset(0, 4), workspaceId: "agency", campaignId: 201 },
  { id: 42, title: "Q3 Copywriting Masterclass for B2B", type: "Newsletter", status: "Published", performance: "28.4K Opens", perfValue: 28400, date: getDateOffset(1), workspaceId: "agency", campaignId: 201 },
  { id: 43, title: "How to hire senior copywriters video", type: "Video Script", status: "Published", performance: "82.3K Views", perfValue: 82300, date: getDateOffset(2), workspaceId: "agency", campaignId: 201 },
  { id: 44, title: "10 LinkedIn frameworks for client accounts", type: "LinkedIn Post", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(0, 3), workspaceId: "agency", campaignId: 201 },
  { id: 45, title: "Outsourcing operations: Honest review", type: "LinkedIn Post", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(1, 2), workspaceId: "agency" },
  { id: 46, title: "The ultimate cold email script library", type: "Newsletter", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(1, 6), workspaceId: "agency" },
  { id: 47, title: "Figma design system handoff tutorial", type: "Twitter Thread", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(2), workspaceId: "agency", campaignId: 202 },
  { id: 48, title: "Agency onboarding email sequence", type: "Newsletter", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(3), workspaceId: "agency", campaignId: 202 },
  { id: 49, title: "Short-form content workflow roadmap", type: "Video Script", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(4), workspaceId: "agency", campaignId: 202 },
  { id: 50, title: "Why B2B marketing is completely broken", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(1), workspaceId: "agency" },
  { id: 51, title: "5 agencies making $1M+ and how they do it", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(1, 10), workspaceId: "agency" },
  { id: 52, title: "B2B Outreach metrics we track daily", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(2), workspaceId: "agency" },
  { id: 53, title: "How to run pitch decks script", type: "Video Script", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(3), workspaceId: "agency" },
  { id: 54, title: "LinkedIn hook templates for sales execs", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(4), workspaceId: "agency" },
  { id: 55, title: "Why we abandoned Google Sheets for Attio", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(5), workspaceId: "agency" },
  { id: 56, title: "Framer Motion animations for landing pages", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(6), workspaceId: "agency" },
  { id: 57, title: "Case study: How we saved client X $50K", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(7), workspaceId: "agency" },
  { id: 58, title: "Client retention playbook guide", type: "LinkedIn Post", status: "Published", performance: "39.5K Reach", perfValue: 39500, date: getDateOffset(5), workspaceId: "agency" },
  { id: 59, title: "The secret to high-performing video scripts", type: "Video Script", status: "Published", performance: "64.2K Views", perfValue: 64200, date: getDateOffset(6), workspaceId: "agency" },
  { id: 60, title: "B2B Lead generation case study: SaaS client", type: "Newsletter", status: "Published", performance: "22.4K Opens", perfValue: 22400, date: getDateOffset(8), workspaceId: "agency" },
  { id: 61, title: "How to hire growth managers on LinkedIn", type: "LinkedIn Post", status: "Published", performance: "31.2K Reach", perfValue: 31200, date: getDateOffset(10), workspaceId: "agency" },
  { id: 62, title: "The design secrets of Linear, Stripe and Attio", type: "LinkedIn Post", status: "Published", performance: "54.8K Reach", perfValue: 54800, date: getDateOffset(12), workspaceId: "agency" },
  { id: 63, title: "10 steps to transition from freelancer to agency", type: "Twitter Thread", status: "Published", performance: "28.5K Reach", perfValue: 28500, date: getDateOffset(14), workspaceId: "agency" },
  { id: 64, title: "Why agency retainers are superior to project rates", type: "Newsletter", status: "Published", performance: "25.1K Opens", perfValue: 25100, date: getDateOffset(15), workspaceId: "agency" },
  { id: 65, title: "Scale your creative operations with automated AI tools", type: "Video Script", status: "Published", performance: "74.6K Views", perfValue: 74600, date: getDateOffset(16), workspaceId: "agency" },
  { id: 66, title: "Why corporate stock photos are killing your brand CTR", type: "LinkedIn Post", status: "Published", performance: "42.1K Reach", perfValue: 42100, date: getDateOffset(18), workspaceId: "agency" },
  { id: 67, title: "How to write copy that sounds like a human", type: "Twitter Thread", status: "Published", performance: "19.3K Reach", perfValue: 19300, date: getDateOffset(20), workspaceId: "agency" },
  { id: 68, title: "Weekly client dashboard setup templates", type: "Newsletter", status: "Published", performance: "18.4K Opens", perfValue: 18400, date: getDateOffset(22), workspaceId: "agency" },
  { id: 69, title: "B2B marketing trends to look out for in 2026", type: "LinkedIn Post", status: "Published", performance: "58.4K Reach", perfValue: 58400, date: getDateOffset(24), workspaceId: "agency" },

  // SAAS STARTUP (workspace: startup)
  { id: 70, title: "Announcing ContentFlow AI 2.0", type: "LinkedIn Post", status: "Published", performance: "28.4K Reach", perfValue: 28400, date: getDateOffset(0, 3), workspaceId: "startup", campaignId: 301 },
  { id: 71, title: "How We Optimized NextJS Loading times", type: "Twitter Thread", status: "Published", performance: "15.3K Reach", perfValue: 15300, date: getDateOffset(0, 6), workspaceId: "startup", campaignId: 301 },
  { id: 72, title: "SaaS newsletter issue #15: Serverless scaling", type: "Newsletter", status: "Published", performance: "12.4K Opens", perfValue: 12400, date: getDateOffset(1), workspaceId: "startup", campaignId: 301 },
  { id: 73, title: "Why we chose HSL color setups for SaaS theme", type: "LinkedIn Post", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(0, 2), workspaceId: "startup", campaignId: 301 },
  { id: 74, title: "The developer's guide to responsive dashboards", type: "Twitter Thread", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(1, 3), workspaceId: "startup", campaignId: 301 },
  { id: 75, title: "Product onboarding video script preview", type: "Video Script", status: "Review", performance: "Draft", perfValue: 0, date: getDateOffset(1, 8), workspaceId: "startup", campaignId: 301 },
  { id: 76, title: "Designing SaaS modals with CSS custom properties", type: "LinkedIn Post", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(2), workspaceId: "startup" },
  { id: 77, title: "Why we hate boring standard templates", type: "Twitter Thread", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(3), workspaceId: "startup" },
  { id: 78, title: "Product newsletter: Custom Recharts tooltip", type: "Newsletter", status: "Draft", performance: "Draft", perfValue: 0, date: getDateOffset(4), workspaceId: "startup" },
  { id: 79, title: "Building in public: Finding early tech partners", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(1), workspaceId: "startup" },
  { id: 80, title: "NextJS static exports vs server actions", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(1, 14), workspaceId: "startup" },
  { id: 81, title: "SaaS pricing layout experiments and CTR results", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(2), workspaceId: "startup" },
  { id: 82, title: "How to automate client assets outline", type: "Video Script", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(3), workspaceId: "startup" },
  { id: 83, title: "The SaaS copywriting rules we live by", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(4), workspaceId: "startup" },
  { id: 84, title: "Why we decoupled content and database operations", type: "LinkedIn Post", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(5), workspaceId: "startup" },
  { id: 85, title: "Tailwind v4 theme setup: Detailed guide", type: "Twitter Thread", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(6), workspaceId: "startup" },
  { id: 86, title: "Startup launch recap: Key milestones met", type: "Newsletter", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(7), workspaceId: "startup" },
  { id: 87, title: "Product demo video script: Content operating system", type: "Video Script", status: "Idea", performance: "Idea", perfValue: 0, date: getDateOffset(8), workspaceId: "startup" },
  { id: 88, title: "How to handle hydration mismatch in client-side React", type: "LinkedIn Post", status: "Published", performance: "19.4K Reach", perfValue: 19400, date: getDateOffset(5), workspaceId: "startup", campaignId: 302 },
  { id: 89, title: "Figma custom styles to tailwind values workflow", type: "Twitter Thread", status: "Published", performance: "11.2K Reach", perfValue: 11200, date: getDateOffset(6), workspaceId: "startup", campaignId: 302 },
  { id: 90, title: "Product digest: 5 features released this week", type: "Newsletter", status: "Published", performance: "9.8K Opens", perfValue: 9800, date: getDateOffset(8), workspaceId: "startup", campaignId: 302 },
  { id: 91, title: "Why we chose Attio CRM over Hubspot", type: "LinkedIn Post", status: "Published", performance: "15.2K Reach", perfValue: 15200, date: getDateOffset(10), workspaceId: "startup", campaignId: 302 },
  { id: 92, title: "How to structure a premium SaaS dashboard layout", type: "LinkedIn Post", status: "Published", performance: "24.1K Reach", perfValue: 24100, date: getDateOffset(12), workspaceId: "startup", campaignId: 302 },
  { id: 93, title: "10 Tailwind CSS utility tricks I use daily", type: "Twitter Thread", status: "Published", performance: "14.2K Reach", perfValue: 14200, date: getDateOffset(14), workspaceId: "startup" },
  { id: 94, title: "How to structure user onboarding in product", type: "Newsletter", status: "Published", performance: "8.9K Opens", perfValue: 8900, date: getDateOffset(15), workspaceId: "startup" },
  { id: 95, title: "Video outline: Decoupled client states", type: "Video Script", status: "Published", performance: "18.3K Views", perfValue: 18300, date: getDateOffset(16), workspaceId: "startup" },
  { id: 96, title: "Saying no to custom enterprise databases", type: "LinkedIn Post", status: "Published", performance: "17.4K Reach", perfValue: 17400, date: getDateOffset(18), workspaceId: "startup" },
  { id: 97, title: "How to build landing pages that sell", type: "Twitter Thread", status: "Published", performance: "9.4K Reach", perfValue: 9400, date: getDateOffset(20), workspaceId: "startup" },
  { id: 98, title: "Newsletter digest: The future of B2B SaaS", type: "Newsletter", status: "Published", performance: "8.1K Opens", perfValue: 8100, date: getDateOffset(22), workspaceId: "startup" },
  { id: 99, title: "Whiteboard script: LocalStorage databases", type: "Video Script", status: "Published", performance: "11.4K Views", perfValue: 11400, date: getDateOffset(24), workspaceId: "startup" }
];
export const MOCK_ACTIVITIES = [
  { text: "LinkedIn post generated from URL", type: "generation", offsetMinutes: 2 },
  { text: "Newsletter exported to draft space", type: "export", offsetMinutes: 5 },
  { text: "Workspace member Alice Smith invited", type: "member", offsetMinutes: 12 },
  { text: "Twitter thread published on X", type: "publish", offsetMinutes: 60 },
  { text: "Analytics report compiled successfully", type: "analytics", offsetMinutes: 120 },
  { text: "SaaS Startup pitch deck transcript uploaded", type: "upload", offsetMinutes: 180 },
  { text: "LinkedIn hooks draft saved to library", type: "save", offsetMinutes: 240 },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  // PERSONAL BRAND campaigns
  {
    id: 101,
    name: "Solopreneur Journey",
    description: "Build in public by sharing the day-to-day lessons, tools, and code secrets.",
    type: "Personal Brand",
    status: "Active",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    workspaceId: "personal",
    members: ["John Doe", "Alice Smith"]
  },
  {
    id: 102,
    name: "Substack Surge",
    description: "Drive newsletter subscribers by repurposing code breakdowns into high-value Twitter threads.",
    type: "Newsletter Growth",
    status: "Completed",
    startDate: "2026-05-01",
    endDate: "2026-05-25",
    workspaceId: "personal",
    members: ["John Doe", "Koby Lee"]
  },

  // GROWTH AGENCY campaigns
  {
    id: 201,
    name: "Q3 Inbound Engine",
    description: "Establish authority and drive lead generation through client case studies and workflows.",
    type: "Agency Growth",
    status: "Active",
    startDate: "2026-06-10",
    endDate: "2026-07-15",
    workspaceId: "agency",
    members: ["John Doe", "Sarah Connor", "Marcus Aurelius"]
  },
  {
    id: 202,
    name: "Design Token Hype",
    description: "Launch the new Figma-to-Code agency package showcasing visual-first UI systems.",
    type: "Product Launch",
    status: "Draft",
    startDate: "2026-06-25",
    endDate: "2026-07-25",
    workspaceId: "agency",
    members: ["John Doe", "Cleopatra Philopator"]
  },

  // SAAS STARTUP campaigns
  {
    id: 301,
    name: "ContentFlow 2.0 Launch",
    description: "Omnichannel launch of the new dashboard, Command Palette, and AI generation tools.",
    type: "SaaS Launch",
    status: "Active",
    startDate: "2026-06-15",
    endDate: "2026-07-10",
    workspaceId: "startup",
    members: ["John Doe", "Elon Musk", "Gwynne Shotwell"]
  },
  {
    id: 302,
    name: "Modern UI Masterclass",
    description: "Founder brand building via in-depth breakdown of Next.js hydration, tailwind config, and custom Recharts components.",
    type: "Personal Brand",
    status: "Completed",
    startDate: "2026-05-10",
    endDate: "2026-06-05",
    workspaceId: "startup",
    members: ["John Doe", "Elon Musk"]
  }
];

