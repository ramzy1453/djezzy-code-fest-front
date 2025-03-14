"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Clock, Apple, Coins } from "lucide-react";

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState("donate");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-800/30 dark:text-green-300">
              Get Involved
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Join Our Mission
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              There are many ways to contribute to our cause. Choose the option
              that resonates with you.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-12">
          <Tabs
            defaultValue="donate"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="donate">Money</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="donate" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-green-600" />
                      Donate Money
                    </CardTitle>
                    <CardDescription>
                      Your financial contribution helps us expand our operations
                      and reach more communities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {["$10", "$25", "$50"].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className="h-20 text-lg"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                        Donate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="food" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="h-5 w-5 text-green-600" />
                      Donate Food
                    </CardTitle>
                    <CardDescription>
                      Share your surplus food with those who need it most. Every
                      meal counts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">We accept:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Non-perishable food items</li>
                      <li>Fresh produce from gardens or farms</li>
                      <li>Surplus food from restaurants and cafes</li>
                      <li>Bulk food items from manufacturers</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Find Drop-off Locations
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="items" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      Donate Items
                    </CardTitle>
                    <CardDescription>
                      Contribute equipment, supplies, or other resources to
                      support our operations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Items we need:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Food storage containers</li>
                      <li>Transportation equipment</li>
                      <li>Gardening tools for composting projects</li>
                      <li>Office supplies for administrative work</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Contact Us to Donate
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteer" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      Volunteer Time
                    </CardTitle>
                    <CardDescription>
                      Share your skills and time to help us make a bigger impact
                      in our community.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Volunteer opportunities:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Food collection and distribution</li>
                      <li>Composting and garden maintenance</li>
                      <li>Community outreach and education</li>
                      <li>Administrative and technical support</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Sign Up to Volunteer
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
