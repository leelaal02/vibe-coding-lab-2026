import axios from 'axios';
import { Product } from '@/types/product';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const productApi = {
    getAll: () => api.get<Product[]>('/products').then(res => res.data),
    getById: (id: number) => api.get<Product>(`/products/${id}`).then(res => res.data),
    create: (product: Omit<Product, 'id'>) => api.post<Product>('/products', product).then(res => res.data),
    update: (id: number, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product).then(res => res.data),
    delete: (id: number) => api.delete(`/products/${id}`).then(res => res.data),
};
