# 🌤️ Weather Dashboard Application

A professional, real-time weather dashboard with multi-location support, forecasts, and weather alerts.

## ✨ Features

### 🎯 Core Features
- **Real-time Weather Data** - Current conditions, temperature, humidity, wind speed
- **Multi-Location Support** - Search and manage multiple cities
- **Weather Forecast** - 7-day detailed forecast with hourly breakdown
- **Weather Alerts** - Severe weather notifications and warnings
- **Air Quality Index** - Pollution levels and health recommendations
- **UV Index** - Sun protection information
- **Wind Patterns** - Wind speed, direction, and gusts
- **Sunrise/Sunset** - Daily solar events
- **Search History** - Recently searched locations
- **Favorites** - Bookmark favorite locations
- **Dark/Light Mode** - Theme switching
- **Responsive Design** - Mobile, tablet, and desktop support
- **Export Weather Data** - Export to PDF/CSV

### 📊 Dashboard Components
- Current weather card with large temperature display
- Hourly forecast carousel
- 7-day forecast cards
- Air quality gauge
- UV index meter
- Wind speed and direction
- Humidity and pressure
- Sunrise/sunset times
- Weather alerts banner
- Recent searches
- Favorite locations sidebar

### 🔄 Data Sources
- **OpenWeatherMap API** - Primary weather data
- **OpenWeatherMap One Call API** - Extended forecasts
- **OpenWeatherMap Air Pollution API** - Air quality data

### 🌐 Geographic Features
- Geolocation detection
- City search with autocomplete
- Coordinates-based weather lookup
- Multiple timezone support

### 📱 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Query** - Data fetching & caching
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP requests
- **Node-cache** - Data caching
- **Morgan** - Request logging
- **Helmet** - Security headers
- **Cors** - Cross-origin requests

### Mobile
- **React Native** - Cross-platform
- **Expo** - Development framework
- **React Navigation** - Navigation
- **Native Base** - UI components

## 📁 Project Structure

```
weather-dashboard/
├── frontend/                    # React web application
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherCard.tsx
│   │   │   ├── Forecast.tsx
│   │   │   ├── AirQuality.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── Alerts.tsx
│   │   │   └── WeatherDetails.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Search.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/
│   │   │   ├── weatherService.ts
│   │   │   └── api.ts
│   │   ├── store/
│   │   │   ├── weatherSlice.ts
│   │   │   └── store.ts
│   │   ├── hooks/
│   │   │   ├── useWeather.ts
│   │   │   └── useGeolocation.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   └── constants.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/                     # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── weatherController.ts
│   │   │   └── alertController.ts
│   │   ├── routes/
│   │   │   ├── weather.ts
│   │   │   └── alerts.ts
│   │   ├── services/
│   │   │   ├── weatherService.ts
│   │   │   └── cacheService.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── rateLimit.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── helpers.ts
│   │   ├── index.ts
│   │   └── config.ts
│   ├── package.json
│   └── .env.example
├── mobile/                      # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   └── services/
│   ├── app.json
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile Setup
```bash
cd mobile
npm install
expo start
```

## 🔑 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_OPENWEATHER_API_KEY=your_api_key
REACT_APP_ENV=development
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
OPENWEATHER_API_KEY=your_api_key
CACHE_DURATION=3600
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Weather Endpoints
- `GET /api/weather/current?lat=latitude&lon=longitude` - Current weather
- `GET /api/weather/forecast?lat=latitude&lon=longitude` - 7-day forecast
- `GET /api/weather/city?city=name` - Weather by city name
- `GET /api/weather/search?q=query` - Search locations
- `GET /api/weather/airquality?lat=latitude&lon=longitude` - Air quality
- `GET /api/weather/alerts?lat=latitude&lon=longitude` - Weather alerts

### User Endpoints
- `POST /api/favorites` - Add favorite location
- `GET /api/favorites` - Get favorite locations
- `DELETE /api/favorites/:id` - Remove favorite
- `GET /api/history` - Get search history
- `POST /api/preferences` - Save user preferences

## 📊 Weather API Response Example

```json
{
  "current": {
    "temp": 28.5,
    "feels_like": 30.2,
    "humidity": 65,
    "pressure": 1013,
    "wind_speed": 8.5,
    "wind_direction": 230,
    "clouds": 40,
    "weather": {
      "main": "Sunny",
      "description": "Clear sky",
      "icon": "01d"
    },
    "sunrise": 1654748400,
    "sunset": 1654795200
  },
  "forecast": [
    {
      "date": "2026-06-07",
      "temp_max": 31,
      "temp_min": 24,
      "weather": "Sunny",
      "precipitation": 0,
      "wind_speed": 9
    }
  ],
  "airQuality": {
    "aqi": 2,
    "pm25": 12.5,
    "pm10": 25.8,
    "no2": 35.4
  }
}
```

## 🎨 UI Components

### Weather Card
- Location name
- Current temperature
- Weather description with icon
- Feels like temperature
- Wind speed and direction
- Humidity percentage
- Air pressure
- Last updated time

### Forecast Section
- Hourly forecast (next 24 hours)
- 7-day forecast with min/max temps
- Precipitation probability
- Wind conditions

### Air Quality Indicator
- AQI level (1-5)
- PM2.5 and PM10 values
- NO2 levels
- Health recommendations

### Alerts Component
- Severe weather warnings
- Wind alerts
- Temperature extremes
- Air quality alerts

## 🔒 Security Features
- API key encryption
- Rate limiting
- CORS protection
- Input validation
- Request sanitization

## 📱 Mobile Features
- Geolocation tracking
- Background weather updates
- Push notifications
- Offline mode with cached data
- Widget support

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Integration tests
npm run test:integration
```

## 📦 Deployment

### Docker
```bash
docker-compose up -d
```

### Heroku
```bash
git push heroku main
```

### Vercel (Frontend)
```bash
vercel deploy
```

## 📚 Documentation

- [Backend API Docs](./backend/README.md)
- [Frontend Setup Guide](./frontend/README.md)
- [Mobile App Guide](./mobile/README.md)
- [Weather API Integration](./docs/WEATHER_API.md)

## 🌟 Future Enhancements

- [ ] Historical weather data
- [ ] Weather comparing between cities
- [ ] Climate analysis reports
- [ ] Integration with BISMI Expense app
- [ ] Weather-based project recommendations
- [ ] Weather impact on construction schedule
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Voice updates
- [ ] AR weather visualization

## 📄 License

© 2026 Weather Dashboard. All rights reserved.

## 🤝 Support

For issues and feature requests, please create an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: June 6, 2026  
**Status**: In Development