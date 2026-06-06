import { Router, Request, Response } from 'express';
import weatherService from '../services/weatherService';

const router = Router();

/**
 * Get current weather by coordinates
 * GET /api/weather/current?lat=latitude&lon=longitude
 */
router.get('/current', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Latitude and longitude are required'
      });
    }

    const current = await weatherService.getCurrentWeather(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    res.json({ current });
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * Get 7-day forecast by coordinates
 * GET /api/weather/forecast?lat=latitude&lon=longitude
 */
router.get('/forecast', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Latitude and longitude are required'
      });
    }

    const forecast = await weatherService.getForecast(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    res.json({ forecast });
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * Get air quality data by coordinates
 * GET /api/weather/airquality?lat=latitude&lon=longitude
 */
router.get('/airquality', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Latitude and longitude are required'
      });
    }

    const airQuality = await weatherService.getAirQuality(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    res.json(airQuality);
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * Search city by name
 * GET /api/weather/search?q=city_name
 */
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Search query is required'
      });
    }

    const results = await weatherService.searchCity(q as string);

    res.json({ results });
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

/**
 * Get weather by city name
 * GET /api/weather/city?city=city_name
 */
router.get('/city', async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'City name is required'
      });
    }

    const weatherData = await weatherService.getWeatherByCity(city as string);

    res.json(weatherData);
  } catch (error: any) {
    res.status(404).json({
      error: 'Not Found',
      message: error.message
    });
  }
});

/**
 * Get complete weather data (current + forecast + air quality)
 * GET /api/weather/complete?lat=latitude&lon=longitude
 */
router.get('/complete', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Latitude and longitude are required'
      });
    }

    const weatherData = await weatherService.getCompleteWeather(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );

    res.json(weatherData);
  } catch (error: any) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;