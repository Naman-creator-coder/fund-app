"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount: "",
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    const newDonation = {
      name: formData.name,
      message: formData.message || "No message",
      amount: formData.amount,
      time: new Date().toLocaleTimeString(),
    };

    setDonations([newDonation, ...donations]);
    setFormData({ name: "", message: "", amount: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6 md:px-12 pb-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-2">
          Welcome, {session.user.name} 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Here’s your personalized dashboard overview.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 flex flex-col md:flex-row items-center gap-8 transition hover:scale-[1.01] duration-300 ease-in-out">
        <Image
          src={session.user.image || "/images/avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className="rounded-full border-4 border-purple-500 shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-purple-300 mb-1">
            {session.user.name}
          </h2>
          <p className="text-gray-400 mb-3">{session.user.email}</p>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Premium Member
          </span>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
          <h3 className="text-xl font-semibold mb-2">Total Projects</h3>
          <p className="text-4xl font-bold text-white">12</p>
          <p className="text-gray-300 text-sm mt-2">Updated just now</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
          <h3 className="text-xl font-semibold mb-2">Tasks Completed</h3>
          <p className="text-4xl font-bold text-white">89%</p>
          <p className="text-gray-300 text-sm mt-2">Great job!</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
          <h3 className="text-xl font-semibold mb-2">Account Level</h3>
          <p className="text-4xl font-bold text-white">Gold</p>
          <p className="text-gray-300 text-sm mt-2">Keep progressing!</p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="max-w-5xl mx-auto mt-16 bg-gray-800 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-300">
          <li className="border-b border-gray-700 pb-2">✅ Completed Profile Setup</li>
          <li className="border-b border-gray-700 pb-2">📈 Checked Analytics</li>
          <li className="border-b border-gray-700 pb-2">💬 Updated Account Preferences</li>
          <li>🎉 Upgraded to Premium Plan</li>
        </ul>
      </div>

      {/* 💜 Donation Section */}
      <div className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row gap-8 bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl border border-purple-700 shadow-xl">
        {/* Left: Recent Donations */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">
            💬 Support Messages
          </h2>
          <div className="bg-gray-900/60 rounded-xl p-4 h-64 overflow-y-auto border border-gray-700">
            {donations.length === 0 ? (
              <p className="text-gray-400 text-center mt-20">
                No donations yet. Be the first to support! 💖
              </p>
            ) : (
              donations.map((donation, index) => (
                <div
                  key={index}
                  className="mb-3 bg-gray-800 p-3 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{donation.name}</span>
                    <span>{donation.time}</span>
                  </div>
                  <p className="text-purple-300 mt-1">{donation.message}</p>
                  <p className="text-green-400 font-semibold mt-1">
                    💸 ₹{donation.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Donation Form */}
        <div className="flex-1 bg-gray-900/60 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">
            ❤️ Make a Donation
          </h2>
          <form onSubmit={handleDonate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message (optional)"
              rows={3}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount (₹)"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition text-white py-3 rounded-lg font-semibold shadow-lg"
            >
              💳 Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
