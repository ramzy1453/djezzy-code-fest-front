"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Since joining Matarmihach platform, our restaurant has reduced waste by 60% and connected with local communities in meaningful ways.",
    author: "Maria Rodriguez",
    role: "Restaurant Owner",
    avatar: "/",
  },
  {
    quote:
      "Volunteering with this initiative has been incredibly rewarding. I've learned so much about sustainability while making a real difference.",
    author: "James Chen",
    role: "Volunteer",
    avatar: "/",
  },
  {
    quote:
      "The composting program transformed our community garden. We're now producing more food with less resources thanks to the rich soil.",
    author: "Sarah Johnson",
    role: "Community Garden Coordinator",
    avatar: "/",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  }, [current]);

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      next();
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-800/30 dark:text-green-300">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Hear From Our Community
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Real stories from people making a difference in the fight against
              food waste.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-12 relative">
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg max-w-2xl">
                  <Quote className="h-8 w-8 text-green-500 mb-4" />
                  <p className="text-xl italic mb-6 text-gray-700 dark:text-gray-300">
                    {`"${testimonials[current].quote}"`}
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src={testimonials[current].avatar}
                        alt={testimonials[current].author}
                      />
                      <AvatarFallback>
                        {testimonials[current].author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">
                        {testimonials[current].author}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                size="icon"
                variant={current === index ? "default" : "outline"}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                className="h-2 w-2 rounded-full p-2"
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </Button>
            ))}
            <Button
              size="icon"
              variant="outline"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
