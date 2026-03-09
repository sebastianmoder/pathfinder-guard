import type { LabConfig } from '@/lib/types';

export const activityPlanningLab: LabConfig = {
  meta: {
    id: 'activity-planning',
    title: 'Plan a Class Activity',
    description:
      'Design a learning activity or lesson segment for a specific topic, audience, and learning objective using AI as a collaborative tool.',
    estimatedTime: '20-30 min',
    learningOutcome:
      "You'll learn to formulate effective prompts, evaluate AI outputs, and recognize generic vs. context-specific suggestions.",
    coreSkill:
      'Prompt formulation, output evaluation, recognizing generic vs. context-specific outputs',
    icon: 'activity',
  },
  iterations: [
    // ========================================
    // ITERATION 1 — Intent & Context
    // ========================================
    {
      iterationNumber: 1,
      title: 'Intent & Context',
      focus: 'Articulate your pedagogical goal, context, and constraints.',
      isOptional: false,
      scaffoldingQuestions: [
        {
          id: 'q1',
          question:
            'What subject or discipline do you teach?',
          placeholder:
            'e.g., Biology, World History, Introduction to Psychology...',
          templateSlot: 'ROLE_SUBJECT',
          inputType: 'text',
        },
        {
          id: 'q2',
          question:
            'What specific topic or concept should this activity help students understand?',
          placeholder:
            'e.g., Photosynthesis, The French Revolution, Linear Algebra...',
          templateSlot: 'TOPIC',
          inputType: 'textarea',
        },
        {
          id: 'q3',
          question:
            'What should students be able to do after completing this activity that they couldn\'t do before?',
          placeholder:
            'e.g., Explain the process of cellular respiration, Compare two historical perspectives...',
          templateSlot: 'LEARNING_OBJECTIVE',
          inputType: 'textarea',
        },
        {
          id: 'q4',
          question:
            'Who are your students? Consider their level, prior knowledge, and what typically challenges them with this material.',
          placeholder:
            'e.g., Second-year undergraduates with basic chemistry knowledge who struggle with...',
          templateSlot: 'STUDENT_CONTEXT',
          inputType: 'textarea',
        },
        {
          id: 'q5',
          question:
            'How much time do you have for this activity, and what constraints should the design respect (class size, available resources, physical space)?',
          placeholder:
            'e.g., 50-minute lecture, 30 students, standard classroom with projector...',
          templateSlot: 'TIME_CONSTRAINT',
          inputType: 'textarea',
        },
        {
          id: 'q6',
          question:
            'What kind of engagement are you hoping for — individual thinking, collaborative work, hands-on practice, discussion, or something else?',
          placeholder:
            'e.g., Small group discussion followed by whole-class debrief...',
          templateSlot: 'ENGAGEMENT_TYPE',
          inputType: 'textarea',
        },
      ],
      promptTemplate: {
        templateText:
          'You are an experienced educational consultant specializing in pedagogical design and instructional methods. Your task is to create a well-structured, pedagogically sound classroom activity tailored to a specific educational context.\n\nI am a [ROLE_SUBJECT] educator. I need a class activity about [TOPIC] that helps students achieve this learning objective: [LEARNING_OBJECTIVE].\n\nAbout my students: [STUDENT_CONTEXT].\n\nThe activity should fit within these constraints: [TIME_CONSTRAINT]. I\'m looking for an activity that emphasizes [ENGAGEMENT_TYPE].\n\nWrite out what students need to know, understand, or be able to do. Identify the specific cognitive level using Bloom\'s taxonomy (remember, understand, apply, analyze, evaluate, create) by emphasizing the action verbs in the objective. Specify the type of learning involved (conceptual, procedural, metacognitive, factual).\n\nList out each specific student characteristic mentioned (age, prior knowledge, learning needs, class size, etc.). For each characteristic, write out how it should influence your activity design and what specific adaptations are needed. Be concrete and detailed.\n\nGiven the engagement type requested, brainstorm 2-3 specific pedagogical strategies or activity frameworks that could work well. For each approach, write out a brief sketch of how the activity would unfold, note the strengths and limitations, then select the most appropriate one and write out your justification for choosing it.\n\nAfter completing your planning, provide a comprehensive activity plan with the following components. Use clear markdown formatting with section headers for easy readability.\n\nBegin your work by developing your pedagogical planning, then create the complete activity plan. Your final output should consist only of the formatted activity plan.\n\nPlease include clear instructions, materials needed, and a brief explanation of how this activity supports the learning objective.',
        slots: [
          {
            id: 'ROLE_SUBJECT',
            label: 'Subject/Discipline',
            defaultText: 'your subject or discipline',
          },
          { id: 'TOPIC', label: 'Topic', defaultText: 'the topic' },
          {
            id: 'LEARNING_OBJECTIVE',
            label: 'Learning Objective',
            defaultText: 'the learning objective',
          },
          {
            id: 'STUDENT_CONTEXT',
            label: 'Student Context',
            defaultText: 'student context and challenges',
          },
          {
            id: 'TIME_CONSTRAINT',
            label: 'Constraints',
            defaultText: 'time and constraints',
          },
          {
            id: 'ENGAGEMENT_TYPE',
            label: 'Engagement Type',
            defaultText: 'type of engagement',
          },
        ],
      },
      evaluationTools: {
        reflectionQuestions: [
          {
            id: 'er1',
            question:
              'Does this activity actually require students to demonstrate the learning objective you specified, or could they complete it without achieving it?',
          },
          {
            id: 'er2',
            question:
              'Would this activity work differently than what you currently do — and is that difference an improvement?',
          },
        ],
        checklist: [
          { id: 'c1', text: 'Aligns with stated learning objective' },
          { id: 'c2', text: 'Appropriate for specified student level' },
          { id: 'c3', text: 'Respects time and resource constraints' },
          { id: 'c4', text: 'Instructions are specific enough to implement' },
          {
            id: 'c5',
            text: 'Includes some form of assessment or check for understanding',
          },
        ],
        failureModes: [
          {
            id: 'fm1',
            title: 'Generic Activities',
            description:
              'Watch for generic activities. AI often suggests activities that sound engaging but could apply to any topic. Ask yourself: Is this activity specific to your topic, or is it a template with your topic name dropped in?',
          },
        ],
      },
    },

    // ========================================
    // ITERATION 2 — Critical Refinement
    // ========================================
    {
      iterationNumber: 2,
      title: 'Critical Refinement',
      focus: 'Probe the AI output for problems, assumptions, and gaps.',
      isOptional: false,
      scaffoldingQuestions: [
        {
          id: 'q1',
          question:
            'What did the AI assume about your students or context that wasn\'t accurate?',
          placeholder:
            'e.g., It assumed students already know X, but they actually struggle with...',
          templateSlot: 'INACCURATE_ASSUMPTIONS',
          inputType: 'textarea',
        },
        {
          id: 'q2',
          question:
            'If a student who struggles with this topic attempted this activity, where would they get stuck? Does the activity account for that?',
          placeholder:
            'e.g., The transition between steps 2 and 3 requires a conceptual leap that...',
          templateSlot: 'STRUGGLE_POINTS',
          inputType: 'textarea',
        },
        {
          id: 'q3',
          question:
            'Is the activity genuinely engaging, or does it just sound engaging? What would students actually experience moment-to-moment?',
          placeholder:
            'e.g., The group discussion might fall flat because students don\'t have enough context to...',
          templateSlot: 'ENGAGEMENT_REALITY',
          inputType: 'textarea',
        },
        {
          id: 'q4',
          question:
            'What\'s missing from this output that only you would know about your specific teaching context?',
          placeholder:
            'e.g., My students respond better to visual examples, and the classroom has limited...',
          templateSlot: 'MISSING_CONTEXT',
          inputType: 'textarea',
        },
      ],
      promptTemplate: {
        templateText:
          'You are an experienced educational consultant specializing in pedagogical design, instructional improvement, and the critical evaluation of AI-generated teaching materials. Your task is to revise a classroom activity by identifying weaknesses in the current design and producing a more instructionally sound version.\n\nYou previously suggested a classroom activity. I have now reflected on that draft and identified several issues that need to be addressed.\n\nWhat the AI assumed incorrectly about my students or teaching context: [INACCURATE_ASSUMPTIONS].\n\nWhere students who struggle with this topic would likely get stuck: [STRUGGLE_POINTS].\n\nMy honest assessment of the activity\'s engagement in practice: [ENGAGEMENT_REALITY].\n\nImportant context missing from the original output: [MISSING_CONTEXT].\n\nBefore revising the activity, first diagnose the problems in the previous version.\n\nIdentify each inaccurate or weak assumption and explain why it is pedagogically problematic in this context. Then analyse the likely struggle points step by step, specifying what knowledge, skill, or cognitive leap students would need at each point and why some students may fail there.\n\nNext, evaluate the realism of the engagement design. Distinguish between activities that merely sound interactive and activities that are genuinely cognitively, socially, or behaviourally engaging for students moment to moment. Be concrete about what students would actually be doing, thinking, saying, and producing during the activity.\n\nThen identify the context-specific factors that must shape the redesign. Treat the missing context as a set of design requirements, not as optional background information. Show clearly how each one should change the activity structure, instructions, pacing, grouping, scaffolding, materials, or assessment.\n\nAfter completing this critique, redesign the activity. Keep the strongest elements of the original version, but revise anything that is inaccurate, generic, poorly scaffolded, or insufficiently engaging. Add targeted supports for likely struggle points, make transitions between stages explicit, and ensure the activity is realistic for the actual teaching situation.\n\nYour final output should consist only of the revised activity plan in clear markdown format with section headers. The activity plan should be concrete enough that I could implement it directly.\n\nPlease include:\n- a brief activity overview\n- the revised learning objective alignment\n- step-by-step instructions\n- explicit scaffolding for struggling students\n- materials needed\n- timing for each stage\n- a check for understanding or formative assessment\n- a short explanation of how the revisions better fit my students and context',
        slots: [
          {
            id: 'INACCURATE_ASSUMPTIONS',
            label: 'Inaccurate Assumptions',
            defaultText: 'what the AI assumed incorrectly',
          },
          {
            id: 'STRUGGLE_POINTS',
            label: 'Struggle Points',
            defaultText: 'where students would get stuck',
          },
          {
            id: 'ENGAGEMENT_REALITY',
            label: 'Engagement Reality',
            defaultText: 'honest assessment of engagement',
          },
          {
            id: 'MISSING_CONTEXT',
            label: 'Missing Context',
            defaultText: 'what was missing from the output',
          },
        ],
      },
      evaluationTools: {
        reflectionQuestions: [
          {
            id: 'er1',
            question:
              'Did the substance of the activity actually change, or just the framing? Compare carefully with the first version.',
          },
          {
            id: 'er2',
            question:
              'Are the new scaffolding elements genuinely helpful, or are they generic additions that don\'t address the specific struggle points you identified?',
          },
        ],
        checklist: [
          { id: 'c1', text: 'Aligns with stated learning objective' },
          { id: 'c2', text: 'Appropriate for specified student level' },
          { id: 'c3', text: 'Respects time and resource constraints' },
          { id: 'c4', text: 'Instructions are specific enough to implement' },
          {
            id: 'c5',
            text: 'Includes some form of assessment or check for understanding',
          },
          {
            id: 'c6',
            text: 'Addresses differentiation for struggling students',
          },
          {
            id: 'c7',
            text: 'Accounts for common student misconceptions',
          },
          {
            id: 'c8',
            text: 'Transition logistics between activity stages are clear',
          },
        ],
        failureModes: [
          {
            id: 'fm1',
            title: 'Sycophantic Agreement',
            description:
              'AI tends toward sycophancy — it may agree with your refinements without meaningfully changing the output. Compare carefully: did the substance actually change, or just the framing?',
          },
        ],
      },
    },

    // ========================================
    // ITERATION 3 (Optional) — Ownership
    // ========================================
    {
      iterationNumber: 3,
      title: 'Ownership',
      focus: 'Transition from AI output to usable classroom material.',
      isOptional: true,
      scaffoldingQuestions: [
        {
          id: 'q1',
          question:
            'What would you change about this activity before actually using it in your classroom tomorrow?',
          placeholder:
            'e.g., I would simplify the instructions, add a warm-up question, change the group size...',
          templateSlot: 'CHANGES_NEEDED',
          inputType: 'textarea',
        },
        {
          id: 'q2',
          question:
            'What elements of this activity reflect your teaching style and values, and what feels like generic AI output?',
          placeholder:
            'e.g., The discussion prompts feel authentic, but the assessment rubric feels generic...',
          templateSlot: 'STYLE_ASSESSMENT',
          inputType: 'textarea',
        },
        {
          id: 'q3',
          question:
            'What is this activity\'s core purpose — the single most important thing it should accomplish?',
          placeholder:
            'e.g., Help students distinguish between correlation and causation through hands-on data analysis...',
          templateSlot: 'PURPOSE_EXPLANATION',
          inputType: 'textarea',
        },
      ],
      promptTemplate: {
        templateText:
          'Your task is to transform a revised classroom activity into a final version that reflects the instructor\'s professional judgment, teaching style, and practical classroom needs.\n\nI have reviewed the current version of the activity and want to make final adjustments before using it in my teaching.\n\nWhat I would still change before using it in class: [CHANGES_NEEDED].\n\nWhat feels authentic to my teaching style and what still feels generic or AI-generated: [STYLE_ASSESSMENT].\n\nThe single most important purpose of this activity is: [PURPOSE_EXPLANATION].\n\nBefore producing the final version, reflect briefly on the implications of these inputs for the activity design.\n\nFirst, identify which requested changes are primarily about clarity, which are about pedagogy, which are about classroom logistics, and which are about voice or teaching style. Use this to guide your revision priorities.\n\nSecond, analyse the elements that feel generic or misaligned with my teaching approach. Replace generic phrasing, artificial transitions, or boilerplate assessment language with choices that feel purposeful, realistic, and instructor-owned. Preserve the pedagogical strength of the activity while making it sound and function like something a thoughtful educator would genuinely use.\n\nThird, use the stated core purpose of the activity as the main design filter. Ensure that every component of the final version directly supports that purpose. Remove or simplify anything that is interesting but nonessential, distracting, or overly elaborate.\n\nThen produce a final polished version of the activity that is ready for immediate classroom use or sharing with a colleague. The final version should feel coherent, practical, and personally owned rather than AI-generated.\n\nYour final output should consist only of the finished activity plan in clear markdown format with section headers.\n\nPlease include:\n- a concise activity title\n- a short statement of the activity\'s core purpose\n- final step-by-step instructions for implementation\n- materials needed\n- timing and logistics\n- any final teacher notes or facilitation tips\n- a brief explanation of why this version is especially well suited to my classroom and teaching approach',
        slots: [
          {
            id: 'CHANGES_NEEDED',
            label: 'Changes Needed',
            defaultText: 'specific changes for classroom use',
          },
          {
            id: 'STYLE_ASSESSMENT',
            label: 'Style Assessment',
            defaultText: 'what feels generic vs. authentic',
          },
          {
            id: 'PURPOSE_EXPLANATION',
            label: 'Purpose Explanation',
            defaultText: 'how you would explain this activity',
          },
        ],
      },
      evaluationTools: {
        reflectionQuestions: [
          {
            id: 'er1',
            question:
              'Could you use this activity as-is tomorrow, or does it still need your personal touch?',
          },
          {
            id: 'er2',
            question:
              'What did you learn about working with AI through this process that you\'ll apply next time?',
          },
        ],
        checklist: [
          {
            id: 'c1',
            text: 'Activity is ready to use in your specific classroom',
          },
          {
            id: 'c2',
            text: 'Reflects your teaching style and values',
          },
          {
            id: 'c3',
            text: 'All instructions are clear enough for another instructor to follow',
          },
          {
            id: 'c4',
            text: 'You could explain the pedagogical rationale to a colleague',
          },
        ],
        failureModes: [
          {
            id: 'fm1',
            title: 'AI as Finished Product',
            description:
              'Remember: AI output is a starting point, not a finished product. The most effective educators treat AI-generated content as raw material that requires their professional judgment to shape into something that truly serves their students.',
          },
        ],
      },
    },
  ],
};
