"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function AnimatedIcons() {
  const icons = Array(20)
    .fill(null)
    .map(() => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-green-300/10 dark:bg-green-700/10"
          style={{
            width: icon.size,
            height: icon.size,
            left: `${50 + icon.x}%`,
            top: `${50 + icon.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: icon.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-700 dark:from-green-700 dark:via-green-800 dark:to-green-900" />

      <AnimatedIcons />

      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 text-white max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto inline-block rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium"
          >
            انضم إلى الحركة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          >
            صفر نفايات الطعام
            <br />
            <span className="text-green-200">التأثير الأقصى</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mx-auto max-w-[700px] text-lg text-white/80"
          >
            اجمع أو تبرع أو سماد أو بيع. كل عمل مهم في مهمتنا للقضاء على فضلات
            الطعام وخلق مستقبل مستدام.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-4"
          >
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-white/90 dark:bg-white dark:text-green-800"
            >
              ابدأ
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white"
            >
              أعرف أكثر{" "}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-xl p-6 border border-white/20"
        >
          {[
            { value: "2M+", label: "وجبات محفوظة" },
            { value: "500+", label: "المتطوعين" },
            { value: "50+", label: "مجتمعات" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </h3>
              <p className="text-green-100">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-700/90 to-transparent dark:from-green-900/90"></div>

      <div className="absolute bottom-8 left-1/2 text-white flex flex-col items-center animate-float">
        <span className="text-sm font-medium mb-2">Scroll to explore</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
