  
**GUARD**

Guided Understanding of AI for Responsible Design

**Product Requirements Document**

Version 1.0  •  Functional Prototype

March 2026

# **Table of Contents**

1\. Product Vision & Overview

2\. Target Users & Personas

3\. Core Interaction Model

4\. Information Architecture

5\. Learning Lab Specifications

6\. UI/UX Design Specifications

7\. Technical Architecture

8\. V1 Scope & Prioritization

9\. Future Considerations

# **1\. Product Vision & Overview**

## **1.1 Problem Statement**

Educators are increasingly expected to integrate AI tools into their teaching practice, yet most lack structured guidance on how to use AI effectively, critically, and responsibly. Current approaches tend toward two extremes: uncritical adoption (using AI outputs without evaluation) or blanket rejection (avoiding AI entirely out of uncertainty). Neither serves students well.

The core challenge is not that educators lack access to AI tools, but that they lack a scaffolded environment where they can develop the metacognitive skills needed to use AI productively—skills like prompt formulation, output evaluation, failure-mode recognition, and iterative refinement.

## **1.2 Product Vision**

GUARD is a web-based learning environment that teaches educators to use AI tools critically and pedagogically through structured, hands-on experimentation. Rather than lecturing about AI, GUARD embeds learning into the act of using AI by placing Socratic scaffolding alongside a live LLM chat interface.

| Core Insight The scaffolding is the product. The LLM chat is commodity infrastructure. GUARD’s value lies in the thinking it provokes before, during, and after each AI interaction—making the invisible cognitive work of effective AI use visible and transferable. |
| :---- |

## **1.3 Design Principles**

* **Transparency over magic:** Users always see how their thinking becomes a prompt. The prompt template is visible, editable, and educational.

* **Socratic over instructional:** The scaffolding asks questions rather than giving answers. It provokes thinking rather than dictating process.

* **Iterative over one-shot:** Each lab supports 2–3 structured refinement cycles, teaching that effective AI use is a conversation, not a single query.

* **Authentic over simulated:** Users interact with a real LLM, not a simulation. Skills transfer directly to their own AI usage.

* **Guided over railroaded:** Scaffolding structures thinking but never prevents users from editing prompts or exploring freely.

## **1.4 Success Metrics**

* Users complete at least one full lab (all iterations) in a single session

* Users modify the generated prompt template before sending (indicating engagement, not passivity)

* Users identify at least one AI failure mode during evaluation phases

* Users report increased confidence in critical AI evaluation (post-session self-report)

# **2\. Target Users & Personas**

## **2.1 Primary Audience**

Lecturers, teachers, and instructional designers across higher education and K–12 who are responsible for designing learning experiences and assessments. The platform assumes no prior AI expertise but rewards it.

## **2.2 Personas**

| Persona | Profile | Needs | GUARD Usage |
| :---- | :---- | :---- | :---- |
| The Curious Novice | Mid-career lecturer, uses AI casually (ChatGPT for quick searches), has not integrated AI into teaching. Feels pressure to “do something with AI.” | Low-stakes environment to experiment. Concrete examples. Clear guidance on what “good” AI use looks like. | Works through labs sequentially. Relies heavily on scaffolding. Rarely edits the prompt template initially. Benefits most from failure-mode highlights. |
| The Skeptical Expert | Experienced educator, deep pedagogical knowledge, skeptical of AI hype. Worries about academic integrity and shallow learning. | Evidence that AI can enhance (not replace) pedagogy. Tools to maintain rigor. Frameworks for responsible integration. | Jumps directly to Assessment or Rubric labs. Edits prompts extensively. Uses evaluation checklists to validate concerns. Appreciates the critical evaluation emphasis. |
| The Enthusiastic Adopter | Early-career instructor, already uses AI tools actively, but without structured critical framework. Tends to accept AI outputs uncritically. | Structured approach to evaluate outputs. Awareness of failure modes. Skills to teach students about AI limitations. | Moves quickly through initial scaffolding. Slows down at evaluation phases. The side-by-side comparison and failure mode highlights are most valuable. |

## **2.3 Usage Context**

Primary: Self-paced, asynchronous, individual use. Educators access GUARD on their own schedule, spending 20–45 minutes per lab session. The platform must work well for interrupted sessions (a teacher might start during a break and finish at home).

Secondary: The platform should also function in facilitated workshop settings where a trainer walks a group through a lab, but this is not the primary design target for V1.

# **3\. Core Interaction Model**

## **3.1 The Split-Panel Layout**

Every lab uses a consistent two-panel layout that spatially separates the pedagogical scaffolding from the AI interaction:

| Left Panel — Scaffolding Layer | Right Panel — LLM Chat |
| :---- | :---- |
| Reflection questions (Socratic voice) | Chat-style interface with the LLM |
| Visible prompt template (mad-libs assembly) | Full conversation history within the session |
| Evaluation tools (checklists, failure modes) | AI responses with copy-to-clipboard on each message |
| Iteration phase indicator | Editable message input field |

The left panel drives the learning. The right panel is the practice space. Together, they make the cognitive work of effective AI use visible.

## **3.2 The Iteration Arc**

Each lab supports 2–3 structured iterations, each with a distinct pedagogical focus. The scaffolding evolves across iterations, becoming progressively more demanding:

| Iteration 1 — “Get Something on the Page” Focus: Intent and clarity. The scaffolding helps the user articulate their pedagogical goal, context, and constraints. Questions are foundational (What are you trying to achieve? Who are your students?). The prompt template assembles from these answers. The evaluation checklist is basic: Does the output match the intent? |
| :---- |

| Iteration 2 — “Look Deeper” Focus: Critical evaluation and failure modes. The scaffolding shifts to probing the AI’s output for problems (What assumptions did the AI make? Where might this be inaccurate? Is this appropriately specific for your students?). AI failure modes are explicitly highlighted. The side-by-side comparison shows how the refined prompt produced different results. |
| :---- |

| Iteration 3 (Optional) — “Make It Yours” Focus: Adaptation and ownership. The scaffolding guides the transition from AI output to usable classroom material (What would you change before using this? What’s missing that only you would know? How would you adapt this for your specific students?). This iteration reinforces that AI is a starting point, not a finished product. |
| :---- |

## **3.3 Phase Flow Within Each Iteration**

Each iteration follows a four-phase sequence. The left panel transitions between these phases based on user actions:

1. Reflect — User answers Socratic scaffolding questions on the left panel. Answers populate the prompt template in real time (mad-libs style).

2. Compose — User reviews and optionally edits the assembled prompt in the template area. A “Send to AI” button bridges left panel to right panel.

3. Generate — The prompt is sent to the LLM. The response appears in the right-panel chat. The left panel transitions to evaluation mode.

4. Evaluate — The left panel displays evaluation tools: targeted reflection questions, a quality checklist, failure-mode highlights, and (from iteration 2 onward) a side-by-side comparison with the previous iteration’s output.

After evaluation, the user can either proceed to the next iteration (which loads new scaffolding questions) or mark the lab as complete.

## **3.4 Prompt Template Mechanics**

The prompt template is the pedagogical centerpiece of GUARD. It serves two functions simultaneously:

* **Functional:** It assembles user input into a well-structured prompt for the LLM.

* **Educational:** It shows users how structured thinking maps to effective prompting.

Implementation details:

* Each lab has a pre-defined template with labeled slots (e.g., \[LEARNING\_OBJECTIVE\], \[STUDENT\_LEVEL\], \[CONSTRAINTS\])

* As users answer scaffolding questions, their responses fill corresponding slots in real time

* Filled slots are visually distinct from empty ones (e.g., highlighted background vs. placeholder text)

* Users can click into any slot to edit directly, or modify the entire template as free text

* A toggle lets users switch between “structured view” (slots visible) and “raw prompt view” (plain text)

# **4\. Information Architecture**

## **4.1 Application Structure**

The application has three levels of navigation:

* **Landing / Home:** Overview of GUARD, lab selection cards, optional login.

* **Lab View:** The split-panel workspace (scaffolding \+ chat). This is where users spend nearly all their time.

* **Settings (minimal):** API key management for BYOK users. Account settings for logged-in users.

## **4.2 Lab Selection (Home Screen)**

The home screen presents three lab cards in a freely explorable layout. There is no required sequence. Each card displays:

* Lab title and icon

* One-sentence description of what the user will accomplish

* Estimated time (20–45 min)

* A brief learning outcome statement (“You’ll learn to...”)

* A “Start Lab” call to action

## **4.3 Lab Inventory (V1)**

| Lab | Description | Core Skill Developed |
| :---- | :---- | :---- |
| Plan a Class Activity | Design a learning activity or lesson segment for a specific topic, audience, and learning objective using AI as a collaborative tool. | Prompt formulation, output evaluation, recognizing generic vs. context-specific outputs |
| Create a Learning Assessment | Develop quiz questions, exam prompts, or formative assessment items with AI assistance while maintaining academic rigor. | Evaluating assessment alignment, detecting AI tendency toward surface-level questions, iterative refinement |
| Design a Rubric | Build a detailed grading rubric for an assignment, with criteria, performance levels, and descriptors generated through AI collaboration. | Specificity in prompting, recognizing vague AI language, adapting outputs for practical use |

# **5\. Learning Lab Specifications**

This section details the full scaffolding content for each lab, including Socratic questions, prompt templates, evaluation tools, and failure-mode highlights for every iteration. All scaffolding questions use a Socratic voice: they provoke thinking rather than dictate answers.

## **5.1 Lab 1: Plan a Class Activity**

### **5.1.1 Iteration 1 — Intent & Context**

**Phase: Reflect**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | What specific topic or concept should this activity help students understand? |
| Q2 | What should students be able to do after completing this activity that they couldn’t do before? |
| Q3 | Who are your students? Consider their level, prior knowledge, and what typically challenges them with this material. |
| Q4 | How much time do you have for this activity, and what constraints should the design respect (class size, available resources, physical space)? |
| Q5 | What kind of engagement are you hoping for—individual thinking, collaborative work, hands-on practice, discussion, or something else? |

**Prompt Template (Mad-Libs Structure):**

| Prompt Template — Activity Planning, Iteration 1 I am a \[ROLE/SUBJECT\] educator teaching \[STUDENT\_LEVEL\] students. I need a class activity about \[TOPIC\] that helps students achieve this learning objective: \[LEARNING\_OBJECTIVE\]. My students typically \[STUDENT\_CONTEXT\]. The activity should fit within \[TIME\_CONSTRAINT\] and work for \[CLASS\_SIZE\] students. I’m looking for an activity that emphasizes \[ENGAGEMENT\_TYPE\]. Please include clear instructions, materials needed, and a brief explanation of how this activity supports the learning objective. |
| :---- |

**Phase: Evaluate**

After the AI responds, the left panel displays:

* **Reflection questions:** “Does this activity actually require students to demonstrate the learning objective you specified, or could they complete it without achieving it?” / “Would this activity work differently than what you currently do—and is that difference an improvement?”

* **Checklist:** □ Aligns with stated learning objective □ Appropriate for specified student level □ Respects time and resource constraints □ Instructions are specific enough to implement □ Includes some form of assessment or check for understanding

* **Failure mode highlight:** “Watch for generic activities. AI often suggests activities that sound engaging but could apply to any topic. Ask yourself: Is this activity specific to your topic, or is it a template with your topic name dropped in?”

### **5.1.2 Iteration 2 — Critical Refinement**

**Phase: Reflect**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | What did the AI assume about your students or context that wasn’t accurate? |
| Q2 | If a student who struggles with this topic attempted this activity, where would they get stuck? Does the activity account for that? |
| Q3 | Is the activity genuinely engaging, or does it just sound engaging? What would students actually experience moment-to-moment? |
| Q4 | What’s missing from this output that only you would know about your specific teaching context? |

**Phase: Evaluate (enhanced)**

* **Side-by-side comparison:** Shows Iteration 1 output alongside Iteration 2 output, with key differences highlighted.

* **Upgraded checklist:** Adds criteria for differentiation, student misconceptions, and transition logistics.

* **Failure mode highlight:** “AI tends toward sycophancy—it may agree with your refinements without meaningfully changing the output. Compare carefully: did the substance actually change, or just the framing?”

### **5.1.3 Iteration 3 (Optional) — Ownership**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | What would you change about this activity before actually using it in your classroom tomorrow? |
| Q2 | What elements of this activity reflect your teaching style and values, and what feels like generic AI output? |
| Q3 | How would you explain this activity’s purpose to a colleague—and does the AI’s version support that explanation? |

## **5.2 Lab 2: Create a Learning Assessment**

### **5.2.1 Iteration 1 — Intent & Alignment**

**Phase: Reflect**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | What specific knowledge or skill should this assessment measure? Try to be precise: what would a successful student demonstrate? |
| Q2 | What level of cognitive demand are you targeting—recall of facts, application to new scenarios, analysis, or evaluation? |
| Q3 | What format fits this assessment purpose: multiple choice, short answer, open-ended response, performance task, or a mix? |
| Q4 | What would a common misconception or error look like on this assessment? Knowing this helps ensure the assessment actually catches misunderstanding. |
| Q5 | Is this formative (to guide learning) or summative (to measure achievement)? How does that affect what you need? |

**Prompt Template (Mad-Libs Structure):**

| Prompt Template — Assessment Creation, Iteration 1 I need to create a \[FORMATIVE/SUMMATIVE\] assessment for \[STUDENT\_LEVEL\] students on the topic of \[TOPIC\]. The assessment should measure students’ ability to \[SPECIFIC\_SKILL/KNOWLEDGE\]. I want the questions to require \[COGNITIVE\_LEVEL\] thinking. A common student misconception in this area is \[MISCONCEPTION\]. Please create \[NUMBER\] \[FORMAT\] questions. For each question, include the correct answer and a brief explanation of what the question tests. |
| :---- |

**Phase: Evaluate**

* **Reflection questions:** “Could a student answer these questions correctly by memorizing, even if they don’t truly understand the concept?” / “Do the distractors (wrong answers) reflect real student thinking, or are they obviously wrong?”

* **Checklist:** □ Questions align with stated skill/knowledge target □ Cognitive level matches intent □ Distractors are plausible □ Questions are free of ambiguity □ Assessment distinguishes understanding from recall

* **Failure mode highlight:** “AI-generated assessments often default to recall-level questions even when asked for higher-order thinking. Check each question: does it truly require the cognitive level you specified?”

### **5.2.2 Iteration 2 — Rigor & Authenticity**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | For each question, ask: could a student find the answer by searching online in 10 seconds? If so, is that the kind of understanding you’re assessing? |
| Q2 | Do the questions test what you actually taught, or what the AI assumes is important about this topic? |
| Q3 | Would these questions reveal the difference between a student who deeply understands and one who superficially knows the material? |
| Q4 | Are there questions that unintentionally test reading comprehension or vocabulary rather than subject knowledge? |

* **Failure mode highlight:** “AI often generates questions that are technically correct but pedagogically shallow. It may also hallucinate plausible-sounding but inaccurate content, especially in specialized fields. Verify factual accuracy for every question.”

### **5.2.3 Iteration 3 (Optional) — Contextualization**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | Which questions would you keep as-is, which need editing, and which would you replace entirely? |
| Q2 | How would you sequence these questions in an actual assessment? Does the AI’s ordering make pedagogical sense? |
| Q3 | What would you add that only someone who knows your students could contribute? |

## **5.3 Lab 3: Design a Rubric**

### **5.3.1 Iteration 1 — Structure & Criteria**

**Phase: Reflect**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | What assignment or task will this rubric evaluate? Describe it as you would to a student. |
| Q2 | What are the most important qualities that distinguish excellent work from poor work on this assignment? |
| Q3 | How many performance levels do you want (e.g., Excellent / Proficient / Developing / Beginning), and what do those levels mean in your context? |
| Q4 | Should the rubric be analytic (separate scores per criterion) or holistic (one overall score)? What serves your feedback goals better? |
| Q5 | What does the most common “good but not great” submission look like? Describing this helps define the middle of your scale. |

| Prompt Template — Rubric Design, Iteration 1 I need a \[ANALYTIC/HOLISTIC\] rubric for the following assignment: \[ASSIGNMENT\_DESCRIPTION\]. The rubric should evaluate these key qualities: \[CRITERIA\_LIST\]. I want \[NUMBER\] performance levels: \[LEVEL\_NAMES\]. A typical “good but not great” submission looks like: \[MIDDLE\_DESCRIPTION\]. For each criterion and level, provide specific, observable descriptors that a student could use to understand exactly what is expected. |
| :---- |

**Phase: Evaluate**

* **Reflection:** “If a student read only this rubric (without other instructions), would they understand what excellent work looks like?” / “Are the distinctions between adjacent performance levels clear and meaningful, or do they blur together?”

* **Checklist:** □ Criteria cover all important dimensions of the assignment □ Descriptors are specific and observable (not vague) □ Performance levels are meaningfully distinct □ Language is student-facing and clear □ Rubric is practical to use during grading

* **Failure mode:** “AI-generated rubrics frequently use vague qualifiers (‘demonstrates understanding,’ ‘shows proficiency’) that don’t help students or graders. Look for descriptors that describe observable behavior, not internal states.”

### **5.3.2 Iteration 2 — Precision & Usability**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | Read each descriptor: could two different graders independently assign the same score using this rubric, or is there too much room for interpretation? |
| Q2 | Are there criteria where the AI used circular language (e.g., “excellent work demonstrates excellence”)? What specific behavior should replace it? |
| Q3 | Would a student in your class understand every descriptor, or does the rubric use language that assumes expertise they don’t have? |
| Q4 | Try mentally grading a past student’s work with this rubric—does it capture what you actually value? |

* **Failure mode:** “AI rubrics tend to create symmetrical descriptors (just substituting adjectives across levels) rather than describing qualitatively different performances. Check whether each level describes a genuinely different kind of work.”

### **5.3.3 Iteration 3 (Optional) — Calibration**

| \# | Reflect — Socratic Scaffolding Questions |
| :---- | :---- |
| Q1 | Which criterion would be hardest to grade consistently? What would make it easier? |
| Q2 | Does this rubric reward what matters most to you, or has the AI subtly shifted the emphasis? |
| Q3 | What instructions or context would you add when sharing this rubric with students? |

# **6\. UI/UX Design Specifications**

## **6.1 Visual Design Language**

GUARD should feel calm, professional, and educational—not like a consumer AI product. The aesthetic should evoke a thoughtful workshop, not a flashy chatbot.

* Color palette: Muted blues and grays with white space. Accent color for interactive elements and phase indicators.

* Typography: Clean sans-serif (e.g., Inter or similar). Clear hierarchy between headings, body text, and UI labels.

* Tone: Warm but substantive. No gamification, badges, or progress bars that feel patronizing.

* Density: The left panel should feel spacious and readable, not like a cramped form. Generous line height and padding.

## **6.2 Split-Panel Layout Details**

| Element | Left Panel (Scaffolding) | Right Panel (Chat) |
| :---- | :---- | :---- |
| Width ratio | Approximately 45% | Approximately 55% |
| Scroll behavior | Independent scroll within each phase section | Standard chat scroll (newest at bottom) |
| Header | Lab title \+ iteration/phase indicator | Model name \+ session indicator |
| Primary interaction | Form inputs, checkboxes, expandable sections | Text input field \+ send button |
| Footer | “Next Phase” / “Next Iteration” button | Copy-to-clipboard on each AI response |

## **6.3 Left Panel Components**

* **Phase indicator:** A subtle horizontal stepper showing Reflect → Compose → Generate → Evaluate. Current phase is highlighted. Provides orientation without dominating the layout.

* **Iteration indicator:** Shows “Iteration 1 of 3” with the focus label (e.g., “Intent & Context”). Helps users understand where they are in the arc.

* **Scaffolding questions:** Each question appears as a card with a text input field. A subtle Socratic “thinking prompt” icon (e.g., a thought bubble) signals the reflective intent. Questions appear sequentially—not all at once—to avoid overwhelm.

* **Prompt template panel:** Appears in the Compose phase. Shows the full template with filled slots highlighted. Includes a toggle for structured vs. raw view. A prominent “Send to AI” button at the bottom.

* **Evaluation panel:** Appears after AI responds. Contains tabs or accordion sections for: Reflection Questions, Quality Checklist, Failure Mode Alerts, and (from iteration 2\) Side-by-Side Comparison.

## **6.4 Right Panel Components**

* **Chat interface:** Standard chat layout with user messages on the right, AI responses on the left. Responses stream in real time.

* **Message actions:** Each AI response has a copy-to-clipboard button. Each user message shows the full prompt that was sent (expanding on click if long).

* **Model indicator:** Small badge showing which model is active (gpt-4.1-mini or gpt-4.1 for BYOK users).

## **6.5 Responsive Behavior**

The split-panel layout is designed for desktop/laptop screens (1024px+). On tablet, the panels stack vertically with the scaffolding above and chat below. On mobile, a tab-based navigation switches between scaffolding and chat views. Mobile is a secondary concern for V1.

## **6.6 Key Interaction Patterns**

* **Mad-libs animation:** When a user finishes answering a scaffolding question, the corresponding slot in the prompt template fills in with a subtle highlight animation. This creates a satisfying visual connection between reflection and prompt construction.

* **Phase transitions:** When moving between phases, the left panel content transitions with a smooth scroll or slide, not an abrupt replacement. The user should never feel disoriented.

* **Evaluation emphasis:** When a failure-mode alert is relevant, it appears with a gentle attention-drawing treatment (accent border, subtle icon)—not an alarming warning. The tone is educational, not punitive.

* **Side-by-side comparison:** In iteration 2+, a comparison view shows previous and current AI outputs in a diff-style layout (additions in green, removals in red), or as two columns with key changes highlighted.

# **7\. Technical Architecture**

## **7.1 Stack Overview**

| Layer | Technology | Rationale |
| :---- | :---- | :---- |
| Framework | Next.js (App Router) with TypeScript | SSR for landing page SEO, client-side rendering for lab interactivity. Consistent with existing project infrastructure. |
| Styling | Tailwind CSS | Utility-first approach for rapid UI development. Consistent with existing GUARD codebase. |
| State Management | Zustand | Lightweight, minimal boilerplate. Well-suited for managing lab state, iteration progress, and chat history. |
| LLM Integration | OpenAI API (server-side route handlers) | gpt-4.1-mini as default model, with gpt-4.1 available for BYOK users. Streaming responses via server-sent events. |
| Authentication (optional) | NextAuth.js or Clerk | Lightweight auth for optional persistence. Must support “guest mode” with full functionality. |
| Hosting | Netlify | Consistent with existing deployment pipeline. |
| Database (optional) | Supabase or PlanetScale | Only needed if login/persistence is implemented. Stores user sessions, saved lab outputs, and API keys (encrypted). |

## **7.2 Key Architecture Decisions**

* **Server-side API calls:** All LLM API calls go through Next.js route handlers. This keeps API keys secure and enables rate limiting. BYOK keys are stored client-side (localStorage or session) and passed to the route handler per request.

* **Session state:** For guest users, all state (lab progress, chat history, iteration data) lives in Zustand stores backed by sessionStorage. Closing the browser loses the session. For logged-in users, state is persisted to the database.

* **Scaffolding data model:** Lab content (questions, templates, checklists, failure modes) is stored as structured JSON/TypeScript config files, not in a database. This makes content easy to author and version-control.

* **Streaming responses:** LLM responses stream token-by-token to the chat panel using server-sent events (SSE). This provides immediate feedback and matches user expectations from consumer AI tools.

## **7.3 Data Model (Simplified)**

Core entities:

* Lab: Contains metadata, iteration definitions, and all scaffolding content

* Iteration: Contains scaffolding questions, prompt template, evaluation tools, and failure modes

* Session: Tracks a user’s progress through a lab (current iteration, phase, answers, chat history)

* ChatMessage: Individual messages in the right panel (role, content, timestamp, iteration number)

## **7.4 API Routes**

* POST /api/chat — Sends prompt to OpenAI, streams response. Accepts model preference and optional BYOK key.

* GET /api/labs — Returns lab metadata for the home screen.

* GET /api/labs/\[id\] — Returns full lab content including all scaffolding.

* POST /api/session (authenticated) — Saves session state for logged-in users.

* GET /api/session/\[id\] (authenticated) — Retrieves saved session.

# **8\. V1 Scope & Prioritization**

## **8.1 V1 Target: Functional Prototype**

V1 is a functional prototype where the core interaction flow works end-to-end. Polish, edge cases, and advanced features are deferred. The goal is to validate the scaffolded learning model with real educators.

## **8.2 In Scope (V1)**

| Feature | Scope | Priority |
| :---- | :---- | :---- |
| 3 Learning Labs | Full scaffolding content for all iterations across Activity Planning, Assessment Creation, and Rubric Design | P0 |
| Split-panel layout | Left scaffolding \+ right chat, desktop-optimized | P0 |
| Mad-libs prompt assembly | Real-time slot filling from scaffolding answers with visual feedback | P0 |
| Editable prompt templates | Users can modify generated prompts before sending | P0 |
| LLM integration | gpt-4.1-mini default with streaming responses | P0 |
| Iteration arc (2–3 cycles) | Phase transitions, evolving scaffolding, iteration indicators | P0 |
| Evaluation tools | Reflection questions, quality checklists, failure-mode alerts | P0 |
| Side-by-side comparison | Diff view for iteration 2+ outputs | P1 |
| BYOK API key support | User enters OpenAI key for gpt-4.1 access | P1 |
| Copy to clipboard | On each AI response message | P1 |
| Guest mode | Full functionality without login | P0 |
| Responsive tablet layout | Stacked panel layout for smaller screens | P2 |

## **8.3 Out of Scope (V1)**

* User accounts and persistent session storage

* Mobile-optimized layout

* Adaptive scaffolding (questions that change based on AI output)

* Export functionality beyond copy-to-clipboard

* Analytics or usage tracking

* Multiple language support

* Facilitator/admin dashboard for workshop settings

* Additional labs beyond the initial three

## **8.4 Implementation Phases**

* **Phase 1 — Foundation (Week 1–2):** Project setup, layout scaffolding, lab data model, one complete lab (Activity Planning) with all iterations.

* **Phase 2 — LLM Integration (Week 2–3):** OpenAI API route, streaming chat, prompt template mechanics, mad-libs assembly.

* **Phase 3 — Evaluation Layer (Week 3–4):** Evaluation panel, checklists, failure mode alerts, side-by-side comparison.

* **Phase 4 — Remaining Labs (Week 4–5):** Assessment and Rubric labs using the same component architecture.

* **Phase 5 — Polish & BYOK (Week 5–6):** BYOK flow, UI refinement, tablet responsiveness, testing with educators.

# **9\. Future Considerations**

## **9.1 Additional Labs**

The lab architecture is designed to be extensible. Future labs could include:

* Generate Feedback on Student Work — scaffolding around tone, specificity, and constructive framing

* Adapt Materials for Different Learner Levels — differentiation and accessibility focus

* Explore a Topic for Lecture Preparation — research scaffolding with source evaluation

* Hallucination Detection Lab — dedicated lab focused on identifying and understanding AI errors

## **9.2 Adaptive Scaffolding**

V2 could introduce scaffolding that responds to the AI’s actual output—for example, detecting when the AI has generated a particularly vague rubric descriptor and surfacing a targeted evaluation question. This requires either heuristic analysis of the AI output or a secondary LLM call to evaluate the primary output.

## **9.3 Multi-Provider LLM Support**

Future versions could support multiple LLM providers (Anthropic Claude, Google Gemini, open-source models) to help educators understand how different models behave differently on the same prompt—a powerful learning experience in itself.

## **9.4 Collaborative Features**

For workshop settings, a facilitator dashboard could allow real-time visibility into participants’ progress, enable shared reflection discussions, and support group debrief after lab completion.

## **9.5 Learning Analytics**

With user accounts, GUARD could track patterns across sessions: How often do users edit the template? Which failure modes do they catch? Do their prompts improve across labs? This data could inform both product improvement and research on AI literacy development.

*End of Document*