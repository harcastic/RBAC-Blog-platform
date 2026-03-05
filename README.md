# RBAC Practice - Role-Based Access Control API

A Node.js/Express API demonstrating Role-Based Access Control (RBAC) implementation with MongoDB, JWT authentication, and bcrypt password hashing.

## Features

- **User Authentication** - Register and login with JWT tokens
- **Role-Based Access Control** - Three roles: Admin, Author, Reader
- **Blog Management** - Create, read, update, and delete blog posts
- **Authorization** - Role-based permissions for different operations
- **Password Security** - Bcrypt hashing for secure password storage
- **Pagination** - Fetch blogs with pagination support

## Tech Stack

- **Backend**: Node.js with Express 5.2.1
- **Database**: MongoDB with Mongoose 9.2.4
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcryptjs 3.0.3
- **Development**: Nodemon for hot-reload

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd RBAC-practice
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file in the root directory**
```env
PORT=5000
CONNECTION_STRING=mongodb://localhost:27017/rbac-practice
JWT_SECRET=your-secret-key-here
```

4. **Start the server**
```bash
# Production
npm start

# Development (with hot-reload)
npm run dev
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "reader"  // optional, defaults to "reader"
}

Response: 201 Created
{
  "message": "User registered successfully - john_doe",
  "user": { user object }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### User Routes (`/api/users`)

#### Admin Access
```
GET /api/users/admin
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Welcome Admin"
}
```

#### Author Access
```
GET /api/users/author
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Welcome Manager"
}
```

#### Reader Access
```
GET /api/users/reader
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "welcome user"
}
```

### Blog Routes (`/api/blogs`)

#### Get All Blogs
```
GET /api/blogs?page=1&limit=10

Response: 200 OK
{
  "message": "Blogs fetched successfully",
  "page": 1,
  "limit": 10,
  "posts": [ array of posts ]
}
```

#### Get Single Blog
```
GET /api/blogs/:id

Response: 200 OK
{
  "message": "blog found",
  "post": { post object }
}
```

#### Create Blog (Author & Admin only)
```
POST /api/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the blog content..."
}

Response: 201 Created
{
  "message": "post created successfully",
  "post": { post object }
}
```

#### Update Blog (Author of blog or Admin only)
```
PUT /api/blogs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}

Response: 200 OK
{
  "message": "Post updated successfully",
  "post": { updated post object }
}
```

#### Delete Blog (Admin only)
```
DELETE /api/blogs/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "blog deleted successfully",
  "deletedBlog": { deleted post object }
}
```

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Create, Read, Update, Delete all blogs; Access admin routes |
| **Author** | Create and Edit own blogs; Read all blogs |
| **Reader** | Read all blogs only |

## Project Structure

```
src/
├── index.js                 # Main server entry point
├── config/
│   └── dbConnect.js        # MongoDB connection configuration
├── controllers/
│   ├── authController.js   # Authentication logic (register, login)
│   └── postController.js   # Blog post operations (CRUD)
├── middlewares/
│   ├── authMiddleware.js   # JWT token verification
│   └── roleMiddleware.js   # Role-based authorization
├── models/
│   ├── userModel.js        # User schema
│   └── postModel.js        # Blog post schema
└── routes/
    ├── authRoutes.js       # Auth endpoints
    ├── userRoutes.js       # User role endpoints
    └── postRoutes.js       # Blog post endpoints
```

## Key Implementation Details

### Authentication Flow
1. User registers with username, email, password, and optional role
2. Password is hashed using bcryptjs before storing in DB
3. User logs in with credentials to receive a JWT token
4. Token contains user ID and role, expires in 1 hour

### Authorization
- `authMiddleware.js` verifies JWT tokens from request headers
- `roleMiddleware.js` checks if user has required role for endpoint
- Role hierarchy: Admin (3) > Author (2) > Reader (1)

### Database Models
- **User**: Stores username, email, hashed password, and role
- **Post**: Stores title, content, author reference, and timestamps

## Error Handling

Common error responses:

- `400 Bad Request` - Missing or invalid input data
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - User lacks required role permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Environment Variables

Required environment variables in `.env`:

- `PORT` - Server port (default: 5000)
- `CONNECTION_STRING` - MongoDB connection URI
- `JWT_SECRET` - Secret key for signing JWT tokens

## License

MIT
