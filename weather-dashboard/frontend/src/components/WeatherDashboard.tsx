import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  clouds: number;
}

interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  description: string;
  precipitation: number;
  windSpeed: number;
  icon: string;
}

interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
}

interface DashboardState {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  airQuality: AirQuality | null;
  loading: boolean;
  error: string | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
}

const WeatherDashboard: React.FC = () => {
  const [state, setState] = React.useState<DashboardState>({
    currentWeather: null,
    forecast: [],
    airQuality: null,
    loading: false,
    error: null,
    location: '',
    latitude: null,
    longitude: null
  });

  // Fetch weather data
  const fetchWeatherData = async (lat: number, lon: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      
      // Fetch current weather and forecast
      const weatherRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/current?lat=${lat}&lon=${lon}`
      );
      
      // Fetch air quality
      const airQualityRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/airquality?lat=${lat}&lon=${lon}`
      );

      setState(prev => ({
        ...prev,
        currentWeather: weatherRes.data.current,
        forecast: weatherRes.data.forecast,
        airQuality: airQualityRes.data,
        latitude: lat,
        longitude: lon,
        loading: false
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to fetch weather data',
        loading: false
      }));
    }
  };

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Fallback to Dubai
          fetchWeatherData(25.2048, 55.2708);
        }
      );
    }
  }, []);

  const getAQILabel = (aqi: number): string => {
    const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return labels[aqi - 1] || 'Unknown';
  };

  const getWeatherIcon = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Weather Dashboard</h1>
          <p className="text-blue-100 text-lg">Real-time weather and forecasts</p>
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="max-w-7xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {state.error}
        </div>
      )}

      {/* Loading State */}
      {state.loading && (
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading weather data...</p>
        </div>
      )}

      {/* Main Content */}
      {!state.loading && state.currentWeather && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {state.location || 'Current Location'}
                </h2>
                <p className="text-gray-500">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <img
                src={getWeatherIcon(state.currentWeather.icon)}
                alt="Weather Icon"
                className="w-32 h-32"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Temperature Section */}
              <div>
                <div className="text-7xl font-bold text-blue-600 mb-4">
                  {Math.round(state.currentWeather.temp)}°C
                </div>
                <p className="text-2xl text-gray-600 mb-2">
                  {state.currentWeather.description}
                </p>
                <p className="text-lg text-gray-500">
                  Feels like {Math.round(state.currentWeather.feelsLike)}°C
                </p>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Humidity</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.currentWeather.humidity}%
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Pressure</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.currentWeather.pressure} mb
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Wind Speed</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.currentWeather.windSpeed.toFixed(1)} m/s
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Cloud Cover</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.currentWeather.clouds}%
                  </p>
                </div>
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t-2 border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">Sunrise</p>
                <p className="text-2xl font-bold text-orange-500">
                  {formatTime(state.currentWeather.sunrise)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm font-semibold mb-2">Sunset</p>
                <p className="text-2xl font-bold text-orange-500">
                  {formatTime(state.currentWeather.sunset)}
                </p>
              </div>
            </div>
          </div>

          {/* Air Quality Card */}
          {state.airQuality && (
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Air Quality</h3>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600 font-semibold">AQI Level</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {state.airQuality.aqi}
                  </p>
                </div>
                <p className="text-lg text-gray-700 font-bold">
                  {getAQILabel(state.airQuality.aqi)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">PM2.5</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.airQuality.pm25.toFixed(1)} μg/m³
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">PM10</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.airQuality.pm10.toFixed(1)} μg/m³
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">NO₂</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.airQuality.no2.toFixed(1)} μg/m³
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">O₃</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {state.airQuality.o3.toFixed(1)} μg/m³
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7-Day Forecast */}
      {state.forecast.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {state.forecast.map((day, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
                  <p className="font-semibold text-gray-800 mb-3">{day.date}</p>
                  <img
                    src={getWeatherIcon(day.icon)}
                    alt="Weather"
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-3">{day.description}</p>
                  <div className="flex justify-center gap-2 mb-2">
                    <span className="text-lg font-bold text-red-500">{day.tempMax}°</span>
                    <span className="text-lg font-bold text-blue-500">{day.tempMin}°</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    💧 {day.precipitation}% | 💨 {day.windSpeed} m/s
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;