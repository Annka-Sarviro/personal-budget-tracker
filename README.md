## **Personal Budget Tracker**

This project is a **Personal Budget Tracker** application built using the following tech stack:

- **Backend**: NestJS
- **Frontend**: Next.js (with SSR)
- **Database**: PostgreSQL
- **Containerization**: Docker

### **Features**

- Manage income and expense categories.
- Add and view transactions.
- RESTful API with validation and transformation.
- Fully containerized setup for quick deployment.

---

## **Getting Started**

Follow the steps below to set up and run the project on your local machine.

### **Prerequisites**

Make sure the following tools are installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## **1. Clone the Repository**

```bash
git clone https://github.com/your-repo/personal-budget-tracker.git
cd personal-budget-tracker
```

---

## **2. Setup Environment Variables**

Create a `.env` file in the `/` same as .env.example

## **3. Docker Setup**

This project uses Docker for containerization. The `docker-compose.yml` file manages the containers for the backend, frontend, and PostgreSQL database.

### **Run the Project**

1. Build and start all services:

   ```bash
   docker-compose up --build
   ```

2. Verify the services are running:

   - **Backend API**: [http://localhost:3001](http://localhost:3001)
   - **Frontend**: [http://localhost:3000](http://localhost:3000)

---

## **4. Project Structure**

### **Backend**

The backend is built with **NestJS** and uses **TypeORM** to interact with PostgreSQL.

#### **Key Commands**

- Install dependencies:

  ```bash
  cd backend
  npm install
  ```

- Run the backend locally (without Docker):
  ```bash
  npm run start:dev
  ```

#### **API Endpoints**

- **Categories**

  - `GET /categories` – Fetch all categories.
  - `POST /categories` – Add a new category.

- **Transactions**
  - `GET /transactions` – Fetch all transactions.
  - `POST /transactions` – Add a new transaction.

---

### **Frontend**

The frontend is built with **Next.js** and consumes the backend API.

#### **Key Commands**

- Install dependencies:

  ```bash
  cd frontend
  npm install
  ```

- Run the frontend locally (without Docker):

  ```bash
  npm run dev
  ```

- Access the frontend at: [http://localhost:3000](http://localhost:3000)

---

## **5. Database Management**

The PostgreSQL database is managed as part of the Docker setup. Data is stored in a Docker volume, ensuring persistence across container restarts.

### **Database Connection**

The backend connects to the PostgreSQL database using the connection string defined in the `.env` file.

### **Admin Tools**

To inspect or manage the database, you can use tools like:

- [pgAdmin](https://www.pgadmin.org/) (recommended).
- `psql` CLI tool.

---

## **6. Adding Data**

### **Categories**

You can add categories like `income` and `expense` using the `/categories` endpoint.

Example **POST /categories** request body:

```json
{
  "name": "Food",
  "type": "expense"
}
```

### **Transactions**

You can add transactions using the `/transactions` endpoint.

Example **POST /transactions** request body:

```json
{
  "amount": 50,
  "type": "expense",
  "description": "Lunch",
  "category_id": 1
}
```

---

## **7. Customization**

### **Modify Backend Code**

- The backend code is located in the `backend/` folder.
- Update entities, DTOs, or services as needed for custom business logic.

### **Modify Frontend Code**

- The frontend code is located in the `frontend/` folder.
- Update pages or components to add new features or improve the UI.

---

## **8. Debugging**

### **Common Issues**

- **Port Conflicts**:  
  If ports (3000 or 3001) are in use, update the `docker-compose.yml` file to use different ports.
- **Database Connection Issues**:  
  Ensure that the database container is running and that the `DATABASE_URL` in the `.env` file is correct.

- **Missing Dependencies**:  
  Run `npm install` in both the `backend/` and `frontend/` directories.

---

## **9. Testing**

### **Backend Testing**

Run unit and integration tests for the backend:

```bash
cd backend
npm run test
```

### **Frontend Testing**

Run tests for the frontend:

```bash
cd frontend
npm run test
```

---

## **10. Stopping the Application**

To stop the Docker containers, run:

```bash
docker-compose down
```

---

## **11. Future Improvements**

- Add authentication (e.g., JWT).
- Implement data visualization for income/expense trends.
- Improve frontend design with libraries like TailwindCSS or Material-UI.

---

## **Contributing**

Feel free to open issues or submit pull requests for improvements and bug fixes.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.
