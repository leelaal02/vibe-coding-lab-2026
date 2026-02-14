'use client';

import { useEffect, useState } from 'react';
import { productApi } from '@/lib/api';
import { Product } from '@/types/product';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function ProductFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id ? Number(params.id) : null;
    const isEdit = !!id;

    const [form, setForm] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        description: '',
        stockQuantity: 0,
    });
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEdit) {
            productApi.getById(id)
                .then(data => {
                    setForm({
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        stockQuantity: data.stockQuantity,
                    });
                })
                .catch(err => {
                    console.error(err);
                    alert('상품 정보를 불러오는데 실패했습니다.');
                    router.push('/');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEdit, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEdit) {
                await productApi.update(id, form);
            } else {
                await productApi.create(form);
            }
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('저장에 실패했습니다.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-slate-500">불러오는 중...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-2xl font-bold">{isEdit ? '상품 수정' : '새 상품 등록'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">상품명</label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="상품 명칭을 입력하세요"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">가격 (원)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={form.price}
                            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">재고 수량</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={form.stockQuantity}
                            onChange={e => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">상품 설명</label>
                    <textarea
                        rows={5}
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                        placeholder="상품에 대한 상세 설명을 입력하세요"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-slate-300 transition"
                >
                    {saving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
                    {isEdit ? '수정 완료' : '등록 하기'}
                </button>
            </form>
        </div>
    );
}
