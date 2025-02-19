export interface Category {
  id: string;
  name: string;
  parentCategoryId?: string | null;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  createdAt: Date;
}
