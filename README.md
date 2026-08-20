# QuizMind

A web application that streamlines studying by allowing users to upload text notes and automatically convert them into structured flashcards using AI, or create them manually. 

## 🚀 Key Features

- **AI Generation:** Integrates OpenAI's API to parse raw text notes and instantly generate high-quality question-and-answer flashcard decks.
- **Manual Control:** Fully featured note and flashcard editor for creating, updating, and organizing decks by topic.
- **Secure Authentication:** Robust user session management with protected API routes.
- **Responsive UI:** Clean, modern dashboard built for seamless studying.

---

## 🛠️ Tech Stack

Component | Technology | Role 
- **Frontend** | Next.js, React, Tailwind CSS, shadcn | Client interface, state management, UI styling 
- **Backend** | Python, FastAPI | Asynchronous REST API, OpenAI orchestration 
- **Database** | PostgreSQL | Relational storage for users, notes, and flashcards 
- **Auth** | Better Auth | Session handling, security compliance, and user verification 

---

## 💡 Engineering Highlights & Architecture Decisions

### 🔒 Authentication Migration (Custom ➡️ Better Auth)
To understand fundamental web security principles, I originally engineered a **custom authentication configuration**. This provided hands-on experience handling JWTs, hashing passwords, and managing cookie storage. Once the core logic was understood and I finished the main features of the application, I successfully **migrated the entire authentication pipeline to Better Auth**. This transition enhanced the application's production security, added cross-site scripting (XSS) protections, and optimized token validation processes.

### ⚡ Asynchronous AI Processing
Leveraged **FastAPI's asynchronous capabilities** alongside the OpenAI API to handle textual payloads without blocking the application event loop. This ensures high concurrency and short response times even during active AI generation windows.

### 🐳 DevOps & Deployment (In Progress)
The application is currently being **containerized using Docker** to standardize the development environment, isolate the Next.js and FastAPI services as well as the Postgres instance, and simplify deployment to the cloud.

---

## ⚙️ Local Development Setup
Note: Local end-to-end setup requires a running PostgreSQL instance and active API keys. 

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL instance
- OpenAI API Key


### Initial Setup
1. Clone the repository.
2. Create a `.env` file using the `.env.example` file in the root folder as a template.

### Backend Setup
1. Navigate to the backend directory.
2. Create a virtual environment and install dependencies:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   uv pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory.
2. Install npm packages:
   ```bash
   pnpm install
   ```
3. Run the development environment:
   ```bash
   pnpm run dev
   ```

---

## 🛣️ Roadmap / Ongoing Improvements
- [ ] Complete Docker Compose orchestration for multi-container local testing and eventual cloud deployment.
- [ ] Implement space-repetition algorithms for flashcard review tracking.
- [ ] Add user performance tracking metrics to monitor flashcard retention rates over time.
- [ ] Add support for PDF/image uploads via OCR text extraction.
