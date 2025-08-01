"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const saveTheDateStyles = [
  { id: "classic", label: "Classic", count: 18 },
  { id: "modern", label: "Modern", count: 15 },
  { id: "vintage", label: "Vintage", count: 12 },
  { id: "rustic", label: "Rustic", count: 10 },
  { id: "beach", label: "Beach", count: 8 },
  { id: "luxury", label: "Luxury", count: 6 },
  { id: "minimalist", label: "Minimalist", count: 14 },
  { id: "romantic", label: "Romantic", count: 16 }
]

const colorThemes = [
  { id: "rose-gold", label: "Rose Gold", count: 12 },
  { id: "golden", label: "Golden", count: 8 },
  { id: "silver", label: "Silver", count: 10 },
  { id: "blush-pink", label: "Blush Pink", count: 14 },
  { id: "navy-blue", label: "Navy Blue", count: 9 },
  { id: "emerald-green", label: "Emerald Green", count: 7 },
  { id: "purple", label: "Purple", count: 11 },
  { id: "black-white", label: "Black & White", count: 16 }
]

const durationOptions = [
  { id: "25-35", label: "25-35 seconds", count: 20 },
  { id: "35-45", label: "35-45 seconds", count: 18 },
  { id: "45-60", label: "45-60 seconds", count: 12 },
  { id: "60+", label: "60+ seconds", count: 8 }
]

const specialFeatures = [
  { id: "countdown", label: "Countdown Timer", count: 25 },
  { id: "calendar", label: "Calendar Integration", count: 30 },
  { id: "location", label: "Location Details", count: 22 },
  { id: "rsvp", label: "RSVP Integration", count: 18 },
  { id: "social-sharing", label: "Social Sharing", count: 20 },
  { id: "custom-branding", label: "Custom Branding", count: 15 },
  { id: "multi-language", label: "Multi-Language", count: 12 },
  { id: "qr-code", label: "QR Code", count: 16 }
]

const seasonOptions = [
  { id: "spring", label: "Spring", count: 15 },
  { id: "summer", label: "Summer", count: 18 },
  { id: "autumn", label: "Autumn", count: 12 },
  { id: "winter", label: "Winter", count: 10 },
  { id: "all-season", label: "All Season", count: 20 }
]

export function SaveTheDateFilter() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    )
  }

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    )
  }

  const toggleDuration = (durationId: string) => {
    setSelectedDurations(prev => 
      prev.includes(durationId) 
        ? prev.filter(id => id !== durationId)
        : [...prev, durationId]
    )
  }

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const toggleSeason = (seasonId: string) => {
    setSelectedSeasons(prev => 
      prev.includes(seasonId) 
        ? prev.filter(id => id !== seasonId)
        : [...prev, seasonId]
    )
  }

  const clearAllFilters = () => {
    setSelectedStyles([])
    setSelectedColors([])
    setSelectedDurations([])
    setSelectedFeatures([])
    setSelectedSeasons([])
    setPriceRange([0, 10000])
  }

  const hasActiveFilters = selectedStyles.length > 0 || selectedColors.length > 0 || 
                          selectedDurations.length > 0 || selectedFeatures.length > 0 ||
                          selectedSeasons.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Save the Date Style */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Save the Date Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {saveTheDateStyles.map((style) => (
            <div key={style.id} className="flex items-center space-x-2">
              <Checkbox
                id={style.id}
                checked={selectedStyles.includes(style.id)}
                onCheckedChange={() => toggleStyle(style.id)}
              />
              <Label htmlFor={style.id} className="text-sm flex-1 cursor-pointer">
                {style.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {style.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Color Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Color Theme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colorThemes.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={color.id}
                checked={selectedColors.includes(color.id)}
                onCheckedChange={() => toggleColor(color.id)}
              />
              <Label htmlFor={color.id} className="text-sm flex-1 cursor-pointer">
                {color.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {color.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Season */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Season</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {seasonOptions.map((season) => (
            <div key={season.id} className="flex items-center space-x-2">
              <Checkbox
                id={season.id}
                checked={selectedSeasons.includes(season.id)}
                onCheckedChange={() => toggleSeason(season.id)}
              />
              <Label htmlFor={season.id} className="text-sm flex-1 cursor-pointer">
                {season.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {season.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Duration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {durationOptions.map((duration) => (
            <div key={duration.id} className="flex items-center space-x-2">
              <Checkbox
                id={duration.id}
                checked={selectedDurations.includes(duration.id)}
                onCheckedChange={() => toggleDuration(duration.id)}
              />
              <Label htmlFor={duration.id} className="text-sm flex-1 cursor-pointer">
                {duration.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {duration.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Special Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specialFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={feature.id}
                checked={selectedFeatures.includes(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
              <Label htmlFor={feature.id} className="text-sm flex-1 cursor-pointer">
                {feature.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {feature.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedStyles.map(style => (
                <Badge key={style} variant="outline" className="text-xs">
                  {saveTheDateStyles.find(s => s.id === style)?.label}
                </Badge>
              ))}
              {selectedColors.map(color => (
                <Badge key={color} variant="outline" className="text-xs">
                  {colorThemes.find(c => c.id === color)?.label}
                </Badge>
              ))}
              {selectedSeasons.map(season => (
                <Badge key={season} variant="outline" className="text-xs">
                  {seasonOptions.find(s => s.id === season)?.label}
                </Badge>
              ))}
              {selectedDurations.map(duration => (
                <Badge key={duration} variant="outline" className="text-xs">
                  {durationOptions.find(d => d.id === duration)?.label}
                </Badge>
              ))}
              {selectedFeatures.map(feature => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {specialFeatures.find(f => f.id === feature)?.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}