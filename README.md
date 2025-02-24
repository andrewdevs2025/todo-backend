# todo-backend

This guide will walk you through setting up the backend of the project, including installing dependencies, setting up environment variables, running the server, and initializing the database using Prisma.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **PostgreSQL** (or any other database supported by Prisma)
- **Docker** (optional, for containerized database)

---

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/backend.git
   cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

    or using Yarn:

    ```sh
    yarn install
    ```

---

## Environment Variables
Create a .env file in the root directory and configure the required environment variables:

    DATABASE_URL="mysql://username:password@localhost:3306/taskdb"
    PORT=5000

Replace username, password, and taskdb with your MySQL credentials.

---

## Database Setup
1. Run MySQL
If you have MySQL installed locally, ensure it's running. If using Docker, start a MySQL container:

    ```sh
    docker run --name task-db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=taskdb -e MYSQL_USER=username -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest
    ```

2. Apply Prisma Migrations
Initialize Prisma and apply migrations:

    ```sh
    npx prisma migrate dev --name init
    ```

3. Generate Prisma Client
Run the following command to generate the Prisma Client:

    ```sh
    npx prisma generate
    ```

4. Verify Database Connection
Test the connection to the database:

    ```sh
    npx prisma db pull
    ```

---

## Running the Backend
Start the backend server:

    ```sh
    npm run dev
    ```
By default, the server runs on http://localhost:5000.

---

## API Endpoints
1. Get All Tasks
GET /tasks

Response:

    [
        {
            "id": 1,
            "title": "Complete project",
            "color": "#FF5733",
            "completed": false
        }
    ]

2. Create a Task
POST /tasks

Request Body:

    {
        "title": "New Task",
        "color": "#4287f5"
    }

3. Update a Task
PUT /tasks/:id

Request Body:

    {
        "completed": true
    }

4. Delete a Task
DELETE /tasks/:id
