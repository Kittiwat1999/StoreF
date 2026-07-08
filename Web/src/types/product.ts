export interface Product {
  id: number;
  title: string;
  unitPrice: number;
  image?: string;
  thumbnail?: string;
  description?: string;
  availableQuantity: number;
  isAvailabled?: boolean;
}

export const sampleProducts: Product[] = [
  { id: 1, title: 'Classic Lamp', unitPrice: 29.99, description: 'A warm desk lamp', image: '', availableQuantity: 5 },
  { id: 2, title: 'Modern Chair', unitPrice: 129.99, description: 'Comfortable and stylish', image: '', availableQuantity: 10 },
  { id: 3, title: 'Coffee Mug', unitPrice: 9.99, description: 'Ceramic mug', image: '', availableQuantity: 20 },
]
