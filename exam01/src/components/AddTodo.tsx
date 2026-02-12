"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText("");
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="flex gap-3 w-full max-w-2xl mx-auto mb-10 group"
        >
            <div className="relative flex-1">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="어떤 일을 하실 건가요?"
                    className="glass-input w-full px-8 py-5 rounded-[1.5rem] text-slate-800 placeholder:text-slate-400 text-lg shadow-inner"
                />
                <div className="absolute inset-0 rounded-[1.5rem] pointer-events-none border border-white/20" />
            </div>
            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-5 rounded-[1.5rem] transition-all premium-shadow flex items-center gap-2 font-bold text-lg"
            >
                <Plus size={24} strokeWidth={3} />
                <span>추가</span>
            </motion.button>
        </motion.form>
    );
}
