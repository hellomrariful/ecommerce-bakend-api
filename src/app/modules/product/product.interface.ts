export interface TVariant {
  type: string;
  value: string;
}
export interface TInventory {
  quantity: number;
  inStock: boolean;
}
export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants: Array<TVariant>;
  inventory: TInventory;
}
