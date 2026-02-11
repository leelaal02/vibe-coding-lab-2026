'use client';

import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            className="group flex items-center gap-4 p-4 mb-3 rounded-2xl glass transition-all"
        >
            <button
                onClick={() => onToggle(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
                    }`}
            >
                {todo.completed && <Check size={14} strokeWidth={3} />}
            </button>

            <span
                className={`flex-1 text-lg transition-all ${todo.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
            >
                {todo.text}
            </span>

            <button
                onClick={() => onDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
            >
                <Trash2 size={18} />
            </button>
        </motion.div>
    );
}
