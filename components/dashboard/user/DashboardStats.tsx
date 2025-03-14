"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Utensils,
  Users,
  Recycle,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Food Items",
      value: "32",
      description: "+4 from last week",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Expiring Soon",
      value: "8",
      description: "25% of your inventory",
      trend: "up",
      icon: Utensils,
      color: "bg-red-500",
    },
    {
      title: "Donated Items",
      value: "12",
      description: "+2 from last month",
      trend: "up",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Composted",
      value: "5",
      description: "-2 from last month",
      trend: "down",
      icon: Recycle,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.color} bg-opacity-10`}>
                <stat.icon
                  className={`h-4 w-4 ${stat.color.replace("bg-", "text-")}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
