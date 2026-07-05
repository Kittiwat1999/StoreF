export interface Product {
  id: string | number
  title: string
  price: number
  image?: string
  description?: string
  availableQuantity: number
}

export const sampleProducts: Product[] = [
  { id: 1, title: 'Classic Lamp', price: 29.99, description: 'A warm desk lamp', image: '', availableQuantity: 5 },
  { id: 2, title: 'Modern Chair', price: 129.99, description: 'Comfortable and stylish', image: '', availableQuantity: 10 },
  { id: 3, title: 'Coffee Mug', price: 9.99, description: 'Ceramic mug', image: '', availableQuantity: 20 },
]
