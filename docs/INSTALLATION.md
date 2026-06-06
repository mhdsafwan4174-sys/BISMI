# BISMI Expense Tracking - Installation & Getting Started

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git
- Docker (optional, for containerized setup)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mhdsafwan4174-sys/bismi.git
cd bismi
```

### 2. Database Setup

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d postgres
```

#### Option B: Manual PostgreSQL Setup

```bash
# Create database
createdb bismi_db

# Run schema script
psql bismi_db < database/init.sql
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/bismi_db

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend application
npm start
```

Frontend will open on `http://localhost:3000`

### 5. Mobile App Setup (Optional)

```bash
cd ../mobile

# Install dependencies
npm install

# Start Expo
expo start

# Press 'a' for Android or 'i' for iOS emulator
```

## 🐳 Using Docker Compose (All-in-One)

```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432

## 📁 Project Structure

```
bismi/
├── backend/           # Node.js + Express API
│   ├── src/          # Source code
│   ├── package.json
│   └── .env.example
├── frontend/         # React web application
│   ├── src/          # Source code
│   ├── package.json
│   └── .env.example
├── mobile/           # React Native mobile app
│   ├── src/          # Source code
│   ├── package.json
│   └── app.json
├── database/         # Database schemas and migrations
│   ├── init.sql
│   └── schema.md
├── docker-compose.yml
└── README.md
```

## 🔑 Default User Credentials

After database setup, create a test user:

```bash
# Backend provides endpoints to create users
POST /api/auth/register
{
  "email": "admin@bismi.com",
  "password": "Admin@123456",
  "full_name": "Admin User",
  "role": "admin"
}
```

## 🛠️ Available Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run linter
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from create-react-app
```

### Mobile
```bash
expo start       # Start Expo server
expo run:ios     # Run on iOS
expo run:android # Run on Android
eas build        # Build for production
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/bismi_db
JWT_SECRET=your_secret_key
UPLOAD_DIR=./uploads
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
REACT_APP_COMPANY_NAME=BISMI CONTRACTING COMPANY LLC
REACT_APP_CURRENCY=AED
```

## 📦 Build & Deploy

### Build Frontend
```bash
cd frontend
npm run build
# Output: build/ directory
```

### Build Backend
```bash
cd backend
npm run build
```

### Deploy to Heroku
```bash
# Backend
cd backend
heroku create bismi-backend
git push heroku main

# Frontend
cd ../frontend
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 5432 (PostgreSQL) Already in Use
```bash
# Using Docker
docker-compose down
docker volume prune
docker-compose up -d postgres
```

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Mobile App Documentation](./mobile/README.md)
- [Database Schema](./database/schema.md)

## 🤝 Support

For issues and questions:
1. Check existing documentation
2. Review error logs
3. Create GitHub issue with details

## 📝 License

© 2026 Bismi Contracting Company LLC. All rights reserved.

---

Happy coding! 🎉
