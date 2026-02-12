"use client";

import { Todo } from "@/types/todo";
import { Check, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            className={`glass group flex items-center justify-between p-5 rounded-2xl transition-all ${todo.completed ? "bg-white/10" : "bg-white/30"
                }`}
        >
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-400 group-hover:border-indigo-500"
                        }`}
                >
                    {todo.completed && <Check size={16} strokeWidth={3} />}
                </button>

                <div className="flex flex-col">
                    <span
                        className={`text-lg font-medium transition-all ${todo.completed ? "text-slate-500 line-through decoration-emerald-500/50" : "text-slate-800"
                            }`}
                    >
                        {todo.text}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
                <Trash2 size={20} />
            </button>
        </motion.div>
    );
}
