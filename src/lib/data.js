// Initial seed data and domain structures for Faculty Anonymous Feedback & Performance Analytics

export const DEPARTMENTS = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    semesters: [
      {
        id: "sem-4",
        name: "Semester 4 (Undergraduate)",
        courses: [
          { code: "CS401", title: "Advanced Data Structures & Algorithms", facultyId: "FAC-002" },
          { code: "CS402", title: "Database Management Systems", facultyId: "FAC-006" }
        ]
      },
      {
        id: "sem-6",
        name: "Semester 6 (Senior Year)",
        courses: [
          { code: "CS601", title: "Distributed Cloud Architecture", facultyId: "FAC-002" },
          { code: "CS602", title: "Operating System Internals", facultyId: "FAC-006" }
        ]
      }
    ]
  },
  {
    id: "dsai",
    name: "Data Science & Artificial Intelligence",
    code: "DSAI",
    semesters: [
      {
        id: "sem-4",
        name: "Semester 4 (Undergraduate)",
        courses: [
          { code: "DS401", title: "Applied Machine Learning Systems", facultyId: "FAC-001" },
          { code: "DS402", title: "Probability & Neural Modeling", facultyId: "FAC-001" }
        ]
      },
      {
        id: "sem-6",
        name: "Semester 6 (Senior Year)",
        courses: [
          { code: "DS601", title: "Deep Learning & Computer Vision", facultyId: "FAC-001" },
          { code: "DS602", title: "Natural Language Processing", facultyId: "FAC-001" }
        ]
      }
    ]
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    semesters: [
      {
        id: "sem-4",
        name: "Semester 4 (Undergraduate)",
        courses: [
          { code: "EE401", title: "Digital Signal Processing", facultyId: "FAC-003" },
          { code: "EE402", title: "Embedded Microcontrollers", facultyId: "FAC-007" }
        ]
      },
      {
        id: "sem-6",
        name: "Semester 6 (Senior Year)",
        courses: [
          { code: "EE601", title: "VLSI Circuit Architecture", facultyId: "FAC-003" },
          { code: "EE602", title: "Smart Power Grids & Renewable Systems", facultyId: "FAC-007" }
        ]
      }
    ]
  },
  {
    id: "mae",
    name: "Mechanical & Aerospace Engineering",
    code: "MAE",
    semesters: [
      {
        id: "sem-4",
        name: "Semester 4 (Undergraduate)",
        courses: [
          { code: "ME401", title: "Fluid Dynamics & Thermodynamics", facultyId: "FAC-005" },
          { code: "ME402", title: "Kinematics of Advanced Machinery", facultyId: "FAC-008" }
        ]
      },
      {
        id: "sem-6",
        name: "Semester 6 (Senior Year)",
        courses: [
          { code: "ME601", title: "Autonomous Robotics & Control Dynamics", facultyId: "FAC-008" },
          { code: "ME602", title: "Finite Element Analysis", facultyId: "FAC-005" }
        ]
      }
    ]
  },
  {
    id: "sbam",
    name: "School of Business Analytics & Management",
    code: "SBAM",
    semesters: [
      {
        id: "sem-4",
        name: "Semester 4 (Undergraduate)",
        courses: [
          { code: "BA401", title: "Predictive Business Analytics", facultyId: "FAC-004" },
          { code: "BA402", title: "Financial Risk & Econometrics", facultyId: "FAC-004" }
        ]
      },
      {
        id: "sem-6",
        name: "Semester 6 (Senior Year)",
        courses: [
          { code: "BA601", title: "Enterprise AI Strategy & Leadership", facultyId: "FAC-004" },
          { code: "BA602", title: "Quantitative Supply Chain Optimization", facultyId: "FAC-004" }
        ]
      }
    ]
  }
];

export const INITIAL_FACULTY = [
  {
    id: "FAC-001",
    name: "Dr. Aris Thorne",
    title: "Professor & AI Research Director",
    department: "Data Science & Artificial Intelligence",
    departmentCode: "DSAI",
    email: "a.thorne@academix.edu",
    avatarBg: "from-indigo-600 to-violet-600",
    initials: "AT",
    bio: "Pioneer in Deep Neural Architectures with 14+ years of academic research and industry consulting experience.",
    coursesAssigned: ["DS401: Applied Machine Learning Systems", "DS601: Deep Learning & Computer Vision"],
    historicalTrends: [4.65, 4.72, 4.78, 4.82],
    rawRatings: {
      subjectKnowledge: [5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5],
      clarity: [5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 4, 5],
      communication: [5, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4],
      engagement: [5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 4, 5],
      punctuality: [5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5],
      satisfaction: [5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5]
    }
  },
  {
    id: "FAC-002",
    name: "Prof. Elena Rostova",
    title: "Associate Professor of Computing",
    department: "Computer Science & Engineering",
    departmentCode: "CSE",
    email: "e.rostova@academix.edu",
    avatarBg: "from-violet-600 to-fuchsia-600",
    initials: "ER",
    bio: "Specializes in High-Performance Distributed Systems, Cloud Resilience, and Concurrent Data Structures.",
    coursesAssigned: ["CS401: Advanced Data Structures", "CS601: Distributed Cloud Architecture"],
    historicalTrends: [4.45, 4.55, 4.60, 4.67],
    rawRatings: {
      subjectKnowledge: [5, 5, 5, 4, 5, 5, 4, 5, 5, 5],
      clarity: [5, 5, 4, 5, 4, 5, 4, 5, 4, 5],
      communication: [4, 5, 5, 4, 5, 4, 5, 4, 5, 5],
      engagement: [5, 4, 5, 5, 5, 4, 5, 5, 4, 5],
      punctuality: [4, 5, 4, 5, 4, 5, 4, 5, 5, 4],
      satisfaction: [5, 5, 4, 5, 5, 4, 5, 5, 4, 5]
    }
  },
  {
    id: "FAC-003",
    name: "Dr. Marcus Vance",
    title: "Senior Faculty & Microchip Chair",
    department: "Electrical & Electronics Engineering",
    departmentCode: "EEE",
    email: "m.vance@academix.edu",
    avatarBg: "from-blue-600 to-indigo-600",
    initials: "MV",
    bio: "Expert in Embedded Hardware Acceleration, VLSI Logic Design, and Signal Processing for Next-Gen Sensor Arrays.",
    coursesAssigned: ["EE401: Digital Signal Processing", "EE601: VLSI Circuit Architecture"],
    historicalTrends: [4.20, 4.30, 4.35, 4.40],
    rawRatings: {
      subjectKnowledge: [5, 4, 5, 5, 4, 4, 5, 4, 5, 4],
      clarity: [4, 4, 4, 5, 4, 4, 5, 4, 4, 4],
      communication: [4, 4, 4, 4, 5, 4, 4, 4, 4, 4],
      engagement: [4, 5, 4, 4, 4, 5, 4, 4, 4, 5],
      punctuality: [5, 5, 4, 4, 5, 5, 4, 5, 4, 5],
      satisfaction: [4, 4, 5, 4, 4, 4, 5, 4, 4, 5]
    }
  },
  {
    id: "FAC-004",
    name: "Dr. Sophia Sterling",
    title: "Chair of Quantitative Management",
    department: "School of Business Analytics & Management",
    departmentCode: "SBAM",
    email: "s.sterling@academix.edu",
    avatarBg: "from-emerald-600 to-teal-600",
    initials: "SS",
    bio: "Focuses on Econometrics, Enterprise AI Deployment, and Predictive Risk Optimization for Fortune 500 Leaders.",
    coursesAssigned: ["BA401: Predictive Business Analytics", "BA601: Enterprise AI Strategy"],
    historicalTrends: [4.40, 4.52, 4.58, 4.63],
    rawRatings: {
      subjectKnowledge: [5, 5, 5, 4, 5, 5, 4, 5, 5, 4],
      clarity: [5, 4, 5, 5, 4, 5, 5, 4, 5, 4],
      communication: [5, 5, 4, 4, 5, 4, 5, 5, 4, 5],
      engagement: [5, 4, 5, 5, 4, 5, 4, 5, 5, 4],
      punctuality: [5, 5, 5, 4, 5, 5, 5, 4, 5, 5],
      satisfaction: [5, 5, 4, 5, 5, 4, 5, 4, 5, 5]
    }
  },
  {
    id: "FAC-005",
    name: "Prof. David K. Miller",
    title: "Assistant Professor",
    department: "Mechanical & Aerospace Engineering",
    departmentCode: "MAE",
    email: "d.miller@academix.edu",
    avatarBg: "from-amber-600 to-orange-600",
    initials: "DM",
    bio: "Fluid Mechanics specialist researching Computational Fluid Dynamics (CFD) and Supersonic Airflow Dynamics.",
    coursesAssigned: ["ME401: Fluid Dynamics & Thermodynamics", "ME602: Finite Element Analysis"],
    historicalTrends: [3.65, 3.70, 3.72, 3.78],
    rawRatings: {
      subjectKnowledge: [4, 4, 4, 4, 3, 4, 4, 4, 3, 4],
      clarity: [4, 3, 4, 4, 3, 4, 4, 3, 4, 4],
      communication: [3, 4, 3, 4, 3, 4, 3, 4, 4, 3],
      engagement: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],
      punctuality: [4, 4, 4, 4, 4, 4, 4, 3, 4, 4],
      satisfaction: [4, 3, 4, 4, 3, 4, 4, 3, 4, 3]
    }
  },
  {
    id: "FAC-006",
    name: "Dr. Maya Lin",
    title: "Lecturer & Academic Coordinator",
    department: "Computer Science & Engineering",
    departmentCode: "CSE",
    email: "m.lin@academix.edu",
    avatarBg: "from-cyan-600 to-blue-600",
    initials: "ML",
    bio: "Database Architect and System Software Educator dedicated to active-learning workshop methodologies.",
    coursesAssigned: ["CS402: Database Management Systems", "CS602: Operating System Internals"],
    historicalTrends: [3.85, 3.90, 3.95, 4.00],
    rawRatings: {
      subjectKnowledge: [4, 5, 4, 4, 4, 4, 4, 5, 4, 4],
      clarity: [4, 4, 4, 4, 4, 3, 4, 4, 4, 4],
      communication: [4, 4, 3, 4, 4, 4, 3, 4, 4, 4],
      engagement: [4, 3, 4, 4, 3, 4, 4, 3, 4, 4],
      punctuality: [4, 4, 4, 4, 5, 4, 4, 4, 4, 4],
      satisfaction: [4, 4, 4, 4, 4, 3, 4, 4, 4, 4]
    }
  },
  {
    id: "FAC-007",
    name: "Prof. Robert Sterling",
    title: "Adjunct Instructor",
    department: "Electrical & Electronics Engineering",
    departmentCode: "EEE",
    email: "r.sterling@academix.edu",
    avatarBg: "from-rose-600 to-red-600",
    initials: "RS",
    bio: "Microcontroller engineer focusing on basic hardware labs and embedded systems tutorials.",
    coursesAssigned: ["EE402: Embedded Microcontrollers", "EE602: Smart Power Grids"],
    historicalTrends: [3.05, 2.95, 2.90, 2.85],
    rawRatings: {
      subjectKnowledge: [3, 3, 4, 3, 3, 3, 3, 4, 3, 3],
      clarity: [3, 2, 3, 3, 2, 3, 3, 2, 3, 3],
      communication: [3, 2, 3, 2, 3, 2, 3, 3, 2, 3],
      engagement: [2, 3, 2, 3, 2, 2, 3, 2, 3, 2],
      punctuality: [3, 3, 3, 4, 3, 3, 3, 3, 3, 3],
      satisfaction: [3, 2, 3, 3, 2, 3, 2, 3, 2, 3]
    }
  },
  {
    id: "FAC-008",
    name: "Dr. Vikram Patel",
    title: "Assistant Professor",
    department: "Mechanical & Aerospace Engineering",
    departmentCode: "MAE",
    email: "v.patel@academix.edu",
    avatarBg: "from-amber-600 to-yellow-600",
    initials: "VP",
    bio: "Robotics and Controls specialist building autonomous drone navigation hardware and kinematic simulation models.",
    coursesAssigned: ["ME402: Kinematics of Machinery", "ME601: Autonomous Robotics & Controls"],
    historicalTrends: [3.50, 3.60, 3.65, 3.70],
    rawRatings: {
      subjectKnowledge: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      clarity: [4, 3, 4, 4, 3, 4, 4, 3, 4, 4],
      communication: [3, 4, 3, 4, 3, 4, 3, 4, 3, 4],
      engagement: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],
      punctuality: [4, 4, 4, 3, 4, 4, 4, 4, 3, 4],
      satisfaction: [4, 3, 4, 4, 3, 4, 3, 4, 4, 3]
    }
  }
];

export const INITIAL_FEEDBACK_LOGS = [
  {
    id: "LOG-9001",
    timestamp: "2026-09-10T14:22:00Z",
    facultyId: "FAC-001",
    facultyName: "Dr. Aris Thorne",
    department: "Data Science & Artificial Intelligence",
    course: "DS601: Deep Learning & Computer Vision",
    ratings: {
      subjectKnowledge: 5,
      clarity: 5,
      communication: 5,
      engagement: 5,
      punctuality: 5,
      satisfaction: 5
    },
    comment: "Dr. Thorne's breakdown of transformer attention mechanisms was brilliant. Hands down the best lecture experience of the semester!",
    sentiment: "positive"
  },
  {
    id: "LOG-9002",
    timestamp: "2026-09-09T11:15:00Z",
    facultyId: "FAC-002",
    facultyName: "Prof. Elena Rostova",
    department: "Computer Science & Engineering",
    course: "CS601: Distributed Cloud Architecture",
    ratings: {
      subjectKnowledge: 5,
      clarity: 4,
      communication: 5,
      engagement: 5,
      punctuality: 4,
      satisfaction: 5
    },
    comment: "Extremely challenging lab sessions but incredibly rewarding. She pushes us to understand real-world distributed consensus models.",
    sentiment: "positive"
  },
  {
    id: "LOG-9003",
    timestamp: "2026-09-08T09:40:00Z",
    facultyId: "FAC-007",
    facultyName: "Prof. Robert Sterling",
    department: "Electrical & Electronics Engineering",
    course: "EE402: Embedded Microcontrollers",
    ratings: {
      subjectKnowledge: 3,
      clarity: 2,
      communication: 2,
      engagement: 2,
      punctuality: 3,
      satisfaction: 2
    },
    comment: "The lab hardware is often misconfigured and lectures rush through register-level logic without sufficient step-by-step code walkthroughs.",
    sentiment: "actionable"
  },
  {
    id: "LOG-9004",
    timestamp: "2026-09-07T16:05:00Z",
    facultyId: "FAC-004",
    facultyName: "Dr. Sophia Sterling",
    department: "School of Business Analytics & Management",
    course: "BA601: Enterprise AI Strategy",
    ratings: {
      subjectKnowledge: 5,
      clarity: 5,
      communication: 5,
      engagement: 4,
      punctuality: 5,
      satisfaction: 5
    },
    comment: "Real-world case studies from top AI firms added tremendous practical insight. Excellent course pacing and syllabus structure.",
    sentiment: "positive"
  },
  {
    id: "LOG-9005",
    timestamp: "2026-09-06T13:30:00Z",
    facultyId: "FAC-005",
    facultyName: "Prof. David K. Miller",
    department: "Mechanical & Aerospace Engineering",
    course: "ME401: Fluid Dynamics & Thermodynamics",
    ratings: {
      subjectKnowledge: 4,
      clarity: 3,
      communication: 3,
      engagement: 3,
      punctuality: 4,
      satisfaction: 3
    },
    comment: "Good theoretical grasp, but needs more visual CFD simulations during lectures to aid intuitive understanding of turbulent flows.",
    sentiment: "neutral"
  }
];

export const PROFANITY_TOKENS = [
  "abuse", "idiot", "hate", "stupid", "dumb", "fool", "worst", "trash", "useless", "scam", "terrible teacher", "jerk"
];
