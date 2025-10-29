"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* 🌟 HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-6 py-16">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            Fund App
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Empower creators with fast, secure, and transparent funding.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 w-full sm:w-auto">
            Pay Now
          </button>
          <button className="px-6 py-3 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-600/20 transition-colors duration-200 w-full sm:w-auto">
            Know More
          </button>
        </motion.div>
      </section>

      {/* 💸 FEATURE SECTION */}
      <section className="py-20 bg-[#1e293b] text-white px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl font-bold mb-14"
        >
          Pay securely and support your favorite creators
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[
            {
              img: "/images/man.gif",
              title: "Fund Creators",
              desc: "Support creators by donating directly and transparently.",
              btn: "Pay Now",
              gradient: "from-purple-500 to-indigo-600",
            },
            {
              img: "/images/coin.gif",
              title: "Donate Instantly",
              desc: "Quick, easy, and transparent donations at your fingertips.",
              btn: "Donate Now",
              gradient: "from-pink-500 to-purple-600",
            },
            {
              img: "/images/Mutual_Fund-1.gif",
              title: "Secure Payments",
              desc: "Enjoy secure, encrypted, and transparent payment processing.",
              btn: "Secure Pay",
              gradient: "from-green-500 to-teal-500",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-700 hover:border-purple-500/40 transition-all"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={160}
                height={160}
                className="mx-auto rounded-lg object-contain"
              />
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
              <button
                className={`mt-5 px-5 py-2 bg-gradient-to-r ${item.gradient} rounded-lg font-medium hover:opacity-90 w-full sm:w-auto`}
              >
                {item.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ HOW IT WORKS SECTION */}
      <section className="bg-gray-900 py-20 px-6 text-center text-white">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-10"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {[
            {
              step: "1",
              title: "Choose Creator",
              desc: "Select the creator you want to support from our verified list.",
            },
            {
              step: "2",
              title: "Make Payment",
              desc: "Use secure payment options to transfer funds instantly.",
            },
            {
              step: "3",
              title: "Track Progress",
              desc: "View transparent reports on where your funds are going.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm hover:scale-105 transition-transform border border-gray-700 hover:border-green-400/40"
            >
              <div className="text-5xl font-extrabold text-green-400">
                {item.step}
              </div>
              <h3 className="text-2xl mt-4 font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 TESTIMONIALS */}
      <section className="py-20 bg-[#111827] text-white text-center px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-12"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {[
            {
              name: "Aarav Sharma",
              text: "Fund App made it super easy to support my favorite artist. Secure and fast!",
            },
            {
              name: "Meera Joshi",
              text: "I love the transparency and design — I always know where my money goes!",
            },
            {
              name: "Rohan Patel",
              text: "One of the best funding platforms I’ve ever used. Highly recommended!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-sm hover:scale-105 transition-transform border border-gray-700 hover:border-blue-400/40"
            >
              <p className="italic text-gray-300 leading-relaxed">“{t.text}”</p>
              <h4 className="mt-5 font-semibold text-green-400">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
