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
  { id: "uuid10", title: 'Classic Lamp', unitPrice: 29.99, description: 'A warm desk lamp', image: '', thumbnail: '', availableQuantity:5},
  { id: "uuid29", title: 'Modern Chair', unitPrice: 129.99, description: 'Comfortable and stylish', image: '', thumbnail:'', availableQuantity:33},
  { id: "uuid33", title: 'Coffee Mug', unitPrice: 9.99, description: 'Ceramic mug', image: '',thumbnail:'', availableQuantity:15},
  { id: "uuid34", title: 'Labtop', unitPrice: 499, description: 'Labtop', image: '',thumbnail:'', availableQuantity:3},
]
