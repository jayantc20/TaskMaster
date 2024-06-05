# Task Management Application

## Overview

This project is a backend system for a task tracking and management application designed to facilitate collaboration and organization within teams or projects. The application allows users to create, assign, and track tasks, as well as collaborate with team members through comments and attachments.

## Features

- **User Authentication and Management**

  - Secure user authentication and authorization.
  - Endpoints for user registration, login, and profile management.

- **Task Management**
  - CRUD operations for tasks.
  - Task filtering, sorting, and searching functionalities.
- **Team/Project Collaboration**
  - Creation and joining of teams/projects.
  - Task assignment within teams/projects.
  - Real-time updates and notifications (Optional).

## Project Setup

- Node.js project using Express.js and Typescript.
- Dependencies managed with npm or yarn.
- Chosen postgressql for data storage.

## RESTful API Endpoints

### Authentication Endpoints

- `POST /api/v1/users/register`: Register a new user.
- `POST /api/v1/users/login`: Login with user credentials.
- `PUT /api/v1/users/profile`: Update user profile information.

### Task Management Endpoints

- `POST /api/v1/tasks`: Create a new task.
- `GET /api/v1/tasks`: Get all tasks assigned to the user.
- `GET /api/v1/tasks/:id`: Get task by ID.
- `PUT /api/v1/tasks/:id`: Update task by ID.
- `DELETE /api/v1/tasks/:id`: Delete task by ID.
- `PUT /api/v1/tasks/:id/status`: Change task status.
- `PUT /api/v1/tasks/:id/assign`: Assign task to another user.
- `GET /api/v1/tasks/filter/:status`: Filter tasks by status.
- `GET /api/v1/tasks/search`: Search tasks by title or description.
- `POST /api/v1/tasks/:id/comment`: Add comment to task.
- `POST /api/v1/tasks/:id/attachment`: Add attachment to task.

### Team/Project Endpoints

- `POST /api/v1/teams`: Create a new team.
- `GET /api/v1/teams`: Get all teams.
- `GET /api/v1/teams/:id`: Get team by ID.
- `PUT /api/v1/teams/:id`: Update team by ID.
- `DELETE /api/v1/teams/:id`: Delete team by ID.
- `POST /api/v1/teams/invite/send/:id`: Send invite to join team.
- `POST /api/v1/teams/invite/accept/:id`: Accept invitation to join team.

## User Stories

1. **User Registration**

   - As a user, I want to create a new account so that I can access the task tracking platform.

2. **User Login**

   - As a user, I want to log in to my account securely using my credentials.

3. **Profile Management**

   - As a user, I want to view my profile and update my personal information.

4. **Task Management**

   - As a user, I want to create a new task with a title, description, and due date.
   - As a user, I want to view a list of all tasks assigned to me.
   - As a user, I want to mark a task as completed when I finish working on it.

5. **Task Assignment**

   - As a user, I want to assign a task to another team member.

6. **Task Filtering and Searching**

   - As a user, I want to filter tasks based on their status (e.g., open, completed).
   - As a user, I want to search for tasks by title or description.

7. **Notifications**

   - As a user, I want to receive notifications when a task is assigned to me or updated.

8. **Collaboration**

   - As a user, I want to collaborate with team members by adding comments and attachments to tasks.

9. **Team/Project Creation and Invitation**
   - As a user, I want to create a new team or project and invite team members to join.

## Usage

1. Clone the repository.
2. Install dependencies using npm `npm install`.
3. Set up the chosen database system.
4. Start the server using `npm run start:dev`
5. Use the provided API endpoints to interact with the application.

By default, the server runs on port 3000.

## Configuration

The configuration settings are stored in JSON format in the `config` folder. You need to create `default.json` and `development.json` files in the `config` folder with the following structure:

```json
{
  "server": {
    "port": 3000,
    "jwtSecret": "your-jwt-secret-key",
    "expiresIn": "1d",
    "debug": true,
    "NODE_ENV": "development"
  },
  "email": {
    "host": "your-email-host",
    "port": 2525,
    "user": "your-email-user",
    "pass": "your-email-password"
  },
  "database": {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "your-database-username",
    "password": "your-database-password",
    "database": "your-database-name",
    "synchronize": true,
    "logging": true,
    "migrationsRun": true,
    "entities": ["dist/models/**/*.js"],
    "migrations": ["dist/migrations/**/*.js"],
    "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": "src/migrations"
    }
  }
}
```

## Contributors

- [Jayant Chhangani](https://github.com/jayantc20)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
