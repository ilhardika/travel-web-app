import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Users,
  LayoutPanelTop,
  Plane,
  Tag,
  ShoppingCart,
  Image,
  LogOut,
  ChevronRight,
} from "lucide-react";

const AdminSidebar = ({ isExpanded, setIsExpanded }) => {
  const activeClassName = "bg-blue-600 text-white";
  const inactiveClassName = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 bg-zinc-900 text-white transition-all duration-300 ease-in-out flex flex-col
        ${isExpanded ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div
        className={`p-6 border-b border-gray-800 ${
          isExpanded ? "px-6" : "px-4"
        }`}
      >
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 flex-shrink-0" />
          <h1
            className={`text-xl font-bold whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0"}`}
          >
            Admin Panel
          </h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <User className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/user-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <Users className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Pengguna
          </span>
        </NavLink>

        <NavLink
          to="/category-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <LayoutPanelTop className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Kategori
          </span>
        </NavLink>

        <NavLink
          to="/activity-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <Plane className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Aktivitas
          </span>
        </NavLink>

        <NavLink
          to="/promo-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <Tag className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Promo
          </span>
        </NavLink>

        <NavLink
          to="/banner-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <Image className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Banner
          </span>
        </NavLink>

        <NavLink
          to="/transaction-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-6" : "px-4 justify-center"
            } 
            ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          <ShoppingCart className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Manajemen Transaksi
          </span>
        </NavLink>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center gap-3 py-3 px-6 text-gray-400 hover:bg-gray-800 transition-colors`}
        >
          <ChevronRight
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Collapse Menu
          </span>
        </button>
      </nav>

      {/* Footer with Toggle and Logout */}
      <div className="border-t border-gray-800">
        <NavLink
          to="/logout"
          className={`flex items-center gap-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300
            ${isExpanded ? "px-6" : "px-4 justify-center"}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}
          >
            Logout
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
