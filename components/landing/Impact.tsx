"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

function Earth() {
  const texture = useTexture("/assets/3d/texture_earth.jpg");

  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Impact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: "2M+", label: "Meals Saved" },
    { value: "500+", label: "Volunteers" },
    { value: "50+", label: "Communities" },
    { value: "1000+", label: "Tons Composted" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {mounted && (
            <div className="h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Earth />
                <Environment preset="sunset" />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>
          )}

          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-800/30 dark:text-green-300">
                Our Impact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Global Change Starts Locally
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Together, we are making a significant impact on reducing food
                waste and helping communities thrive. Every action contributes
                to a more sustainable world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4"
                >
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
