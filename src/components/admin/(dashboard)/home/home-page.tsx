"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Package,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  List,
} from "lucide-react";

type Stats = {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
};

export default function DashboardLayout({ stats }: { stats: Stats }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", href: "/home", icon: LayoutDashboard },
    { label: "Orders", href: "/orders", icon: ShoppingCart },
    { label: "Products", href: "/products", icon: Package },
    { label: "Product Categories", href: "/categories", icon: List },
    { label: "Users", href: "/users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="relative z-50 w-64 bg-white border-r border-black h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-xl">Admin</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
          <button className="flex items-center gap-2 px-3 py-2 mt-6 border border-black rounded hover:bg-gray-100">
            <LogOut size={18} />
            Logout
          </button>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-black p-4">
        <h1 className="font-bold text-xl mb-6">Admin</h1>
        <nav className="flex-1 space-y-2">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-2 px-3 py-2 mt-6 border border-black rounded hover:bg-gray-100">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between border-b border-black p-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="font-semibold text-lg">Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
              A
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition">
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-green-50 to-white hover:shadow-md transition">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-green-600 text-lg font-bold">R</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">R {stats.totalRevenue}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition">
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-yellow-50 to-white hover:shadow-md transition">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
