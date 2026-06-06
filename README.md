# BISMI Contracting Company LLC - Expense Tracking Application

A professional, modern, and mobile-friendly expense tracking system designed specifically for Bismi Contracting Company LLC.

## Features

### 🎯 Core Features
- **Dashboard**: Real-time expense overview with charts and analytics
- **Expense Entry**: Comprehensive form with auto-calculated totals
- **Project Management**: Track expenses by project with budget allocation
- **Reports**: Generate daily, weekly, monthly, and project-wise reports
- **User Roles**: Admin, Accountant, and Site Engineer access levels
- **Export**: PDF, Excel, and Print functionality
- **Mobile-Friendly**: Responsive design for all devices
- **Dark/Light Mode**: Theme switching for user preference

### 📊 Dashboard Metrics
- Total Expenses (Today, This Month, This Year)
- Project-wise Expense Breakdown
- Category-wise Expense Analysis
- Recent Transactions
- Monthly Expense Charts
- Expense Trend Graphs

### 💰 Expense Categories
- Material Expenses
- Equipment & Tools
- Labour Expenses
- Site Expenses
- Vehicle Expenses
- Administrative Expenses
- Miscellaneous

### 🔐 Security
- Secure Login System
- Role-Based Access Control
- Data Encryption
- Cloud Database Support
- Backup & Restore Functionality

### 🌍 Localization
- **Currency**: AED (UAE Dirham)
- **VAT**: UAE VAT Compatible
- **Language**: English

## Tech Stack

### Frontend
- React.js / Next.js
- TypeScript
- Tailwind CSS
- Chart.js / Recharts
- React Query / Redux
- Axios

### Backend
- Node.js + Express
- PostgreSQL / MongoDB
- JWT Authentication
- Multer (File Upload)
- Nodemailer

### Mobile
- React Native / Expo
- React Navigation
- Native Base / UI Kitten

### DevOps
- Docker
- GitHub Actions
- Vercel / Heroku (Deployment)

## Project Structure

```
bismi-expense-tracker/
├── frontend/           # React Web Application
├── mobile/            # React Native Mobile App
├── backend/           # Node.js Express API
├── database/          # Database Schemas
├── docs/              # Documentation
├── docker-compose.yml # Docker Configuration
└── README.md          # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL or MongoDB
- Git

### Quick Start

```bash
# Clone repository
git clone https://github.com/mhdsafwan4174-sys/bismi.git
cd bismi

# Setup Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Setup Frontend (Web)
cd ../frontend
npm install
npm start

# Setup Mobile (React Native)
cd ../mobile
npm install
expo start
```

## Environment Variables

Create `.env` files in respective directories with:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
API_URL=http://localhost:5000
UPLOAD_DIR=./uploads
```

## User Roles & Permissions

### Admin
- Full access to all features
- Manage users and projects
- View all reports
- Export data
- Configure system settings

### Accountant
- Add/Edit expenses
- View reports
- Export reports
- Generate financial reports

### Site Engineer
- Add expenses
- Upload invoices
- View assigned projects
- Export project reports

## Features Detailed

### Dashboard
- KPI cards with metrics
- Real-time expense charts
- Recent transaction list
- Budget vs Actual comparison
- Category breakdown

### Expense Entry
- Auto-generated Voucher Numbers
- Project & Supplier selection
- Category & Sub-category selection
- Quantity, Unit, and Unit Rate
- Auto-calculated Amount with VAT
- Multiple Payment Methods
- File Attachments (Invoices, Receipts)
- Remarks section

### Project Management
- Create/Edit Projects
- Set project budget and dates
- Track project status
- Expense allocation visualization
- Budget vs Actual analysis

### Reports
- Daily Expense Report
- Weekly Expense Report
- Monthly Expense Report
- Project Expense Report
- Supplier Expense Report
- Category Expense Report
- VAT Report
- Cash Flow Report

### Search & Filters
- Date Range Filter
- Project Filter
- Supplier Filter
- Category Filter
- Payment Method Filter
- Amount Range Filter

### Notifications
- Budget exceeded alerts
- Pending payment reminders
- Missing invoice reminders

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Expenses
- `GET /api/expenses` - List all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/:id` - Get expense details

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `GET /api/projects/:id/expenses` - Project expenses

### Reports
- `GET /api/reports/daily` - Daily report
- `GET /api/reports/monthly` - Monthly report
- `GET /api/reports/project` - Project report
- `GET /api/reports/export/pdf` - Export PDF
- `GET /api/reports/export/excel` - Export Excel

## Database Schema

### Tables
- **users** - User accounts and authentication
- **projects** - Project information
- **expenses** - Expense records
- **categories** - Expense categories
- **suppliers** - Vendor information
- **attachments** - File uploads
- **reports** - Generated reports
- **audit_logs** - System audit trails

## Deployment

### Web Application
```bash
# Using Vercel
vercel deploy

# Using Heroku
heroku create bismi-expense-tracker
git push heroku main
```

### Mobile Application
```bash
# Build APK for Android
eas build --platform android

# Build IPA for iOS
eas build --platform ios
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for code review

## Support

For issues and questions, please create an issue on GitHub.

## License

© 2026 Bismi Contracting Company LLC. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: June 6, 2026  
**Status**: Development
