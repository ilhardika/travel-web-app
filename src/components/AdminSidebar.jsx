import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Database,
  LayoutPanelTop,
  Plane,
  Tag,
  ShoppingCart,
  Image,
  ChevronDown,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const activeClassName = "bg-blue-600 text-white";
  const inactiveClassName = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" />
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-6 py-3 transition-colors ${
              isActive ? activeClassName : inactiveClassName
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <div className="mt-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Management Data
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="bg-gray-800 py-2">
              <NavLink
                to="/admin/user-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <Users className="w-4 h-4" />
                Manajemen Pengguna
              </NavLink>
              <NavLink
                to="/admin/category-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <LayoutPanelTop className="w-4 h-4" />
                Manajemen Kategori
              </NavLink>
              <NavLink
                to="/admin/activity-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <Plane className="w-4 h-4" />
                Manajemen Aktivitas
              </NavLink>
              <NavLink
                to="/admin/promo-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <Tag className="w-4 h-4" />
                Manajemen Promo
              </NavLink>
              <NavLink
                to="/admin/transaction-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <ShoppingCart className="w-4 h-4" />
                Manajemen Transaksi
              </NavLink>
              <NavLink
                to="/admin/banner-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-sm ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                <Image className="w-4 h-4" />
                Manajemen Banner
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <NavLink
          to="/logout"
          className="flex items-center gap-2 px-6 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
