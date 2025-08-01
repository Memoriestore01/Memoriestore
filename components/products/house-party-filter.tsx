"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const partyTypes = [
  { id: "casual", label: "Casual", count: 25 },
  { id: "formal", label: "Formal", count: 12 },
  { id: "semi-formal", label: "Semi-Formal", count: 18 },
  { id: "themed", label: "Themed", count: 15 },
  { id: "intimate", label: "Intimate", count: 10 }
]

const partyThemes = [
  { id: "game-night", label: "Game Night", count: 12 },
  { id: "dinner-party", label: "Dinner Party", count: 18 },
  { id: "cocktail-party", label: "Cocktail Party", count: 14 },
  { id: "movie-night", label: "Movie Night", count: 10 },
  { id: "potluck", label: "Potluck", count: 8 },
  { id: "bbq", label: "BBQ", count: 6 },
  { id: "wine-tasting", label: "Wine Tasting", count: 7 },
  { id: "karaoke", label: "Karaoke", count: 5 },
  { id: "dance-party", label: "Dance Party", count: 9 },
  { id: "book-club", label: "Book Club", count: 4 }
]

const colorSchemes = [
  { id: "warm", label: "Warm Colors", count: 20 },
  { id: "cool", label: "Cool Colors", count: 15 },
  { id: "neutral", label: "Neutral", count: 12 },
  { id: "bright", label: "Bright & Bold", count: 18 },
  { id: "pastel", label: "Pastel", count: 14 },
  { id: "monochrome", label: "Monochrome", count: 8 },
  { id: "gradient", label: "Gradient", count: 16 },
  { id: "vintage", label: "Vintage", count: 10 }
]

const durationOptions = [
  { id: "15-20", label: "15-20 seconds", count: 22 },
  { id: "20-30", label: "20-30 seconds", count: 28 },
  { id: "30-45", label: "30-45 seconds", count: 15 },
  { id: "45+", label: "45+ seconds", count: 8 }
]

const specialFeatures = [
  { id: "music", label: "Background Music", count: 35 },
  { id: "animation", label: "Fun Animations", count: 25 },
  { id: "countdown", label: "Countdown Timer", count: 18 },
  { id: "rsvp", label: "RSVP Integration", count: 30 },
  { id: "location", label: "Location Details", count: 22 },
  { id: "dress-code", label: "Dress Code Info", count: 15 },
  { id: "food-info", label: "Food Information", count: 20 },
  { id: "gift-info", label: "Gift Information", count: 12 }
]

export function HousePartyFilter() {
  const [selectedPartyTypes, setSelectedPartyTypes] = useState<string[]>([])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

  const togglePartyType = (typeId: string) => {
    setSelectedPartyTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  const toggleTheme = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId) 
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
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

  const clearAllFilters = () => {
    setSelectedPartyTypes([])
    setSelectedThemes([])
    setSelectedColors([])
    setSelectedDurations([])
    setSelectedFeatures([])
    setPriceRange([0, 10000])
  }

  const hasActiveFilters = selectedPartyTypes.length > 0 || selectedThemes.length > 0 || 
                          selectedColors.length > 0 || selectedDurations.length > 0 || 
                          selectedFeatures.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000

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

      {/* Party Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Party Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {partyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedPartyTypes.includes(type.id)}
                onCheckedChange={() => togglePartyType(type.id)}
              />
              <Label htmlFor={type.id} className="text-sm flex-1 cursor-pointer">
                {type.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {type.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Party Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Party Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {partyThemes.map((theme) => (
            <div key={theme.id} className="flex items-center space-x-2">
              <Checkbox
                id={theme.id}
                checked={selectedThemes.includes(theme.id)}
                onCheckedChange={() => toggleTheme(theme.id)}
              />
              <Label htmlFor={theme.id} className="text-sm flex-1 cursor-pointer">
                {theme.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {theme.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Color Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Color Schemes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colorSchemes.map((color) => (
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
              {selectedPartyTypes.map(type => (
                <Badge key={type} variant="outline" className="text-xs">
                  {partyTypes.find(t => t.id === type)?.label}
                </Badge>
              ))}
              {selectedThemes.map(theme => (
                <Badge key={theme} variant="outline" className="text-xs">
                  {partyThemes.find(t => t.id === theme)?.label}
                </Badge>
              ))}
              {selectedColors.map(color => (
                <Badge key={color} variant="outline" className="text-xs">
                  {colorSchemes.find(c => c.id === color)?.label}
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