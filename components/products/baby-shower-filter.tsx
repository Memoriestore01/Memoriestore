"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const genderOptions = [
  { id: "boy", label: "Boy", count: 18 },
  { id: "girl", label: "Girl", count: 20 },
  { id: "gender-neutral", label: "Gender Neutral", count: 25 },
  { id: "surprise", label: "Gender Surprise", count: 12 }
]

const babyShowerThemes = [
  { id: "princess", label: "Princess", count: 15 },
  { id: "adventure", label: "Adventure", count: 12 },
  { id: "woodland", label: "Woodland", count: 10 },
  { id: "ocean", label: "Ocean", count: 8 },
  { id: "space", label: "Space", count: 6 },
  { id: "jungle", label: "Jungle", count: 9 },
  { id: "fairy-tale", label: "Fairy Tale", count: 11 },
  { id: "sports", label: "Sports", count: 7 },
  { id: "elegant", label: "Elegant", count: 14 },
  { id: "rustic", label: "Rustic", count: 8 }
]

const colorSchemes = [
  { id: "pink", label: "Pink", count: 20 },
  { id: "blue", label: "Blue", count: 18 },
  { id: "yellow", label: "Yellow", count: 12 },
  { id: "green", label: "Green", count: 10 },
  { id: "purple", label: "Purple", count: 14 },
  { id: "golden", label: "Golden", count: 8 },
  { id: "rainbow", label: "Rainbow", count: 15 },
  { id: "pastel", label: "Pastel", count: 22 },
  { id: "neutral", label: "Neutral", count: 16 }
]

const durationOptions = [
  { id: "20-30", label: "20-30 seconds", count: 25 },
  { id: "30-40", label: "30-40 seconds", count: 20 },
  { id: "40-50", label: "40-50 seconds", count: 12 },
  { id: "50+", label: "50+ seconds", count: 8 }
]

const specialFeatures = [
  { id: "countdown", label: "Due Date Countdown", count: 30 },
  { id: "registry", label: "Registry Information", count: 25 },
  { id: "rsvp", label: "RSVP Integration", count: 28 },
  { id: "location", label: "Location Details", count: 22 },
  { id: "gift-info", label: "Gift Information", count: 20 },
  { id: "music", label: "Lullaby Music", count: 18 },
  { id: "animation", label: "Baby Animations", count: 24 },
  { id: "photo-gallery", label: "Photo Gallery", count: 16 }
]

export function BabyShowerFilter() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

  const toggleGender = (genderId: string) => {
    setSelectedGenders(prev => 
      prev.includes(genderId) 
        ? prev.filter(id => id !== genderId)
        : [...prev, genderId]
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
    setSelectedGenders([])
    setSelectedThemes([])
    setSelectedColors([])
    setSelectedDurations([])
    setSelectedFeatures([])
    setPriceRange([0, 10000])
  }

  const hasActiveFilters = selectedGenders.length > 0 || selectedThemes.length > 0 || 
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

      {/* Gender */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gender</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {genderOptions.map((gender) => (
            <div key={gender.id} className="flex items-center space-x-2">
              <Checkbox
                id={gender.id}
                checked={selectedGenders.includes(gender.id)}
                onCheckedChange={() => toggleGender(gender.id)}
              />
              <Label htmlFor={gender.id} className="text-sm flex-1 cursor-pointer">
                {gender.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {gender.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Baby Shower Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Baby Shower Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {babyShowerThemes.map((theme) => (
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
              {selectedGenders.map(gender => (
                <Badge key={gender} variant="outline" className="text-xs">
                  {genderOptions.find(g => g.id === gender)?.label}
                </Badge>
              ))}
              {selectedThemes.map(theme => (
                <Badge key={theme} variant="outline" className="text-xs">
                  {babyShowerThemes.find(t => t.id === theme)?.label}
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