'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { productApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, Package, ExternalLink, Trash2, Edit } from 'lucide-react';

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    try {
      await productApi.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">상품 목록을 불러오는 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-blue-600" /> 상품 목록
        </h2>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> 상품 추가
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 py-20 text-center text-slate-500">
          등록된 상품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 truncate">{product.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price.toLocaleString()}원
                  </span>
                  <span className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-600">
                    재고: {product.stockQuantity}개
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center justify-center gap-1 text-sm border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition"
                  >
                    <ExternalLink size={16} /> 상세
                  </Link>
                  <Link
                    href={`/products/edit/${product.id}`}
                    className="flex items-center justify-center gap-1 text-sm border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition"
                  >
                    <Edit size={16} /> 수정
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-1 text-sm border border-red-100 text-red-600 rounded-lg py-2 hover:bg-red-50 transition"
                  >
                    <Trash2 size={16} /> 삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
