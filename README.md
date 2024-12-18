### **Steps to Push Your Project to GitHub**

Below is a step-by-step guide to push your Personal Budget Tracker project (with frontend and backend) to GitHub.

---

### **1. Create a GitHub Repository**

1. Log in to your GitHub account.
2. Click the **New Repository** button.
3. Fill in the repository details:
   - Repository name: `personal-budget-tracker`
   - Set the repository to public or private.
4. Click **Create Repository**.

---

### **2. Initialize Git in Your Project**

In your project root directory (where `frontend` and `backend` folders are located):

```bash
git init
```

This initializes a new Git repository.

---

### **3. Add Your Files to Git**

```bash
git add .
```

This stages all files for the first commit.

---

### **4. Commit the Files**

```bash
git commit -m "Initial commit: Personal Budget Tracker project"
```

This saves your changes to the local repository.

---

### **5. Link Your Repository**

Copy the repository URL from GitHub (e.g., `https://github.com/your-username/personal-budget-tracker.git`) and link your local repository:

```bash
git remote add origin https://github.com/your-username/personal-budget-tracker.git
```

---

### **6. Push Your Project to GitHub**

Push the code to the GitHub repository:

```bash
git branch -M main
git push -u origin main
```

---

### **7. Add `.gitignore`**

Ensure sensitive or unnecessary files are not pushed by adding a `.gitignore` file in the root directory with the following content:

```
# Node.js dependencies
node_modules/
# Docker files
*.env
.env.*
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# Build outputs
dist/
.next/
```

If you forgot to add `.gitignore` earlier, add it now and re-stage the files:

```bash
git add .gitignore
git commit -m "Add .gitignore"
git push
```

---

### **8. Verify on GitHub**

Visit your GitHub repository URL to verify that your project files are uploaded.

---

### **9. Add a README**

If you haven't added a `README.md` file yet, create one in the root directory with the project description. Here's an example:

````markdown
# Personal Budget Tracker

A full-stack application for tracking income and expenses, built with:

- Backend: NestJS, PostgreSQL
- Frontend: Next.js (with SSR)
- Containerization: Docker

## Features

- Manage income/expense categories.
- Add and view transactions.
- RESTful API with validation and transformation.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-budget-tracker.git
   ```
````

2. Follow the steps in the README files for `frontend/` and `backend/` to set up the application.

## License

This project is licensed under the MIT License.

````

Commit and push the README file:

```bash
git add README.md
git commit -m "Add README"
git push
````

---

### **10. Done!**

Your project is now live on GitHub and ready to share!
