import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopping Mall",
  description: "Simple shopping mall backend & frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-slate-50 min-h-screen text-slate-900">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Vibe Mall
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-slate-500">
            &copy; 2026 Vibe Coding Lab. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
