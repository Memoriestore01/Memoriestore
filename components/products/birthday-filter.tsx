"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const ageGroups = [
  { id: "kids", label: "Kids (0-12)", count: 25 },
  { id: "teen", label: "Teen (13-19)", count: 15 },
  { id: "adult", label: "Adult (20+)", count: 20 },
  { id: "milestone", label: "Milestone Ages", count: 12 }
]

const birthdayThemes = [
  { id: "superhero", label: "Superhero", count: 8 },
  { id: "princess", label: "Princess", count: 6 },
  { id: "sports", label: "Sports", count: 10 },
  { id: "animals", label: "Animals", count: 7 },
  { id: "space", label: "Space", count: 5 },
  { id: "unicorn", label: "Unicorn", count: 4 },
  { id: "dinosaur", label: "Dinosaur", count: 6 },
  { id: "fairy-tale", label: "Fairy Tale", count: 8 },
  { id: "elegant", label: "Elegant", count: 12 },
  { id: "funny", label: "Funny", count: 9 }
]

const colorSchemes = [
  { id: "rainbow", label: "Rainbow", count: 15 },
  { id: "pink-purple", label: "Pink & Purple", count: 12 },
  { id: "blue-green", label: "Blue & Green", count: 10 },
  { id: "red-orange", label: "Red & Orange", count: 8 },
  { id: "pastel", label: "Pastel Colors", count: 14 },
  { id: "neon", label: "Neon Colors", count: 6 },
  { id: "golden", label: "Golden", count: 7 },
  { id: "black-white", label: "Black & White", count: 5 }
]

const durationOptions = [
  { id: "15-20", label: "15-20 seconds", count: 18 },
  { id: "20-30", label: "20-30 seconds", count: 22 },
  { id: "30-45", label: "30-45 seconds", count: 12 },
  { id: "45+", label: "45+ seconds", count: 8 }
]

const specialFeatures = [
  { id: "music", label: "Birthday Music", count: 30 },
  { id: "animation", label: "Fun Animations", count: 25 },
  { id: "countdown", label: "Age Countdown", count: 15 },
  { id: "photo-gallery", label: "Photo Gallery", count: 20 },
  { id: "confetti", label: "Confetti Effects", count: 18 },
  { id: "balloons", label: "Balloon Effects", count: 16 },
  { id: "cake", label: "Cake Animation", count: 12 },
  { id: "gifts", label: "Gift Animations", count: 10 }
]

export function BirthdayFilter() {
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])

  const toggleAgeGroup = (ageId: string) => {
    setSelectedAgeGroups(prev => 
      prev.includes(ageId) 
        ? prev.filter(id => id !== ageId)
        : [...prev, ageId]
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
    setSelectedAgeGroups([])
    setSelectedThemes([])
    setSelectedColors([])
    setSelectedDurations([])
    setSelectedFeatures([])
    setPriceRange([0, 10000])
  }

  const hasActiveFilters = selectedAgeGroups.length > 0 || selectedThemes.length > 0 || 
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

      {/* Age Group */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Age Group</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ageGroups.map((age) => (
            <div key={age.id} className="flex items-center space-x-2">
              <Checkbox
                id={age.id}
                checked={selectedAgeGroups.includes(age.id)}
                onCheckedChange={() => toggleAgeGroup(age.id)}
              />
              <Label htmlFor={age.id} className="text-sm flex-1 cursor-pointer">
                {age.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {age.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Birthday Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Birthday Themes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {birthdayThemes.map((theme) => (
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
              {selectedAgeGroups.map(age => (
                <Badge key={age} variant="outline" className="text-xs">
                  {ageGroups.find(a => a.id === age)?.label}
                </Badge>
              ))}
              {selectedThemes.map(theme => (
                <Badge key={theme} variant="outline" className="text-xs">
                  {birthdayThemes.find(t => t.id === theme)?.label}
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