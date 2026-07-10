export interface ProductBase {
  id: string;
  title: string;
  unitPrice: number;
  thumbnail: string;
}

export interface Product extends ProductBase {
  description: string;
  image?: string;
  availableQuantity: number;
  isAvailabled?: boolean;
}

export const sampleProducts: Product[] = [
  { id: "uuid2", title: 'Classic Lamp', unitPrice: 29.99, description: 'A warm desk lamp', image: '', thumbnail: '', availableQuantity:5},
  { id: "uuid3", title: 'Modern Chair', unitPrice: 129.99, description: 'Comfortable and stylish', image: '', thumbnail:'', availableQuantity:33},
  { id: "uuid1", title: 'Coffee Mug', unitPrice: 9.99, description: 'Ceramic mug', image: '',thumbnail:'', availableQuantity:15},
]
