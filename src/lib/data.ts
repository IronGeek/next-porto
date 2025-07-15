interface Project {
  readonly slug: string
  readonly name: string
  readonly title: string
  readonly description: string
  readonly role: string
  readonly technologies: string[]
  readonly thumbnail: string
  readonly images: string[]
}

const projects: Project[] = [
  {
    name: 'CanvasFlow',
    title: 'Real-Time Collaborative Whiteboarding Application',

    description: 'Developed a browser-based, real-time collaborative whiteboarding application designed for remote teams and virtual classrooms. It features custom drawing tools, multi-user cursors, and secure session management.',
    images: [],
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    slug: 'canvas-flow',
    technologies: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'PostgreSQL', 'Styled Components'],
    thumbnail: '/projects/canvas-flow/thumbnail.png'
  },
  {
    name: 'ShopSmart AI',
    title: 'Personalized E-commerce Recommendation Engine',

    description: 'Built a machine learning-powered recommendation engine integrated into a simulated e-commerce platform. The engine analyzes user Browse history and purchase patterns to suggest personalized product recommendations.',
    images: [],
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    slug: 'shop-smart-ai',
    technologies: ['Python', 'Django', 'Scikit-learn', 'JavaScript', 'HTML', 'CSS', 'SQLite'],
    thumbnail: '/projects/shop-smart-ai/thumbnail.png'
  },
  {
    name: 'VizInsight',
    title: 'Interactive Data Visualization Dashboard',

    description: 'Created a responsive web dashboard for visualizing complex datasets, allowing users to filter, sort, and interact with various charts and graphs',
    images: [],
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    slug: 'viz-insight',
    technologies: ['React', 'D3.js', 'HTML/CSS', 'RESTful API integration'],
    thumbnail: '/projects/viz-insight/thumbnail.png'
  },
  {
    name: 'TaskMaster Pro',
    title: 'SaaS Project Management Platform',

    description: 'A comprehensive web-based platform for team collaboration, task tracking, and project management. Features include Kanban boards, Gantt charts, file sharing, and real-time notifications.',
    images: [],
    role: 'Architected the RESTful API using Node.js and MongoDB, handling user authentication, project permissions, and data persistence. Developed key frontend modules for task creation, drag-and-drop reordering, and real-time updates using Vue.js. Implemented user invitation and role management features.',
    slug: 'task-master-pro',
    technologies: ['Vue.js', 'Vuex', 'Node.js', 'Express.js', 'MongoDB', 'JWT for authentication', 'WebSockets', 'SCSS'],
    thumbnail: '/projects/task-master-pro/thumbnail.png'
  },
  {
    name: 'MediConnect',
    title: 'Healthcare Appointment Booking System',

    description: 'Developed a secure and intuitive online platform for patients to book, reschedule, and manage appointments with healthcare providers. Includes admin panels for clinic staff to manage schedules and patient records.',
    images: [],
    role: 'Built the secure backend API with Python Flask, integrating with a PostgreSQL database for sensitive patient data. Designed and implemented the responsive patient-facing UI focusing on accessibility and ease of use, including calendar integration and form validation. Ensured HIPAA compliance considerations in data handling.',
    slug: 'medi-connect',
    technologies: ['Python (Flask)', 'PostgreSQL', 'SQLAlchemy', 'React', 'Material-UI', 'Docker', 'Nginx'],
    thumbnail: '/projects/medi-connect/thumbnail.png'
  },
  {
    name: 'BudgetBuddy',
    title: 'Personal Finance Tracker',

    description: 'A mobile-first web application enabling users to track income, expenses, set budgets, and visualize their spending habits through interactive charts.',
    images: [],
    role: 'Designed the user flow and wireframes with a focus on simplifying complex financial data. Developed the frontend using React with Redux for state management, creating custom chart components. Implemented a robust Node.js backend with user authentication and secure data storage, providing detailed transaction logging.',
    slug: 'budget-buddy',
    technologies: ['React', 'Redux', 'Chart.js', 'Node.js', 'Express.js', 'SQLite', 'Passport.js (authentication)'],
    thumbnail: '/projects/budget-buddy/thumbnail.png'
  },
  {
    name: 'LearnSphere',
    title: 'Educational Content Management System',

    description: 'A platform for educators to create, manage, and deliver online courses, quizzes, and multimedia content to students. Features include user progress tracking and a rich text editor.',
    images: [],
    role: 'Developed the content creation and management interface for educators, including a custom rich text editor integration. Built the GraphQL API using Apollo Server with a MySQL database to efficiently manage course content, user progress, and permissions. Designed the responsive student-facing course consumption UI.',
    slug: 'learn-sphere',
    technologies: ['GraphQL', 'Apollo Server', 'Node.js', 'MySQL', 'React', 'Chakra UI', 'TinyMCE (for editor)'],
    thumbnail: '/projects/learn-sphere/thumbnail.png'
  },
  {
    name: 'TrendSpotter',
    title: 'Social Media Analytics Dashboard',

    description: 'A tool for marketing professionals to monitor and analyze social media trends, track campaign performance, and visualize engagement metrics across different platforms.',
    images: [],
    role: 'Integrated with various social media APIs (Twitter, Instagram) to pull raw data. Processed and transformed the data on the backend using Python (Pandas) for efficient storage. Built the interactive dashboard frontend using Vue.js and a charting library, allowing users to customize data views and generate reports.',
    slug: 'trend-spotter',
    technologies: ['Python (Pandas, Flask)', 'Social Media APIs', 'Vue.js', 'Vue Chartkick', 'PostgreSQL'],
    thumbnail: '/projects/trend-spotter/thumbnail.png'
  },
  {
    name: 'CityPulse',
    title: 'Local Event Discovery Platform',

    description: 'A community-driven web application allowing users to discover, create, and share local events. Features include event categories, search filters, user ratings, and integrated mapping.',
    images: [],
    role: 'Developed the geolocation features and integrated with a mapping API for event location display. Built the backend with Ruby on Rails, handling event creation, user RSVPs, and review submissions. Designed a clean, engaging UI that encourages community interaction and event participation.',
    slug: 'city-pulse',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Google Maps API', 'JavaScript (ES6)', 'HTML5', 'CSS3'],
    thumbnail: '/projects/city-pulse/thumbnail.png'
  },
]

export { projects }
export type { Project }
