/*
 * ------------------------------------------------------------------
 *  PORTFOLIO CONTENT
 *  Edit this file to update projects, skills, experience, education
 *  and contact settings. No build step is needed: save, commit, push.
 * ------------------------------------------------------------------
 */

window.PORTFOLIO = {
  /* ---------------- Contact & form settings ---------------- */
  config: {
    email: "ask.ai.devmaster@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhammad-ammar-laravel-ai/",
    github: "https://github.com/ammar197khan",

    /*
     * Contact form delivery.
     * Leave empty ("") and the form opens the visitor's email app with the
     * message pre-filled (works with no setup).
     * To receive messages directly in your inbox instead, create a free form
     * at https://formspree.io and paste its endpoint here, for example:
     *   formEndpoint: "https://formspree.io/f/abcdwxyz"
     */
    formEndpoint: ""
  },

  /* ---------------- Project filters ---------------- */
  // "id" must match the "category" value used by projects below.
  filters: [
    { id: "all", label: "All Projects" },
    { id: "ai-apps", label: "AI Applications" },
    { id: "ai-agents", label: "AI Agents" },
    { id: "ai-automation", label: "AI Automation" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile Applications" }
  ],

  /*
   * ---------------- Projects ----------------
   * Each project:
   *   title, category (filter id), summary, tech (list),
   *   image (path under assets/img/projects/, SVG/PNG/JPG/WebP),
   *   demo  (live URL, or "" to hide the button),
   *   repo  (GitHub URL, or "" to hide the button),
   *   concept: true  -> shows a "Concept" tag. Set to false (or delete the
   *                     line) once the project is a real, shareable case study.
   *
   * The entries below are CONCEPT PLACEHOLDERS. Replace them with your own work.
   */
  projects: [
    {
      title: "Customer Support AI Agent",
      category: "ai-agents",
      summary:
        "An agent that answers customer questions from a company knowledge base, looks up order status through APIs and hands complex cases to a human with a full summary.",
      tech: ["Python", "OpenAI API", "LangChain", "RAG", "REST APIs"],
      image: "assets/img/projects/support-agent.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Document Q&A Assistant",
      category: "ai-apps",
      summary:
        "Upload contracts, manuals or policies and ask questions in plain language. Answers cite the exact source passages so they can be checked.",
      tech: ["Python", "OpenAI API", "RAG", "PostgreSQL"],
      image: "assets/img/projects/document-qa.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Lead Qualification Workflow",
      category: "ai-automation",
      summary:
        "Inbound leads from web forms and email are enriched, scored by an LLM against clear criteria and routed to the right person in the CRM automatically.",
      tech: ["n8n", "OpenAI API", "Webhooks", "CRM API"],
      image: "assets/img/projects/lead-workflow.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Invoice Data Extraction",
      category: "ai-automation",
      summary:
        "Reads incoming invoices and receipts, extracts totals, dates and line items into structured data and flags anything that needs human review.",
      tech: ["n8n", "OpenAI API", "Python", "Google Sheets"],
      image: "assets/img/projects/invoice-extraction.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Research Agent",
      category: "ai-agents",
      summary:
        "A multi-step agent that plans a research task, searches approved sources, compares findings and produces a short, referenced brief.",
      tech: ["Python", "LangChain", "OpenAI API", "Tool calling"],
      image: "assets/img/projects/research-agent.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "AI Content Assistant for Websites",
      category: "ai-apps",
      summary:
        "A writing assistant built into a website's admin panel that drafts product descriptions and pages in the brand's tone, with editor approval before publishing.",
      tech: ["Vue.js", "Node.js", "OpenAI API", "Prompt Engineering"],
      image: "assets/img/projects/content-assistant.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Business Operations Dashboard",
      category: "web",
      summary:
        "A web application for managing customers, sales, payments and staff permissions, with role-based access and an audit trail.",
      tech: ["Laravel", "PHP", "MySQL", "Vue.js", "Tailwind CSS"],
      image: "assets/img/projects/operations-dashboard.svg",
      demo: "",
      repo: "",
      concept: true
    },
    {
      title: "Appointment Booking App",
      category: "mobile",
      summary:
        "A mobile app for booking appointments with real-time availability, reminders and a Laravel REST API backend shared with the web admin panel.",
      tech: ["Mobile app", "Laravel", "REST APIs", "MySQL"],
      image: "assets/img/projects/booking-app.svg",
      demo: "",
      repo: "",
      concept: true
    }
  ],

  /*
   * ---------------- Skills ----------------
   * Add, remove or rename freely. "note" is an optional one-line description
   * shown under each group heading.
   */
  skills: [
    {
      group: "AI & Generative AI",
      icon: "spark",
      note: "Building applications on top of large language models.",
      items: ["Python", "OpenAI API", "LLM Integration", "RAG", "AI Agents", "Prompt Engineering", "LangChain"]
    },
    {
      group: "AI Automation",
      icon: "flow",
      note: "Connecting tools and AI into reliable workflows.",
      items: ["n8n", "Workflow Automation", "API Integrations", "AI-powered Workflows"]
    },
    {
      group: "Backend Development",
      icon: "server",
      note: "APIs, data models and business logic.",
      items: ["PHP", "Laravel", "Node.js", "REST APIs", "MySQL", "PostgreSQL"]
    },
    {
      group: "Frontend Development",
      icon: "layout",
      note: "Responsive, accessible interfaces.",
      items: ["JavaScript", "Vue.js", "React", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      group: "Tools & Platforms",
      icon: "tools",
      note: "Version control, containers and cloud hosting.",
      items: ["Git", "GitHub", "Docker", "AWS", "DigitalOcean"]
    }
  ],

  /*
   * ---------------- Experience ----------------
   * PLACEHOLDERS: replace company names, dates and details with your own.
   * Newest first. "points" is a list of short achievements/responsibilities.
   */
  experience: [
    {
      role: "AI Developer & Automation Engineer",
      company: "Company Name",
      period: "20XX – Present",
      location: "Remote",
      points: [
        "Design and build AI agents, RAG applications and LLM integrations for business use cases.",
        "Automate operational workflows with n8n, APIs and AI-powered processing steps.",
        "Work with stakeholders to turn manual processes into measurable, maintainable automations."
      ]
    },
    {
      role: "Senior Software Developer",
      company: "Company Name",
      period: "20XX – 20XX",
      location: "City, Country",
      points: [
        "Built and maintained web applications and REST APIs with Laravel, PHP and MySQL.",
        "Integrated third-party services, payment gateways and external APIs.",
        "Supported mobile applications with shared backend services."
      ]
    },
    {
      role: "Software Developer",
      company: "Company Name",
      period: "20XX – 20XX",
      location: "City, Country",
      points: [
        "Developed features for client web applications from requirements to deployment.",
        "Worked across frontend and backend with JavaScript, PHP and SQL databases."
      ]
    }
  ],

  /*
   * ---------------- Education ----------------
   * PLACEHOLDERS: replace with your degree(s) and certifications.
   */
  education: [
    {
      title: "Degree Name (e.g. BS Computer Science)",
      institution: "University Name",
      period: "Year – Year",
      details: "Add a short note about your studies, final project or honours."
    },
    {
      title: "Certification Name",
      institution: "Issuing Organisation",
      period: "Year",
      details: "Optional: AI, cloud or development certifications."
    }
  ]
};
