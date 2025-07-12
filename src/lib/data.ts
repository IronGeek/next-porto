interface Project {
  readonly slug: string
  readonly name: string
  readonly title: string
  readonly description: string
  readonly role: string
  readonly techstack: string[]
}

const projects: Project[] = [
  {
    slug: 'canvas-flow',
    name: 'CanvasFlow',
    title: 'Real-Time Collaborative Whiteboarding Application',
    description: 'Developed a browser-based, real-time collaborative whiteboarding application designed for remote teams and virtual classrooms. It features custom drawing tools, multi-user cursors, and secure session management.',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    techstack: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'PostgreSQL', 'Styled Components']
  },
  {
    slug: 'shop-smart-ai',
    name: 'ShopSmart AI',
    title: 'Personalized E-commerce Recommendation Engine',
    description: 'Built a machine learning-powered recommendation engine integrated into a simulated e-commerce platform. The engine analyzes user Browse history and purchase patterns to suggest personalized product recommendations.',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    techstack: ['Python', 'Django', 'Scikit-learn', 'JavaScript', 'HTML', 'CSS', 'SQLite']
  },
  {
    slug: 'viz-insight',
    name: 'VizInsight',
    title: 'Interactive Data Visualization Dashboard',
    description: 'Created a responsive web dashboard for visualizing complex datasets, allowing users to filter, sort, and interact with various charts and graphs',
    role: 'Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.',
    techstack: ['React', 'D3.js', 'HTML/CSS', 'RESTful API integration']
  }
]

export { projects }
