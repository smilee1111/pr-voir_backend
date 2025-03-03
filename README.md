# pr_voir_planner

## Overview
**pr_voir_planner** is a task and event management web application designed to help users efficiently organize their schedules. The application allows users to create, view, update, and delete tasks and events with an intuitive user interface. It integrates a backend for authentication, data storage, and task/event management.

## Features
- **User Authentication**: Sign up, login, and logout functionality using Firebase Authentication.
- **Task Management**: Add, edit, delete, and view tasks categorized by status and priority.
- **Event Management**: Create and manage events with title, location, date, and time.
- **Calendar View**: Select and view tasks/events based on specific dates.
- **Reminders & Notifications** *(Planned)*: Push notifications and in-app alerts for upcoming events and tasks.
- **Forgot Password Integration** *(Planned)*: Secure password reset via email verification.
- **Dashboard Enhancements** *(Planned)*: More UI components for a better user experience.

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS
- React Router DOM

### Backend:
- Node.js
- Express.js
- Firebase Firestore (Database)
- Firebase Authentication

## Usage
1. Register/Login to access the dashboard.
2. Add, edit, and delete tasks/events.
3. Select a date to view associated tasks.
4. Logout when finished.

## Project Structure
### Frontend (`/frontend`)
- `src/components/`
  - `Login.jsx`
  - `Register.jsx`
  - `Dashboard.jsx`
  - `TaskList.jsx`
  - `EventList.jsx`
- `src/pages/`
  - `Home.jsx`
  - `Profile.jsx`

### Backend (`/backend`)
- `models/`
  - `TaskModel.js`
  - `EventModel.js`
  - `UserModel.js`
- `controllers/`
  - `taskController.js`
  - `eventController.js`
  - `userController.js`
- `routes/`
  - `taskRoutes.js`
  - `eventRoutes.js`
  - `userRoutes.js`
- `middleware/`
  - `authMiddleware.js`
- `server.js`

## API Endpoints
### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Reset password *(Planned)*

### Tasks
- `GET /api/tasks/:userId/:date` - Get tasks by user and date
- `POST /api/tasks` - Create new task
- `DELETE /api/tasks/:taskId` - Delete task

### Events
- `GET /api/events/:userId` - Get user events
- `POST /api/events` - Add an event
- `DELETE /api/events/:eventId` - Remove an event

## Future Improvements
- **Push Notifications & Reminders**
- **Enhanced Search & Filtering**
- **Offline Support**
- **User Analytics & Insights**

## Links
- **Frontend Repo**: [GitHub Frontend Repo](<frontend-repo-link>)
- **Backend Repo**: [GitHub Backend Repo](<backend-repo-link>)
- **Figma Design**: [Figma Link](<figma-link>)
- **Video Walkthrough**: [YouTube Link](<youtube-link>)
