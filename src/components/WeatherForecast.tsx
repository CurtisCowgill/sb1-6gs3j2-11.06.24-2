import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  type LucideIcon
} from 'lucide-react';

interface WeatherDay {
  date: string;
  condition: string;
  highTemp: number;
  lowTemp: number;
}

interface WeatherForecastProps {
  forecast: WeatherDay[];
}

const getWeatherIcon = (condition: string): LucideIcon => {
  const weatherCondition = condition?.toLowerCase() || '';
  
  switch (weatherCondition) {
    case 'sunny':
    case 'clear':
      return Sun;
    case 'cloudy':
    case 'partly cloudy':
      return Cloud;
    case 'rain':
    case 'showers':
      return CloudRain;
    case 'snow':
      return CloudSnow;
    case 'thunderstorm':
      return CloudLightning;
    case 'drizzle':
      return CloudDrizzle;
    default:
      return Sun;
  }
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {forecast.map((day, index) => {
        const WeatherIcon = getWeatherIcon(day.condition);
        return (
          <div 
            key={index}
            className="flex flex-col items-center bg-gray-50 rounded-lg p-1 text-xs"
          >
            <span className="font-medium text-gray-700">{day.date}</span>
            <WeatherIcon className="h-4 w-4 text-gray-600 my-1" />
            <div className="text-gray-600">
              <span className="font-medium">{day.highTemp}°</span>
              <span className="mx-0.5">/</span>
              <span>{day.lowTemp}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherForecast;