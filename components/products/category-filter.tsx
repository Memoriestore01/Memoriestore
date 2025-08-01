import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "All", slug: "all", count: 120 },
  { name: "Wedding", slug: "wedding", count: 25 },
  { name: "Birthday", slug: "birthday", count: 20 },
  { name: "Invitations Cards", slug: "invitations", count: 18 },
  { name: "House Party", slug: "house-party", count: 15 },
  { name: "Baby Shower", slug: "baby-shower", count: 12 },
  { name: "Save the Date", slug: "save-the-date", count: 10 },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.slug}
          variant={selectedCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.slug)}
          className="flex items-center gap-2"
        >
          {category.name}
          <Badge variant="secondary" className="text-xs">
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  )
}
