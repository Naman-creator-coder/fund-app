"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Sun,
  Moon,
  Bell,
  CreditCard,
  User,
  Trash2,
  Shield,
  Smartphone,
  Palette,
  Activity,
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("purple");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } flex flex-col items-center p-6 transition-all duration-300`}
    >
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">⚙️ Settings</h1>

        {/* 🌙 Appearance Settings */}
        <div className="bg-gray-800/80 dark:bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Palette className="text-purple-400" /> Appearance
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              {darkMode ? (
                <>
                  <Sun className="text-yellow-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="text-blue-400" /> Dark Mode
                </>
              )}
            </button>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-gray-700 px-3 py-2 rounded-lg outline-none focus:ring focus:ring-purple-500"
            >
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
              
            </select>
          </div>
        </div>

        {/* 👤 Profile Settings */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <User className="text-blue-400" /> Profile
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <input
                type="text"
                defaultValue={session?.user?.name || "John Doe"}
                className="w-full bg-gray-700 p-2 rounded-md outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <input
                type="email"
                defaultValue={session?.user?.email || "example@email.com"}
                className="w-full bg-gray-700 p-2 rounded-md outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 💳 Payment Preferences */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <CreditCard className="text-green-400" /> Payment Preferences
          </h2>
          <p className="text-gray-400 mb-3 text-sm">
            Manage your preferred payment method for donations and purchases.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
            Update Payment Method
          </button>
        </div>

        {/* 🔔 Notifications */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Bell className="text-yellow-400" /> Notifications
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Enable push notifications</p>
            <button
              onClick={toggleNotifications}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                notifications
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              {notifications ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* 🔒 Privacy & Security */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Shield className="text-red-400" /> Privacy & Security
          </h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Two-Factor Authentication: <span className="text-green-400">Enabled</span></li>
            <li>• Last Password Change: 2 weeks ago</li>
            <li>• Data Sharing: Limited to essential features</li>
          </ul>
          <button className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
            Manage Privacy Settings
          </button>
        </div>

        {/* 📱 Device Info */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Smartphone className="text-cyan-400" /> Devices
          </h2>
          <p className="text-gray-400 text-sm mb-2">Active devices logged in:</p>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>💻 Chrome - Windows 10 (This device)</li>
            <li>📱 iPhone 14 - Safari</li>
          </ul>
          <button className="mt-3 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">
            Manage Devices
          </button>
        </div>

        {/* ⚡ Account Activity */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Activity className="text-orange-400" /> Account Activity
          </h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Last login: 2 hours ago</li>
            <li>• Location: Mumbai, India</li>
            <li>• IP: 192.168.1.5</li>
          </ul>
        </div>

        {/* 🚪 Account Actions */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Bell className="text-red-400" /> Account Actions
          </h2>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md mb-3"
          >
            Log Out
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-red-400 w-full py-2 rounded-md flex justify-center items-center gap-2">
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
