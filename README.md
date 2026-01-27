# Go + React Developer Test Project

## Task Manager Application

### Objective
Create a simple task management application with React frontend and Go backend. This test evaluates your ability to work with both technologies and implement basic CRUD operations.

### Prerequisites
- Go 1.21+ installed
- Node.js 18+ and npm/yarn installed

### Getting Started

1. **Clone or extract the project**
2. **Navigate to the backend directory and install dependencies:**
   ```bash
   cd backend
   go mod download
   ```
3. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
4. **Build the frontend:**
   ```bash
   npm run build
   ```
5. **Return to backend directory and run the server:**
   ```bash
   cd ../backend
   go run .
   ```

The application will be available at `http://localhost:8080`

### For Development

To run with hot reload:

1. **Start the backend server:**
   ```bash
   cd backend
   go run .
   ```

2. **In another terminal, start the frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` and will proxy API requests to the backend.

### Project Structure

```
go-react-test/
├── backend/          # Go backend API
│   ├── main.go      # Server entry point
│   ├── handlers.go  # HTTP handlers
│   ├── models.go    # Data models
│   └── go.mod       # Go dependencies
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # API service layer
│   └── package.json    # Node.js dependencies
└── README.md        # This file
```

### API Endpoints

- `GET /` - Home endpoint
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion status

### Task Requirements

The candidate should implement the following features:

#### Backend (Go) Tasks:

1. **Implement task validation** (Medium)
   - Add validation to ensure task title is not empty
   - Add validation for title length (min: 1, max: 100 characters)
   - Return appropriate HTTP status codes and error messages

2. **Add task filtering** (Easy)
   - Extend the GET `/api/tasks` endpoint to support query parameters:
     - `?completed=true` - Get only completed tasks
     - `?completed=false` - Get only pending tasks

3. **Add task search** (Medium)
   - Add a search endpoint `GET /api/tasks/search?q={query}`
   - Search should match tasks by title or description (case-insensitive)

4. **Implement data persistence** (Hard)
   - Replace the in-memory storage with a proper database
   - Use SQLite or PostgreSQL
   - Create a database schema and connection
   - Update all handlers to use the database

5. **Add error handling middleware** (Medium)
   - Create a middleware for centralized error handling
   - Log errors appropriately
   - Return consistent error responses

#### Frontend (React) Tasks:

1. **Implement task filtering UI** (Easy)
   - Add filter buttons to show: All, Completed, Pending tasks
   - Update the task list based on selected filter

2. **Add task search component** (Easy)
   - Create a search input component
   - Implement real-time search as user types
   - Highlight matching text in search results

3. **Add task priority feature** (Medium)
   - Add priority field to tasks (Low, Medium, High)
   - Update TaskForm to include priority selection
   - Display priority with color-coded badges
   - Add sorting by priority

4. **Implement local storage** (Easy)
   - Save task filter preferences in localStorage
   - Restore preferences when the app loads

5. **Add responsive design improvements** (Medium)
   - Improve mobile responsiveness
   - Add loading skeletons for better UX
   - Implement optimistic updates for better perceived performance

#### Full-Stack Tasks:

1. **Add user authentication** (Hard)
   - Implement JWT-based authentication
   - Add user registration and login endpoints
   - Protect task endpoints to be user-specific
   - Add authentication context in React

2. **Implement real-time updates** (Hard)
   - Add WebSocket support for real-time task updates
   - When one user updates a task, others should see the change immediately

3. **Add file attachments** (Hard)
   - Allow attaching files to tasks
   - Implement file upload endpoint
   - Display attached files in the task view

### Evaluation Criteria

- Code organization and structure
- Error handling and validation
- API design and RESTful principles
- React component design and state management
- User experience and UI/UX considerations
- Code comments and documentation
- Testing (bonus points for unit tests)

### Time Estimate
- Basic tasks: 2-3 hours
- All tasks: 6-8 hours

### Submission
Please submit your solution as a Git repository or zip file containing all source code. Include instructions for running your implementation if they differ from the original setup.

### Notes
- You may use any additional libraries you find necessary
- Focus on clean, maintainable code
- Comments explaining your decisions are appreciated
- Partial implementation is acceptable - document what you would complete given more time
