'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative mb-8">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="어떤 일을 하실 건가요?"
                className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
                <Plus size={20} className="mr-1" />
                <span className="font-medium">추가</span>
            </motion.button>
        </form>
    );
}
