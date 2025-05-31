"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react"

export function WeatherWidget() {
  // Mock weather data
  const weather = {
    location: "San Francisco, CA",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="w-64">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{weather.location}</p>
            <div className="flex items-center gap-1 mt-1">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-bold">{weather.temperature}°F</span>
            </div>
            <p className="text-xs text-muted-foreground">{weather.condition}</p>
          </div>
          <div className="text-right">
            {getWeatherIcon(weather.condition)}
            <div className="text-xs text-muted-foreground mt-1">
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {weather.windSpeed} mph</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
