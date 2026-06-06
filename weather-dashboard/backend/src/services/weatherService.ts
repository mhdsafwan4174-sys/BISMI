import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

interface WeatherResponse {
  current: any;
  forecast: any[];
  airQuality: any;
}

class WeatherService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
  }

  /**
   * Get current weather data
   */
  async getCurrentWeather(latitude: number, longitude: number): Promise<any> {
    const cacheKey = `weather_${latitude}_${longitude}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data/2.5/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const weatherData = {
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        windDirection: response.data.wind.deg,
        description: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        clouds: response.data.clouds.all,
        city: response.data.name,
        country: response.data.sys.country
      };

      cache.set(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather data');
    }
  }

  /**
   * Get weather forecast for next 7 days
   */
  async getForecast(latitude: number, longitude: number): Promise<any[]> {
    const cacheKey = `forecast_${latitude}_${longitude}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data/2.5/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const forecast = response.data.list
        .filter((_: any, index: number) => index % 8 === 0) // Get daily forecast
        .map((day: any) => ({
          date: new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          tempMax: Math.round(day.main.temp_max),
          tempMin: Math.round(day.main.temp_min),
          description: day.weather[0].main,
          icon: day.weather[0].icon,
          precipitation: day.pop ? Math.round(day.pop * 100) : 0,
          windSpeed: day.wind.speed,
          humidity: day.main.humidity
        }));

      cache.set(cacheKey, forecast);
      return forecast;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch weather forecast');
    }
  }

  /**
   * Get air quality data
   */
  async getAirQuality(latitude: number, longitude: number): Promise<any> {
    const cacheKey = `airquality_${latitude}_${longitude}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data/3.0/air_pollution`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey
        }
      });

      const data = response.data.list[0];
      const airQuality = {
        aqi: data.main.aqi,
        pm25: data.components.pm2_5,
        pm10: data.components.pm10,
        no2: data.components.no2,
        so2: data.components.so2,
        o3: data.components.o3,
        co: data.components.co,
        nh3: data.components.nh3
      };

      cache.set(cacheKey, airQuality);
      return airQuality;
    } catch (error) {
      console.error('Error fetching air quality:', error);
      // Return default/empty air quality if API fails
      return {
        aqi: 0,
        pm25: 0,
        pm10: 0,
        no2: 0,
        so2: 0,
        o3: 0
      };
    }
  }

  /**
   * Search city by name
   */
  async searchCity(city: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/geo/1.0/direct`, {
        params: {
          q: city,
          limit: 5,
          appid: this.apiKey
        }
      });

      return response.data.map((location: any) => ({
        name: location.name,
        country: location.country,
        latitude: location.lat,
        longitude: location.lon,
        state: location.state || ''
      }));
    } catch (error) {
      console.error('Error searching city:', error);
      throw new Error('Failed to search city');
    }
  }

  /**
   * Get weather by city name
   */
  async getWeatherByCity(city: string): Promise<WeatherResponse> {
    try {
      const locations = await this.searchCity(city);
      if (locations.length === 0) {
        throw new Error('City not found');
      }

      const location = locations[0];
      const [current, forecast, airQuality] = await Promise.all([
        this.getCurrentWeather(location.latitude, location.longitude),
        this.getForecast(location.latitude, location.longitude),
        this.getAirQuality(location.latitude, location.longitude)
      ]);

      return { current, forecast, airQuality };
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  }

  /**
   * Get complete weather data (current + forecast + air quality)
   */
  async getCompleteWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
    try {
      const [current, forecast, airQuality] = await Promise.all([
        this.getCurrentWeather(latitude, longitude),
        this.getForecast(latitude, longitude),
        this.getAirQuality(latitude, longitude)
      ]);

      return { current, forecast, airQuality };
    } catch (error) {
      console.error('Error fetching complete weather data:', error);
      throw error;
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    cache.flushAll();
  }
}

export default new WeatherService();