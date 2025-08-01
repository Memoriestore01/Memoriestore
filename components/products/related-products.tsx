import { ProductGrid } from "./product-grid"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

// Fetch related products from API
const getRelatedProducts = async (categoryId: string, currentProductId: string) => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products?category=${categoryId.toLowerCase()}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    // Filter out the current product and return up to 4 related products
    return data.products
      .filter((product: any) => product._id !== currentProductId)
      .slice(0, 4)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(categoryId, currentProductId)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <ProductGrid products={relatedProducts} />
    </section>
  )
}
