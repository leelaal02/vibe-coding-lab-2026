"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import AddTodo from "@/components/AddTodo";
import TodoItem from "@/components/TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutList, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("vibe-todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("vibe-todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl mt-16 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/40 glass mb-8 premium-shadow"
        >
          <LayoutList size={40} className="text-indigo-600" strokeWidth={2.5} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-[900] text-slate-900 tracking-tighter"
        >
          VIBE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">TODO</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-slate-500 text-xl font-medium"
        >
          단순한 기록을 넘어, 즐거운 동기부여를 느껴보세요
        </motion.p>
      </div>

      <div className="w-full max-w-2xl">
        <AddTodo onAdd={addTodo} />

        {/* Progress Display */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card mb-12 p-8 border-white/60"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold text-slate-800 tracking-tight">Daily Progress</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-indigo-600">
                  {Math.round(progress)}%
                </span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {completedCount} OF {todos.length} TASKS
                </p>
              </div>
            </div>
            <div className="h-3 w-full bg-slate-200/50 rounded-full overflow-hidden p-[2px] border border-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]"
              />
            </div>
          </motion.div>
        )}

        {/* Todo List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm"
              >
                <p className="text-slate-400 text-lg">아직 등록된 할 일이 없습니다.</p>
                <p className="text-slate-400 text-sm mt-1">새로운 할 일을 추가해보세요!</p>
              </motion.div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-20 text-slate-400 text-sm pb-8">
        © 2026 Premium Vibe Todo App. Designed for Excellence.
      </footer>
    </main>
  );
}
