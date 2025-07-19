import { DbManager } from './manager';

const initialize = (path: string): Error => {
  let error: Error = null;

  const db: DbManager = new DbManager(path);

  try {
    db.begin();
    db.run(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id"            TEXT NOT NULL UNIQUE,
        "slug"          TEXT NOT NULL UNIQUE,
        "name"          TEXT NOT NULL,
        "description"	  TEXT,
        "summary"       TEXT,
        "role"          TEXT,
        "technologies"  TEXT,
        "thumbnail"     TEXT,
        "images"        TEXT,
        PRIMARY KEY("id"),
        UNIQUE("slug")
      );
    `);
    db.run(`
      INSERT INTO "projects"
        ("id","slug","name","description","summary","role","technologies","thumbnail","images")
      VALUES
        ('a5c779e7-5387-471d-89ce-166830c93e50','canvas-flow','CanvasFlow','Real-Time Collaborative Whiteboarding Application','Developed a browser-based, real-time collaborative whiteboarding application designed for remote teams and virtual classrooms. It features custom drawing tools, multi-user cursors, and secure session management.','Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.','React,Node.js,Express.js,Socket.IO,PostgreSQL,Styled Components',NULL,'/projects/canvas-flow/thumbnail.png'),
        ('621f547d-c15a-42ab-8690-4645b74311ad','shop-smart-ai','ShopSmart AI','Personalized E-commerce Recommendation Engine','Built a machine learning-powered recommendation engine integrated into a simulated e-commerce platform. The engine analyzes user Browse history and purchase patterns to suggest personalized product recommendations.','Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.','Python,Django,Scikit-learn,JavaScript,HTML,CSS,SQLite',NULL,'/projects/shop-smart-ai/thumbnail.png'),
        ('8e869145-838c-4f1c-9891-aefb7c4ac77f','viz-insight','VizInsight','Interactive Data Visualization Dashboard','Created a responsive web dashboard for visualizing complex datasets, allowing users to filter, sort, and interact with various charts and graphs','Led the full-stack development, implementing WebSocket communication for real-time updates and designing an intuitive drag-and-drop UI with React. Implemented user authentication and access control using Node.js and PostgreSQL.','React,D3.js,HTML/CSS,RESTful API integration',NULL,'/projects/viz-insight/thumbnail.png'),
        ('e8a67031-3d71-45c2-90b7-05bcbc41e7a2','task-master-pro','TaskMaster Pro','SaaS Project Management Platform','A comprehensive web-based platform for team collaboration, task tracking, and project management. Features include Kanban boards, Gantt charts, file sharing, and real-time notifications.','Architected the RESTful API using Node.js and MongoDB, handling user authentication, project permissions, and data persistence. Developed key frontend modules for task creation, drag-and-drop reordering, and real-time updates using Vue.js. Implemented user invitation and role management features.','Vue.js,Vuex,Node.js,Express.js,MongoDB,JWT for authentication,WebSockets,SCSS',NULL,'/projects/task-master-pro/thumbnail.png'),
        ('9790c36c-e505-442f-858f-34b0ee043147','medi-connect','MediConnect','Healthcare Appointment Booking System','Developed a secure and intuitive online platform for patients to book, reschedule, and manage appointments with healthcare providers. Includes admin panels for clinic staff to manage schedules and patient records.','Built the secure backend API with Python Flask, integrating with a PostgreSQL database for sensitive patient data. Designed and implemented the responsive patient-facing UI focusing on accessibility and ease of use, including calendar integration and form validation. Ensured HIPAA compliance considerations in data handling.','Python (Flask),PostgreSQL,SQLAlchemy,React,Material-UI,Docker,Nginx',NULL,'/projects/medi-connect/thumbnail.png'),
        ('e3ceefb9-d720-49e7-94f7-5e15ab65ec37','budget-buddy','BudgetBuddy','Personal Finance Tracker','A mobile-first web application enabling users to track income, expenses, set budgets, and visualize their spending habits through interactive charts.','Designed the user flow and wireframes with a focus on simplifying complex financial data. Developed the frontend using React with Redux for state management, creating custom chart components. Implemented a robust Node.js backend with user authentication and secure data storage, providing detailed transaction logging.','React,Redux,Chart.js,Node.js,Express.js,SQLite,Passport.js (authentication)',NULL,'/projects/budget-buddy/thumbnail.png'),
        ('7d3614e8-2491-4b33-a5d3-baca09f23d74','learn-sphere','LearnSphere','Educational Content Management System','A platform for educators to create, manage, and deliver online courses, quizzes, and multimedia content to students. Features include user progress tracking and a rich text editor.','Developed the content creation and management interface for educators, including a custom rich text editor integration. Built the GraphQL API using Apollo Server with a MySQL database to efficiently manage course content, user progress, and permissions. Designed the responsive student-facing course consumption UI.','GraphQL,Apollo Server,Node.js,MySQL,React,Chakra UI,TinyMCE (for editor)',NULL,'/projects/learn-sphere/thumbnail.png'),
        ('e6dabaf0-2ed8-4211-81ea-997aeed68d0f','trend-spotter','TrendSpotter','Social Media Analytics Dashboard','A tool for marketing professionals to monitor and analyze social media trends, track campaign performance, and visualize engagement metrics across different platforms.','Integrated with various social media APIs (Twitter, Instagram) to pull raw data. Processed and transformed the data on the backend using Python (Pandas) for efficient storage. Built the interactive dashboard frontend using Vue.js and a charting library, allowing users to customize data views and generate reports.','Python (Pandas, Flask),Social Media APIs,Vue.js,Vue Chartkick,PostgreSQL',NULL,'/projects/trend-spotter/thumbnail.png'),
        ('c1fffb61-94b9-4701-9640-792c6afea236','city-pulse','CityPulse','Local Event Discovery Platform','A community-driven web application allowing users to discover, create, and share local events. Features include event categories, search filters, user ratings, and integrated mapping.','Developed the geolocation features and integrated with a mapping API for event location display. Built the backend with Ruby on Rails, handling event creation, user RSVPs, and review submissions. Designed a clean, engaging UI that encourages community interaction and event participation.','Ruby on Rails,PostgreSQL,Google Maps API,JavaScript (ES6),HTML5,CSS3',NULL,'/projects/city-pulse/thumbnail.png');
    `);
    db.run(`
      CREATE INDEX IF NOT EXISTS "idx_projects_slug"
      ON "projects" ("slug");
    `);
    db.run(`
      CREATE INDEX IF NOT EXISTS "idx_projects_name"
      ON "projects" ("name" ASC);
    `);
    db.run(`
      CREATE VIEW "projects_slug" AS
      SELECT
		    LAG(slug, 1, NULL) OVER (ORDER BY ROWID) AS prev,
        slug,
		    LEAD(slug, 1, NULL) OVER (ORDER BY ROWID) AS next
      FROM "projects"
    `);
    db.commit();
  } catch (err) {
    error = err;
    console.error(err);

    db.rollback();
  } finally {
    db.close()
  }

  return error;
}

export { initialize };
