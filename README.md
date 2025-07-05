# 💰 Personal Finance Tracker

A modern, responsive web application for tracking personal finances with beautiful visualizations and intuitive user interface.

## ✨ Features

### 📊 **Transaction Management**
- ✅ Add, edit, and delete transactions
- ✅ Categorize as income or expense
- ✅ Date-based transaction tracking
- ✅ Real-time form validation
- ✅ Responsive transaction list

### 📈 **Data Visualization**
- ✅ Monthly expenses bar chart
- ✅ Interactive charts with Recharts
- ✅ Color-coded income vs expenses
- ✅ Responsive chart layouts

### 🎨 **Modern UI/UX**
- ✅ Dark mode design with glass morphism
- ✅ Smooth animations and transitions
- ✅ Gradient backgrounds and glow effects
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Touch-friendly controls
- ✅ Loading states and error handling

### 🗄️ **Database & API**
- ✅ MongoDB integration with Mongoose
- ✅ RESTful API endpoints
- ✅ Data validation and error handling
- ✅ Optimized database queries with indexes
- ✅ Cached database connections

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local, Atlas, or Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Finance_Tracker-Stage-1/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:3000/name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **shadcn/ui** - Modern UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Node.js** - JavaScript runtime

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       └── route.js          # API endpoints
│   ├── transactions/
│   │   ├── page.js               # Main transactions page
│   │   ├── TransactionForm.js    # Add/edit form component
│   │   ├── TransactionList.js    # Transaction list component
│   │   ├── TransactionChart.js   # Chart visualization
│   │   ├── ErrorState.js         # Error handling component
│   │   └── LoadingState.js       # Loading component
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
├── lib/
│   └── mongodb.js                # Database connection utility
├── models/
│   └── Transaction.js            # MongoDB schema
├── public/                       # Static assets
└── package.json
```

## 🗄️ Database Schema

### Transaction Model
```javascript
{
  _id: ObjectId,
  amount: Number,        // Required, min: 0.01
  description: String,   // Required, max: 100 chars
  date: Date,           // Required
  type: String,         // Required, enum: ['income', 'expense']
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

### Database Indexes
- `date: -1` - For sorting by date (newest first)
- `type: 1` - For filtering by transaction type
- `createdAt: -1` - For sorting by creation time

## 🔌 API Endpoints

### GET `/api/transactions`
Get all transactions sorted by date (newest first)

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 150.00,
    "description": "Grocery shopping",
    "date": "2024-01-15T00:00:00.000Z",
    "type": "expense",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST `/api/transactions`
Create a new transaction

``

## 🎨 UI Components

### TransactionForm
- Add new transactions
- Edit existing transactions
- Real-time validation
- Responsive design

### TransactionList
- Display all transactions
- Edit and delete actions
- Sort by date
- Responsive grid layout

### TransactionChart
- Monthly expenses visualization
- Interactive bar chart
- Color-coded categories
- Responsive chart sizing

