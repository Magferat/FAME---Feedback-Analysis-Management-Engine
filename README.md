# User Feedback Intelligence System

A feedback management system with intelligent ticket routing using AI-powered analysis and automated email notifications.

## Overview

This project demonstrates TypeScript proficiency in both frontend and backend development, integrated with Large Language Models (LLMs) for intelligent feedback processing. The system automatically categorizes, prioritizes, and routes user feedback to appropriate teams while sending email notifications.

## Features

### Backend

- **RESTful API** built with Express.js and TypeScript
- **Database Integration** using MongoDB with Mongoose
- **AI-Powered Analysis** using Langchain.js and Google's Gemini AI to extract:
  - Category (Technical, Billing, General, Feature Request, Complaint)
  - Priority (Low, Medium, High)
  - Sentiment (Positive, Neutral, Negative)
  - Team assignment (Engineering, Support, Sales)
- **Email Notifications** sent to corresponding teams upon feedback creation
- **Search Functionality** with filters for name, category, and priority

### Frontend

- **Single Page Application** built with React and TypeScript
- **Modern UI** using Tailwind CSS for styling
- **Feedback Management**:
  - List view of all feedbacks
  - Modal forms for creating new feedback
  - Search and filter capabilities
- **Email Setup** modal for configuring team email addresses
- **Responsive Design** optimized for desktop and mobile

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **AI Integration**: Langchain.js with Google Gemini AI
- **Email Service**: Nodemailer with Resend
- **Development**: ts-node-dev for hot reloading

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Email Service**: EmailJS
- **Linting**: ESLint with TypeScript support

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Gemini API Key** (free tier available)
- **Email Service Account** (Resend or similar SMTP service)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd user-feedback-intelligence-system
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedback-system
GEMINI_API_KEY=your_google_gemini_api_key_here
RESEND_API_KEY=your_resend_api_key_here
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Running the Application

### Development Mode

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Build

1. **Build Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Build and Start Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

## API Endpoints

### Feedback Management

- `POST /api/feedback` - Create new feedback
- `GET /api/feedback` - Get all feedbacks with optional search filters

### Query Parameters for GET /api/feedback

- `name` - Search by user name (case-insensitive regex)
- `category` - Filter by category
- `priority` - Filter by priority

## Project Structure

```
user-feedback-intelligence-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── model/
│   │   │   └── Feedback.ts
│   │   ├── routes/
│   │   │   └── feedbackRoutes.ts
│   │   ├── services/
│   │   │   └── llmService.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Analytics.tsx
│   │   │   ├── EmailSetupModal.tsx
│   │   │   ├── FeedbackCard.tsx
│   │   │   ├── FeedbackList.tsx
│   │   │   ├── FeedbackModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── emailService.ts
│   │   ├── types/
│   │   │   └── feedback.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
└── README.md
```

## AI Analysis Details

The system uses Google's Gemini AI model to analyze user feedback and extract structured information:

- **Category Classification**: Technical issues, billing inquiries, general feedback, feature requests, or complaints
- **Priority Assessment**: Low, Medium, or High based on urgency and impact
- **Sentiment Analysis**: Positive, Neutral, or Negative tone detection
- **Team Routing**: Automatic assignment to Engineering, Support, or Sales teams

## Email Integration

- **Team Notifications**: Automatic email alerts sent to relevant teams when new feedback is created
- **Email Setup**: Users can configure team email addresses through the frontend interface
- **Service Providers**: Used email services ( EmailJS) for flexibility

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- **Google Gemini AI** for providing the LLM capabilities
- **Langchain.js** for AI integration framework
- **MongoDB** for database services
- **React & Express** communities for excellent documentation and support</content>
  <parameter name="filePath">c:\Users\HP\projects\user_feedback\README.md
