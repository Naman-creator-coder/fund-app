"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount: "",
  });

  // ✅ Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/get-donations");
        const data = await res.json();
        if (data.success) setDonations(data.donations);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Payment + Donation Save
  const handleDonate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount)
      return alert("Please fill all required fields");

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.amount }),
      });

      const order = await res.json();
      if (!order.id) {
        alert("Failed to create order ❌");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Support Project 💖",
        description: "Thank you for your support!",
        order_id: order.id,
        handler: async function (response) {
          const save = await fetch("/api/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name: formData.name,
              message: formData.message,
              amount: formData.amount,
            }),
          });

          const result = await save.json();
          if (result.success) {
            alert("✅ Thank you for your donation!");
            setFormData({ name: "", message: "", amount: "" });
            setDonations((prev) => [result.donation, ...prev]);
          }
        },
        theme: { color: "#9333ea" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Donation error:", error);
      alert("Something went wrong!");
    }
  };

  // ✅ Loading & No Session States
  if (status === "loading")
    return <div className="text-white text-center mt-20">Loading...</div>;
  if (!session)
    return (
      <div className="text-white text-center mt-20">
        Please sign in to view dashboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 sm:px-6 md:px-10 lg:px-20 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
          Welcome, {session.user.name}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Here’s your personalized dashboard overview 💫
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 transition hover:scale-[1.01] duration-300 ease-in-out">
        <Image
          src={session.user.image || "/images/avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className="rounded-full border-4 border-purple-500 shadow-lg object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-1">
            {session.user.name}
          </h2>
          <p className="text-gray-400 mb-3 text-sm sm:text-base">
            {session.user.email}
          </p>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            Premium Member
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Total Projects",
            value: "12",
            color: "from-purple-600 to-purple-800",
            subtitle: "Updated just now",
          },
          {
            title: "Tasks Completed",
            value: "89%",
            color: "from-blue-600 to-blue-800",
            subtitle: "Great job!",
          },
          {
            title: "Account Level",
            value: "Gold",
            color: "from-green-600 to-green-800",
            subtitle: "Keep progressing!",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform text-center`}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {card.title}
            </h3>
            <p className="text-3xl sm:text-4xl font-bold">{card.value}</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="max-w-5xl mx-auto mt-16 mb-16 bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
          <li className="border-b border-gray-700 pb-2">✅ Completed Profile Setup</li>
          <li className="border-b border-gray-700 pb-2">📈 Checked Analytics</li>
          <li className="border-b border-gray-700 pb-2">💬 Updated Account Preferences</li>
          <li>🎉 Upgraded to Premium Plan</li>
        </ul>
      </div>

      {/* 💜 Donation Section */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 bg-gray-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-purple-700 shadow-xl">
        {/* Left: Recent Donations */}
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">
            💬 Support Messages
          </h2>
          <div className="bg-gray-900/60 rounded-xl p-4 h-64 sm:h-72 overflow-y-auto border border-gray-700">
            {donations.length === 0 ? (
              <p className="text-gray-400 text-center mt-16 sm:mt-20">
                No donations yet. Be the first to support! 💖
              </p>
            ) : (
              donations.map((donation, index) => (
                <div
                  key={index}
                  className="mb-3 bg-gray-800 p-3 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                    <span>{donation.name}</span>
                    <span>
                      {new Date(donation.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-purple-300 mt-1 text-sm">{donation.message}</p>
                  <p className="text-green-400 font-semibold mt-1">
                    💸 ₹{donation.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Donation Form */}
        <div className="flex-1 w-full bg-gray-900/60 rounded-xl p-6 sm:p-8 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">
            ❤️ Make a Donation
          </h2>
          <form onSubmit={handleDonate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message (optional)"
              rows={3}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount (₹)"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition text-white py-3 rounded-lg font-semibold shadow-lg text-sm sm:text-base"
            >
              💳 Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
