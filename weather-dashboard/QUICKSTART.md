# Weather Dashboard - Quick Start Guide

## 🚀 Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenWeatherMap API Key (free at https://openweathermap.org/api)

## 📦 Installation

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Generate an API key
4. Copy the API key

### 2. Setup Backend

```bash
cd weather-dashboard/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your OpenWeatherMap API key
# Edit .env and replace: OPENWEATHER_API_KEY=your_api_key_here

# Start backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your OpenWeatherMap API key (if needed)
# Edit .env

# Start frontend
npm start
```

Frontend will open on `http://localhost:3000`

## 🧪 Testing the API

```bash
# Get weather by coordinates (Dubai)
curl "http://localhost:5000/api/weather/current?lat=25.2048&lon=55.2708"

# Search for a city
curl "http://localhost:5000/api/weather/search?q=London"

# Get complete weather data (current + forecast + air quality)
curl "http://localhost:5000/api/weather/complete?lat=25.2048&lon=55.2708"

# Get 7-day forecast
curl "http://localhost:5000/api/weather/forecast?lat=25.2048&lon=55.2708"

# Get air quality
curl "http://localhost:5000/api/weather/airquality?lat=25.2048&lon=55.2708"
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
OPENWEATHER_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:3000
CACHE_DURATION=3600
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
REACT_APP_ENV=development
```

## 📱 Features

✅ Real-time weather data
✅ 7-day forecast
✅ Air quality index
✅ Wind patterns
✅ Sunrise/sunset times
✅ Search by city
✅ Geolocation detection
✅ Responsive design
✅ Dark/Light mode support

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/weather/current` | GET | Current weather by coordinates |
| `/api/weather/forecast` | GET | 7-day forecast |
| `/api/weather/airquality` | GET | Air quality data |
| `/api/weather/search` | GET | Search city by name |
| `/api/weather/city` | GET | Weather by city name |
| `/api/weather/complete` | GET | Current + Forecast + Air Quality |

## 🐛 Troubleshooting

### API Key Error
- Ensure your OpenWeatherMap API key is correct
- Wait 10 minutes after creating the key before using
- Make sure key is added to backend .env

### CORS Error
- Check that backend is running on port 5000
- Verify frontend .env has correct API_URL

### Geolocation Not Working
- Allow browser location access
- Use HTTPS (geolocation requires secure context)
- Check browser console for location errors

### Rate Limiting
- OpenWeatherMap free tier has limits
- Implement caching (already done on backend)
- Consider upgrading API plan

## 🚀 Deployment

### Deploy Backend to Heroku
```bash
cd weather-dashboard/backend
heroku create weather-dashboard-api
git push heroku main
```

### Deploy Frontend to Vercel
```bash
cd weather-dashboard/frontend
vercel deploy
```

## 📖 Documentation

- [API Documentation](../docs/API.md)
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation
3. Create GitHub issue with details

---

Happy weather tracking! 🌤️