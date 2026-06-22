"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, ShoppingBag, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin" className="text-2xl font-bold text-gray-900 tracking-wide">
            Stash House Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${pathname === '/admin' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${pathname.includes('/admin/products') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}
          >
            <ShoppingBag size={20} />
            <span>Products</span>
          </Link>

          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${pathname.includes('/admin/settings') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}