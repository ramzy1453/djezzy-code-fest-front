"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              Ready to Make a Difference?
            </h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our community today and be part of the solution to food
              waste. Every action counts.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-white/60 border-white/20 focus-visible:ring-white/30"
              />
              <Button
                type="submit"
                className="bg-white text-green-600 hover:bg-white/90"
              >
                Get Started
              </Button>
            </form>
            <p className="text-xs text-white/60">
              We will send you updates on our initiatives and how you can get
              involved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Volunteer
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Partner With Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
