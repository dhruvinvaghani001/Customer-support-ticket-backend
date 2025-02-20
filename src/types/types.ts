export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  role_id: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number | null;
  createdAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  createdAt: Date;
}
