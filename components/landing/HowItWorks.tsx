"use client";

import { motion } from "framer-motion";
import { Leaf, ShoppingBag, Recycle, DollarSign } from "lucide-react";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Collecting",
    description:
      "Gather surplus food from restaurants, markets, and farms that would otherwise go to waste.",
    icon: ShoppingBag,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    title: "Donating",
    description:
      "Contribute food, money, or your time to help distribute resources to those in need.",
    icon: DollarSign,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    title: "Composting",
    description:
      "Transform food scraps into nutrient-rich soil for sustainable gardening and farming.",
    icon: Recycle,
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    title: "Selling",
    description:
      "Market surplus food at reduced prices to prevent waste and create economic opportunities.",
    icon: Leaf,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-800/30 dark:text-green-300">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Four Ways to Make an Impact
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform offers multiple ways to participate in reducing food
              waste. Choose the path that works best for you.
            </p>
          </div>
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
            >
              <div className={`rounded-full p-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
