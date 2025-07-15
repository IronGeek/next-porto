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
    slug: 'canvas-flow',
    name: 'CanvasFlow',
    title: 'Real-Time Collaborative Whiteboarding Application',
    description: 'Developed a browser-based, real-time collaborative whiteboarding application designed for remote teams and virtual classrooms. It features custom drawing tools, multi-user cursors, and secure session management.',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    technologies: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'PostgreSQL', 'Styled Components'],
    thumbnail: '/projects/canvas-flow/thumbnail.png',
    images: []
  },
  {
    slug: 'shop-smart-ai',
    name: 'ShopSmart AI',
    title: 'Personalized E-commerce Recommendation Engine',
    description: 'Built a machine learning-powered recommendation engine integrated into a simulated e-commerce platform. The engine analyzes user Browse history and purchase patterns to suggest personalized product recommendations.',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    technologies: ['Python', 'Django', 'Scikit-learn', 'JavaScript', 'HTML', 'CSS', 'SQLite'],
    thumbnail: '/projects/shop-smart-ai/thumbnail.png',
    images: []
  },
  {
    slug: 'viz-insight',
    name: 'VizInsight',
    title: 'Interactive Data Visualization Dashboard',
    description: 'Created a responsive web dashboard for visualizing complex datasets, allowing users to filter, sort, and interact with various charts and graphs',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    technologies: ['React', 'D3.js', 'HTML/CSS', 'RESTful API integration'],
    thumbnail: '/projects/viz-insight/thumbnail.png',
    images: []
  },
  {
    slug: 'task-master-pro',
    name: 'TaskMaster Pro',
    title: 'SaaS Project Management Platform',
    description: 'A comprehensive web-based platform for team collaboration, task tracking, and project management. Features include Kanban boards, Gantt charts, file sharing, and real-time notifications.',
    role: 'Architected the RESTful API using Node.js and MongoDB, handling user authentication, project permissions, and data persistence. Developed key frontend modules for task creation, drag-and-drop reordering, and real-time updates using Vue.js. Implemented user invitation and role management features.',
    technologies: ['Vue.js', 'Vuex', 'Node.js', 'Express.js', 'MongoDB', 'JWT for authentication', 'WebSockets', 'SCSS'],
    thumbnail: '/projects/task-master-pro/thumbnail.png',
    images: []
  },
  {
    slug: 'medi-connect',
    name: 'MediConnect',
    title: 'Healthcare Appointment Booking System',
    description: 'Developed a secure and intuitive online platform for patients to book, reschedule, and manage appointments with healthcare providers. Includes admin panels for clinic staff to manage schedules and patient records.',
    role: 'Built the secure backend API with Python Flask, integrating with a PostgreSQL database for sensitive patient data. Designed and implemented the responsive patient-facing UI focusing on accessibility and ease of use, including calendar integration and form validation. Ensured HIPAA compliance considerations in data handling.',
    technologies: ['Python (Flask)', 'PostgreSQL', 'SQLAlchemy', 'React', 'Material-UI', 'Docker', 'Nginx'],
    thumbnail: '/projects/medi-connect/thumbnail.png',
    images: []
  },
  {
    slug: 'budget-buddy',
    name: 'BudgetBuddy',
    title: 'Personal Finance Tracker',
    description: 'A mobile-first web application enabling users to track income, expenses, set budgets, and visualize their spending habits through interactive charts.',
    role: 'Designed the user flow and wireframes with a focus on simplifying complex financial data. Developed the frontend using React with Redux for state management, creating custom chart components. Implemented a robust Node.js backend with user authentication and secure data storage, providing detailed transaction logging.',
    technologies: ['React', 'Redux', 'Chart.js', 'Node.js', 'Express.js', 'SQLite', 'Passport.js (authentication)'],
    thumbnail: '/projects/budget-buddy/thumbnail.png',
    images: []
  },
  {
    slug: 'learn-sphere',
    name: 'LearnSphere',
    title: 'Educational Content Management System',
    description: 'A platform for educators to create, manage, and deliver online courses, quizzes, and multimedia content to students. Features include user progress tracking and a rich text editor.',
    role: 'Developed the content creation and management interface for educators, including a custom rich text editor integration. Built the GraphQL API using Apollo Server with a MySQL database to efficiently manage course content, user progress, and permissions. Designed the responsive student-facing course consumption UI.',
    technologies: ['GraphQL', 'Apollo Server', 'Node.js', 'MySQL', 'React', 'Chakra UI', 'TinyMCE (for editor)'],
    thumbnail: '/projects/learn-sphere/thumbnail.png',
    images: []
  },
  {
    slug: 'trend-spotter',
    name: 'TrendSpotter',
    title: 'Social Media Analytics Dashboard',
    description: 'A tool for marketing professionals to monitor and analyze social media trends, track campaign performance, and visualize engagement metrics across different platforms.',
    role: 'Integrated with various social media APIs (Twitter, Instagram) to pull raw data. Processed and transformed the data on the backend using Python (Pandas) for efficient storage. Built the interactive dashboard frontend using Vue.js and a charting library, allowing users to customize data views and generate reports.',
    technologies: ['Python (Pandas, Flask)', 'Social Media APIs', 'Vue.js', 'Vue Chartkick', 'PostgreSQL'],
    thumbnail: '/projects/trend-spotter/thumbnail.png',
    images: []
  },
  {
    slug: 'city-pulse',
    name: 'CityPulse',
    title: 'Local Event Discovery Platform',
    description: 'A community-driven web application allowing users to discover, create, and share local events. Features include event categories, search filters, user ratings, and integrated mapping.',
    role: 'Developed the geolocation features and integrated with a mapping API for event location display. Built the backend with Ruby on Rails, handling event creation, user RSVPs, and review submissions. Designed a clean, engaging UI that encourages community interaction and event participation.',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Google Maps API', 'JavaScript (ES6)', 'HTML5', 'CSS3'],
    thumbnail: '/projects/city-pulse/thumbnail.png',
    images: []
  },
]

export { projects }
export type { Project }
