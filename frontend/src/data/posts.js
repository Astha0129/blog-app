/**
 * Mock blog posts data — serves as the in-memory database for the frontend.
 * PostContext loads this on init and persists changes to localStorage.
 */

export const CATEGORIES = ['All', 'Technology', 'Design', 'Lifestyle', 'Travel', 'Food'];

export const TAGS_BY_CATEGORY = {
  Technology: ['AI', 'React', 'JavaScript', 'Python', 'Cloud', 'DevOps'],
  Design:     ['UI/UX', 'Figma', 'Typography', 'Color Theory', 'Branding'],
  Lifestyle:  ['Productivity', 'Wellness', 'Mindfulness', 'Finance', 'Books'],
  Travel:     ['Adventure', 'Backpacking', 'Culture', 'Photography', 'Tips'],
  Food:       ['Recipes', 'Vegan', 'Baking', 'Street Food', 'Nutrition'],
};

const SAMPLE_USERS = [
  { id: 'u1', name: 'Aria Chen',    avatar: 'AC', bio: 'Full-stack developer & tech writer.' },
  { id: 'u2', name: 'Marcus Webb',  avatar: 'MW', bio: 'UX designer and design systems enthusiast.' },
  { id: 'u3', name: 'Priya Mehta',  avatar: 'PM', bio: 'Travel blogger, wanderer, storyteller.' },
  { id: 'u4', name: 'Leo Fontaine', avatar: 'LF', bio: 'Chef and food content creator.' },
  { id: 'u5', name: 'Sasha Kumar',  avatar: 'SK', bio: 'Wellness coach and productivity nerd.' },
];

const posts = [
  {
    id: '1',
    title: 'The Future of AI in Web Development: What Every Developer Should Know',
    excerpt:
      'Artificial intelligence is no longer just a buzzword — it is fundamentally reshaping how we build, deploy, and maintain web applications. From intelligent code completion to automated testing.',
    content: `Artificial intelligence is no longer just a buzzword — it is fundamentally reshaping how we build, deploy, and maintain web applications. From intelligent code completion to automated testing, AI is becoming an indispensable partner for modern developers.

## The Rise of AI-Assisted Coding

Tools like GitHub Copilot, Cursor, and Tabnine have demonstrated that AI can dramatically accelerate development workflows. Developers report up to 55% faster task completion when using AI pair programmers. But this is just the beginning.

## Key Areas Being Transformed

**1. Code Generation**
Large language models can now write entire components, API handlers, and even database schemas from natural language descriptions. The quality has reached a point where the generated code is production-ready in many cases.

**2. Automated Testing**
AI tools can analyze your codebase and automatically generate comprehensive test suites, identifying edge cases that human developers might miss.

**3. Bug Detection and Security**
Static analysis powered by AI can catch vulnerabilities, logic errors, and performance issues before they reach production. Tools like Snyk and CodeClimate are integrating LLMs to provide deeper insights.

**4. Design-to-Code**
Vision models can convert Figma designs into clean, responsive React components with remarkable accuracy, collapsing the gap between designers and developers.

## Preparing for an AI-First Future

The developers who will thrive are not those who resist these tools, but those who learn to collaborate with them effectively. Understanding prompt engineering, knowing when to trust AI output, and maintaining strong fundamentals will be critical skills.

## Conclusion

AI in web development is not about replacing developers — it is about amplifying human creativity and productivity. Embrace these tools, stay curious, and remember that the best code is the code that solves real problems elegantly.`,
    author: SAMPLE_USERS[0],
    category: 'Technology',
    tags: ['AI', 'React', 'JavaScript'],
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    createdAt: '2025-01-15T09:30:00Z',
    updatedAt: '2025-01-15T09:30:00Z',
    likes: 142,
    likedBy: [],
    comments: [
      {
        id: 'c1',
        author: 'Jordan K.',
        avatar: 'JK',
        text: 'Great write-up! The section on design-to-code conversion is particularly exciting.',
        createdAt: '2025-01-16T11:00:00Z',
      },
      {
        id: 'c2',
        author: 'Sana Ali',
        avatar: 'SA',
        text: 'I\'ve been using Copilot for 6 months and honestly can\'t imagine going back. Excellent summary.',
        createdAt: '2025-01-17T14:22:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Design Systems That Scale: Building for Teams of 10 to 10,000',
    excerpt:
      'A design system is more than a component library — it is a shared language between designers and developers. Here\'s how to build one that genuinely scales with your organization.',
    content: `A design system is more than a component library — it is a shared language between designers and developers. It is the difference between an organization that ships consistent, accessible products and one that ships visual chaos.

## Why Most Design Systems Fail

Most design systems fail not because of technical shortcomings, but because of adoption issues. A system no one uses is worse than no system at all — it creates a false sense of coverage.

## The Three Pillars of a Scalable Design System

### 1. Tokens First
Design tokens are the atomic units of your system: colors, spacing, typography, shadows, and motion. Define these first as platform-agnostic JSON and generate platform-specific outputs (CSS custom properties, Swift constants, Android XML).

\`\`\`json
{
  "color": {
    "primary": { "value": "#6366f1" },
    "primary-dark": { "value": "#4f46e5" }
  },
  "spacing": {
    "sm": { "value": "0.5rem" },
    "md": { "value": "1rem" }
  }
}
\`\`\`

### 2. Component API Design
Each component should be useful immediately (good defaults), powerful eventually (composable props), and impossible to misuse (typed interfaces). Document the why, not just the what.

### 3. Governance and Contribution
A design system without a governance model will drift. Establish clear ownership, a contribution process (with RFC templates for major changes), and versioning. Treat it like a product, not a project.

## Measuring Success

Track: adoption rate across teams, time-to-first-prototype, accessibility audit pass rate, and designer/developer satisfaction scores. A quarterly review process keeps the system healthy.

## Conclusion

The best design systems are invisible — they let teams move fast with confidence, knowing that every component is accessible, consistent, and production-ready.`,
    author: SAMPLE_USERS[1],
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Branding'],
    emoji: '🎨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    createdAt: '2025-01-22T10:15:00Z',
    updatedAt: '2025-01-23T08:00:00Z',
    likes: 89,
    likedBy: [],
    comments: [
      {
        id: 'c3',
        author: 'Mei Lin',
        avatar: 'ML',
        text: 'The governance section is gold. So many systems die because nobody owns them.',
        createdAt: '2025-01-23T09:00:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Backpacking Southeast Asia on $35 a Day: A Practical Guide',
    excerpt:
      'After three months traveling through Vietnam, Cambodia, Thailand, and Indonesia, I broke down exactly what it costs and how to make every dollar count without sacrificing experience.',
    content: `After three months traveling through Vietnam, Cambodia, Thailand, and Indonesia, I broke down exactly what it costs and how to make every dollar count without sacrificing experience. This is not a guide to suffering — it is a guide to smart spending.

## The $35 Breakdown

**Accommodation: $8–12/night**
Hostels remain your best friend for meeting people and keeping costs low. In Hanoi and Chiang Mai, you can find excellent 4-bed dorms for $6/night. Splurge occasionally — a $25 beachfront bungalow in Koh Rong is worth every cent.

**Food: $8–12/day**
Street food is not just cheap — it is the best food you will eat. A bánh mì in Ho Chi Minh City costs $1. A bowl of pad see ew from a Bangkok night market is $1.50. Restaurant meals at local spots run $3–5. Save your restaurant budget for special occasions.

**Transport: $5–8/day**
Overnight buses and trains are your secret weapon — they double as accommodation. The Hanoi–Hoi An sleeper bus ($18) is an experience in itself. Within cities, grab bikes for $2–3/day.

**Activities: $5–8/day**
Temples, waterfalls, beaches — many cost nothing or next to nothing. Budget for one or two big splurges per country: Halong Bay, Angkor Wat sunrise, Elephant Nature Park.

## Pro Tips

1. **Cook once a week** — most hostels have kitchens. Markets are incredibly cheap.
2. **Travel overnight whenever possible** — save a night's accommodation.
3. **Slow down** — the longer you stay somewhere, the cheaper it gets.
4. **Avoid tourist traps** — if there's a menu in English with photos, the prices are 3x.
5. **Use local SIM cards** — $10 for 30 days of 4G is standard across the region.

## The Real Cost: Time and Presence

Money is the easiest part of budget travel. The harder work is being present, staying curious, and resisting the urge to rush from highlight to highlight.`,
    author: SAMPLE_USERS[2],
    category: 'Travel',
    tags: ['Backpacking', 'Adventure', 'Tips'],
    emoji: '✈️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    createdAt: '2025-02-01T07:00:00Z',
    updatedAt: '2025-02-01T07:00:00Z',
    likes: 215,
    likedBy: [],
    comments: [
      {
        id: 'c4',
        author: 'Tom R.',
        avatar: 'TR',
        text: 'Just bookmarked this. Planning my trip in April. The overnight bus tip is genius!',
        createdAt: '2025-02-02T10:00:00Z',
      },
      {
        id: 'c5',
        author: 'Lena P.',
        avatar: 'LP',
        text: '$35/day sounds tight but honestly very doable based on my experience in Thailand.',
        createdAt: '2025-02-03T15:30:00Z',
      },
    ],
  },
  {
    id: '4',
    title: 'The Perfect Sourdough: A Beginner\'s Journey from Starter to Loaf',
    excerpt:
      'I failed 11 times before my first successful sourdough loaf. Here\'s everything I learned about fermentation, hydration, and the magical science of wild yeast.',
    content: `I failed 11 times before my first successful sourdough loaf. Here's everything I learned about fermentation, hydration, and the magical science of wild yeast.

## Starting Your Starter

A sourdough starter is just flour and water — plus time and patience. Mix 50g whole wheat flour with 50g lukewarm water. Leave it at room temperature. Feed it daily. In 5–7 days, you'll have a living, bubbling culture ready to leaven bread.

Signs your starter is ready:
- Doubles in size within 4–8 hours of feeding
- Smells pleasantly sour (like yogurt, not nail polish)
- Passes the float test: drop a teaspoon in water — it should float

## The Recipe (75% Hydration)

**Ingredients:**
- 450g bread flour
- 50g whole wheat flour  
- 375g water (75% hydration)
- 100g active starter (100% hydration)
- 10g salt

**The Process:**

**1. Autolyse (30–60 min)**
Mix flour and 350g of water until no dry flour remains. Rest. This develops gluten without kneading.

**2. Add Starter and Salt**
Squish in the starter, then the salt dissolved in remaining 25g water.

**3. Stretch and Fold (4 hours)**
Every 30 minutes for 2–3 hours, perform 4 sets of stretch and folds. The dough will transform from shaggy to silky.

**4. Bulk Fermentation (4–8 hours)**
Leave at room temperature until the dough grows 50–75% and looks bubbly.

**5. Shape and Cold Proof (8–16 hours)**
Shape gently, place in a floured banneton, cover and refrigerate overnight.

**6. Score and Bake**
Preheat your Dutch oven to 500°F / 260°C for 45 minutes. Score the cold dough, bake covered for 20 minutes, then uncovered for 20 more.

## Why It's Worth It

There's something deeply satisfying about creating bread from nothing but flour, water, and wild microorganisms that exist in the air around you. Every loaf teaches you something new.`,
    author: SAMPLE_USERS[3],
    category: 'Food',
    tags: ['Baking', 'Recipes'],
    emoji: '🍞',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    createdAt: '2025-02-10T08:00:00Z',
    updatedAt: '2025-02-10T08:00:00Z',
    likes: 178,
    likedBy: [],
    comments: [],
  },
  {
    id: '5',
    title: 'Deep Work in the Age of Distraction: Reclaiming Your Focus',
    excerpt:
      'Cal Newport\'s concept of deep work has never been more relevant. As notifications compete for our attention, the ability to focus without distraction has become a superpower — and a rare one.',
    content: `Cal Newport's concept of deep work has never been more relevant. As notifications compete for our attention, the ability to focus without distraction has become a superpower — and a rare one.

## What Is Deep Work?

Newport defines deep work as "professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit." The opposite — shallow work — is what most of us spend most of our day doing.

## Why Focus Is Hard Now

The attention economy is designed to fragment your focus. Social media platforms, messaging apps, and email are engineered to create compulsive checking behaviors. The average knowledge worker switches tasks every 3 minutes. Context switching costs are enormous.

## Building a Deep Work Practice

### 1. Time Blocking
Schedule specific blocks for deep work — typically 90–180 minutes. Treat these like meetings you can't cancel. Start with one block per day.

### 2. Digital Minimalism
Do a 30-day digital declutter. Remove apps that fragment attention. Check email at set times rather than continuously. Use website blockers during deep work sessions.

### 3. Embrace Boredom
Resist the urge to reach for your phone whenever you feel bored. Boredom is where your best ideas live. Train your mind to tolerate open time.

### 4. Ritualize the Work
A ritual reduces the friction to starting. Mine: black coffee, noise-cancelling headphones, close all tabs except the one I need, set a Pomodoro timer.

### 5. Measure the Hours
Keep a simple log of deep work hours each week. The act of measurement creates accountability. Newport logs his hours in a dedicated notebook.

## My Results After 90 Days

After committing to this practice, my output quality improved dramatically. I shipped a side project that had been stalled for 8 months. My writing improved. Most surprisingly: I felt less tired at the end of the day, despite working harder.

## The Compounding Effect

Focus, like most skills, compounds. Each session of deep work makes the next one easier. The ROI on building this habit is asymmetric — the upside is enormous.`,
    author: SAMPLE_USERS[4],
    category: 'Lifestyle',
    tags: ['Productivity', 'Mindfulness', 'Books'],
    emoji: '🧘',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    createdAt: '2025-02-18T11:00:00Z',
    updatedAt: '2025-02-19T09:00:00Z',
    likes: 304,
    likedBy: [],
    comments: [
      {
        id: 'c6',
        author: 'Reza M.',
        avatar: 'RM',
        text: 'The time blocking tip changed my life. Seriously. I get more done in 3 hours of deep work than in a full shallow day.',
        createdAt: '2025-02-20T08:00:00Z',
      },
    ],
  },
  {
    id: '6',
    title: 'Building Real-Time Features with React and WebSockets',
    excerpt:
      'Real-time functionality — live chat, collaborative editing, live notifications — used to require complex infrastructure. Today, with React hooks and the WebSocket API, it\'s surprisingly approachable.',
    content: `Real-time functionality — live chat, collaborative editing, live notifications — used to require complex infrastructure. Today, with React hooks and the WebSocket API, it's surprisingly approachable.

## The WebSocket Protocol

Unlike HTTP, WebSocket provides full-duplex communication over a single persistent connection. Once established, data can flow in both directions without the overhead of repeated HTTP requests.

## A Custom useWebSocket Hook

\`\`\`javascript
import { useEffect, useRef, useState, useCallback } from 'react';

function useWebSocket(url) {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setStatus('connected');
    ws.current.onclose = () => setStatus('disconnected');
    ws.current.onmessage = (e) => {
      setMessages(prev => [...prev, JSON.parse(e.data)]);
    };

    return () => ws.current?.close();
  }, [url]);

  const sendMessage = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  return { messages, sendMessage, status };
}
\`\`\`

## Live Chat Component

With the hook above, building a live chat is straightforward:

\`\`\`jsx
function LiveChat({ roomId }) {
  const { messages, sendMessage, status } = useWebSocket(
    \`ws://localhost:8080/rooms/\${roomId}\`
  );
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ type: 'message', text: input });
    setInput('');
  };

  return (
    <div className="chat">
      <div className="status">{status}</div>
      <div className="messages">
        {messages.map((m, i) => <div key={i}>{m.text}</div>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
\`\`\`

## Production Considerations

- Use Socket.io for automatic reconnection and fallback support
- Implement heartbeat/ping-pong to detect stale connections
- Authenticate WebSocket connections using tokens in the handshake
- Consider message queuing for offline clients

Real-time features elevate user experience significantly. Start simple, measure the impact, and iterate.`,
    author: SAMPLE_USERS[0],
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Cloud'],
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-01T10:00:00Z',
    likes: 97,
    likedBy: [],
    comments: [],
  },
  {
    id: '7',
    title: 'Typography Secrets: Why Your Fonts Are Killing Your Design',
    excerpt:
      'Typography accounts for 95% of web design, yet it\'s the most neglected craft. Master these principles and your designs will improve overnight.',
    content: `Typography accounts for 95% of web design, yet it's the most neglected craft. Master these principles and your designs will improve overnight.

## The Type Scale

Never choose font sizes arbitrarily. Use a modular scale — a sequence of sizes related by a consistent ratio. The most harmonious ratios: 1.25 (Major Third), 1.333 (Perfect Fourth), 1.5 (Perfect Fifth).

A Perfect Fourth scale starting from 16px:
- xs: 10px
- sm: 13px
- base: 16px
- md: 21px
- lg: 28px
- xl: 37px
- 2xl: 50px

## The Rule of Two

Use no more than two typefaces per project. One for headings (often a serif or display font with personality), one for body (always an optimized sans-serif). Every additional font adds cognitive noise.

Great pairings:
- Playfair Display + Inter
- Fraunces + DM Sans
- Editorial New + Söhne


## Line Length: The 65-Character Rule

The optimal line length for reading is 50–75 characters. Too short causes eye fatigue from constant line breaks. Too long loses the reader's place when returning to the start of each line.

In CSS, you can achieve this by setting:

max-width: 65ch;

on your body text container.

## Line Height: Space to Breathe

Body text needs generous line height: 1.5–1.75 for small text, 1.25–1.4 for large headings. A common mistake is applying uniform line height across all sizes.

## The Importance of Optical Adjustments

At large sizes, letters need to be loosened (letter-spacing: -0.02em to -0.04em on headings). At small sizes, they often need to be tightened. Your type scale should account for this.

## Hierarchy Through Contrast

Strong typographic hierarchy uses contrast of size, weight, and color — not all three simultaneously. Pick two. The third you hold in reserve creates even more impact when deployed sparingly.

Typography is the silent ambassador of your brand. Invest the time to get it right.`,
    author: SAMPLE_USERS[1],
    category: 'Design',
    tags: ['Typography', 'UI/UX', 'Color Theory'],
    emoji: '✏️',
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    createdAt: '2025-03-10T14:00:00Z',
    updatedAt: '2025-03-10T14:00:00Z',
    likes: 156,
    likedBy: [],
    comments: [
      {
        id: 'c7',
        author: 'Dana W.',
        avatar: 'DW',
        text: 'The 65-character rule alone is worth a bookmark. Applied it to my portfolio and the difference is night and day.',
        createdAt: '2025-03-11T10:00:00Z',
      },
    ],
  },
  {
    id: '8',
    title: 'Kyoto in Cherry Blossom Season: What Nobody Tells You',
    excerpt:
      'Every travel blog shows the same perfect sakura photos. Here\'s what Kyoto during hanami is actually like — crowds, planning tips, and the hidden gems that make it unforgettable.',
    content: `Every travel blog shows the same perfect sakura photos. Here's what Kyoto during hanami is actually like — crowds, planning tips, and the hidden gems that make it unforgettable.

## The Reality of Peak Season

Kyoto in late March to early April draws millions of visitors. The famous spots — Maruyama Park, Philosopher's Path, Arashiyama — will be shoulder-to-shoulder by 9am. Expect queues, sold-out accommodations (book 6 months in advance), and restaurant waits of 2+ hours.

This is not a reason to skip it. It's a reason to be strategic.

## The Secret Schedule

**Arrive before 6am** at popular spots. The light is perfect for photography. The crowds have not yet descended. You'll have 90 minutes of near-magical solitude before the rush begins.

**Avoid popular areas at peak hours (10am–4pm).** Use this time for temples that are always less crowded: Fushimi Inari (go at dusk), Daitoku-ji complex, Kurama village.

## The Hidden Gems

- **Hirano Shrine**: 400 cherry trees, almost entirely locals. No tour buses.
- **Ninna-ji**: The weeping cherries here bloom a full week later than everywhere else.
- **Kiyomizu-dera at night**: The light-up events (yozakura) are transcendent. Get tickets online.
- **Canal along Oike-dori**: Less famous than Philosopher's Path, equally beautiful.

## Practical Notes

- Stay in Fushimi district (south Kyoto): 25 min to center, half the price.
- Rent a bicycle — it's the best way to move around.
- Book a 6am tour of Arashiyama bamboo grove before it opens to the public.
- The sakura forecast (blooming dates) is released in February — monitor it closely.

## Why It's Still Worth It

Despite all of this, seeing Japan in sakura season is one of the most beautiful experiences available to a human being on this planet. The Japanese relationship with impermanence (mono no aware) gives hanami a depth that photographs cannot capture.`,
    author: SAMPLE_USERS[2],
    category: 'Travel',
    tags: ['Culture', 'Photography', 'Tips'],
    emoji: '🌸',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    createdAt: '2025-03-20T08:00:00Z',
    updatedAt: '2025-03-21T07:00:00Z',
    likes: 289,
    likedBy: [],
    comments: [],
  },
  {
    id: '9',
    title: 'Fermented Foods for Gut Health: Beyond the Hype',
    excerpt:
      'Kombucha, kimchi, kefir — fermented foods have gone from fringe health food to mainstream. But what does the science actually say? And how do you incorporate them sustainably?',
    content: `Kombucha, kimchi, kefir — fermented foods have gone from fringe health food to mainstream. But what does the science actually say? And how do you incorporate them sustainably?

## The Science of Fermentation

Fermentation is a metabolic process in which microorganisms (bacteria, yeast, fungi) convert carbohydrates into alcohol, organic acids, or gases. This process has preserved food for thousands of years — and it turns out, also creates remarkable nutritional benefits.

## What the Research Shows

A landmark 2021 Stanford study found that a diet high in fermented foods increased microbiome diversity and decreased markers of inflammation significantly more than a high-fiber diet alone. The gut microbiome — containing ~38 trillion microorganisms — influences immune function, mental health, and even metabolism.

Key findings:
- Fermented foods increase species diversity
- The effect is dose-dependent (more is better, within reason)
- Benefits appear within 4–6 weeks
- The effect diminishes if you stop consuming them

## The Best Fermented Foods

**Kimchi** — The Korean fermented cabbage (and vegetable) powerhouse. Rich in Lactobacillus bacteria. Make it at home for maximum probiotic content (store-bought is often pasteurized).

**Kefir** — Fermented milk with up to 30 different microbial strains. The research behind kefir is some of the strongest in fermented foods science.

**Tempeh** — Fermented soybeans from Indonesia. A complete protein with excellent bioavailability. The fermentation reduces antinutrients present in raw soy.

**Miso** — Japanese fermented soybean paste. Rich in umami and gut-friendly bacteria. Add after cooking to preserve probiotics.

**Kvass** — Fermented rye bread drink popular in Eastern Europe. Surprisingly nutritious and easy to make at home.

## Getting Started

Start with one serving per day. Introduce slowly — a sudden increase in fermented foods can cause temporary bloating as your microbiome adjusts. After 2 weeks, increase to 2–3 servings.

The goal is variety and consistency, not quantity of any single food.`,
    author: SAMPLE_USERS[3],
    category: 'Food',
    tags: ['Nutrition', 'Vegan', 'Recipes'],
    emoji: '🥗',
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    createdAt: '2025-04-01T09:00:00Z',
    updatedAt: '2025-04-01T09:00:00Z',
    likes: 134,
    likedBy: [],
    comments: [],
  },
  {
    id: '10',
    title: 'The One-Page Financial System That Changed My Life',
    excerpt:
      'After years of complex budgeting spreadsheets and failed tracking apps, I built a single-page system that has worked consistently for 3 years. Here\'s exactly how it works.',
    content: `After years of complex budgeting spreadsheets and failed tracking apps, I built a single-page system that has worked consistently for 3 years. Here's exactly how it works.

## Why Simple Systems Win

The most sophisticated system you won't use is worse than the simplest system you will. Most financial systems fail because they demand too much cognitive overhead. The solution is radical simplicity.

## The One-Page System

**The structure is three numbers:**

1. **Monthly take-home income** — what hits your bank after taxes
2. **Fixed costs total** — rent, utilities, subscriptions, minimum payments
3. **What's left** — the only number you actively manage

From "what's left," you apply a simple split:
- **50% to savings/investments** (automate this immediately after payday)
- **50% to everything else** (food, clothing, entertainment, variable expenses)

That's it.

## Why It Works

**Automation removes willpower from the equation.** Your savings move automatically before you can spend them. The remaining money is guilt-free — you've already done the responsible thing.

**No category tracking.** Tracking every expense by category is exhausting and unsustainable for most people. Instead, you track one number: how much of your "everything else" budget remains.

**The system scales.** As income grows, increase your savings percentage first. Lifestyle inflation is the enemy of wealth building.

## The One Exception

Keep a separate emergency fund of 3–6 months of expenses in a high-yield savings account. This is not part of the system — it is the foundation the system sits on. Build this first.

## Tools

- Bank account with automatic transfers (set on payday)
- One shared spreadsheet or notes app for the three numbers
- Monthly 15-minute review (the only required maintenance)

Financial security isn't about restriction. It's about having a system that runs quietly in the background while you focus on living.`,
    author: SAMPLE_USERS[4],
    category: 'Lifestyle',
    tags: ['Finance', 'Productivity'],
    emoji: '💰',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    createdAt: '2025-04-10T11:00:00Z',
    updatedAt: '2025-04-10T11:00:00Z',
    likes: 412,
    likedBy: [],
    comments: [
      {
        id: 'c8',
        author: 'James T.',
        avatar: 'JT',
        text: 'The "no category tracking" point is exactly why every other system I\'ve tried has failed. Trying this immediately.',
        createdAt: '2025-04-11T09:00:00Z',
      },
    ],
  },
  {
    id: '11',
    title: 'Python for Data Scientists: The 20% That Covers 80% of Use Cases',
    excerpt:
      'You don\'t need to master all of Python to be effective with data. This guide covers the essential 20% of the language and its ecosystem that handles 80% of real data science work.',
    content: `You don't need to master all of Python to be effective with data. This guide covers the essential 20% of the language and its ecosystem that handles 80% of real data science work.

## The Core Language Features You Actually Need

**List comprehensions** replace most loops and are dramatically more readable:
\`\`\`python
squares = [x**2 for x in range(10) if x % 2 == 0]
\`\`\`

**Dictionary and set operations** — know these cold:
\`\`\`python
word_counts = {word: text.count(word) for word in unique_words}
\`\`\`

**f-strings** for all string formatting:
\`\`\`python
print(f"Accuracy: {accuracy:.2%} | F1: {f1:.4f}")
\`\`\`

**Context managers** for file operations — always use them:
\`\`\`python
with open('data.csv', 'r') as f:
    data = f.read()
\`\`\`

## The Essential Libraries

**NumPy** — The foundation. Master array operations, broadcasting, and vectorization. If you're writing a Python for-loop over array elements, you're probably doing it wrong.

**Pandas** — 80% of your data work will be DataFrame manipulation. Master: read_csv, groupby, merge, pivot_table, apply, and the query interface.

**Matplotlib + Seaborn** — Matplotlib for control, Seaborn for quick beautiful plots. Know how to create: line plots, scatter plots, histograms, heatmaps, and box plots.

**Scikit-learn** — The unified interface is brilliant. Learn the fit/predict/transform pattern and you can use any estimator. Focus on: preprocessing, model selection, and the Pipeline API.

## The Mindset Shift

The biggest obstacle for new data scientists is not knowing Python — it's thinking like a data scientist. That means:
- Starting with the question, not the data
- Visualizing before modeling
- Validating assumptions constantly
- Communicating uncertainty, not just results

The code is a means to an end. The insight is the product.`,
    author: SAMPLE_USERS[0],
    category: 'Technology',
    tags: ['Python', 'AI', 'DevOps'],
    emoji: '🐍',
    gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
    createdAt: '2025-04-20T10:00:00Z',
    updatedAt: '2025-04-20T10:00:00Z',
    likes: 223,
    likedBy: [],
    comments: [],
  },
  {
    id: '12',
    title: 'Solo Travel at 50: Why the Best Adventures Come Late',
    excerpt:
      'I took my first solo international trip at 52. It was the most transformative experience of my adult life. Here\'s what I wish someone had told me — and why it\'s never too late to start.',
    content: `I took my first solo international trip at 52. It was the most transformative experience of my adult life. Here's what I wish someone had told me — and why it's never too late to start.

## The Fear Was the Point

For twenty years, I told myself I was "not a traveler." Too introverted. Too set in my routines. Too old to start. What I discovered is that all of those things were true — and none of them were obstacles.

Solo travel does not erase introversion. It teaches you to manage it. It does not remove you from your routines permanently. It shows you which of your routines are worth keeping.

## What Changed

**Navigation uncertainty** — I got lost in Lisbon on my first day. I mean properly lost, no data signal, no map. I had to ask for help. The woman at the bakery who rescued me also recommended the best pastéis de nata I've ever eaten. The lost was the gift.

**Meals alone** — I expected this to be the hardest part. Instead, eating alone at a restaurant with a book or a journal became the part I looked forward to most. You notice everything differently when you're not performing for anyone.

**Decision fatigue disappears** — When you travel with others, every decision is negotiated. Solo travel gives you back the radical freedom of going exactly where you want, when you want.

## Practical Advice for Later-Life Solo Travel

1. **Start domestic** — A solo long weekend in an unfamiliar city teaches you everything you need before going international.
2. **Choose walkable cities** — Lisbon, Bologna, Porto, Kyoto, Edinburgh. You'll see more and spend less.
3. **Stay in small boutique hotels or good hostels** — Hostels now have excellent private rooms and a built-in community for those who want it.
4. **Travel insurance is non-negotiable** — At any age, but especially past 50.
5. **Join group activities** — Day tours, cooking classes, walking tours. They solve the social problem elegantly.

## The Real Question

The real question is never "Am I too old?" It's "What am I waiting for?" Every year I didn't go was a year I can't get back.`,
    author: SAMPLE_USERS[2],
    category: 'Travel',
    tags: ['Adventure', 'Culture', 'Photography'],
    emoji: '🌍',
    gradient: 'linear-gradient(135deg, #f8b500 0%, #e8472e 100%)',
    createdAt: '2025-05-01T09:00:00Z',
    updatedAt: '2025-05-01T09:00:00Z',
    likes: 367,
    likedBy: [],
    comments: [
      {
        id: 'c9',
        author: 'Carol M.',
        avatar: 'CM',
        text: 'As someone planning their first solo trip at 48, this is exactly what I needed to read today. Thank you.',
        createdAt: '2025-05-02T11:00:00Z',
      },
    ],
  },
];

export default posts;
