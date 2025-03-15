"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import DashboardStats from "@/components/dashboard/user/DashboardStats";
import FoodList from "@/components/dashboard/user/FoodList";
import OrganizationsList from "@/components/dashboard/user/OrganizationsList";
import FoodEntryForm from "@/components/dashboard/user/FoodEntryForm";
import FoodCalendar from "@/components/dashboard/user/FoodCalendar";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6">Food Management Dashboard</h1>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-5 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="add-food">Add Food</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <DashboardStats />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expiring Soon</CardTitle>
                  <CardDescription>
                    Food items that will expire in the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FoodList limit={5} filterByDays={7} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nearby Organizations</CardTitle>
                  <CardDescription>
                    Organizations that can accept your food donations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OrganizationsList limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="add-food">
            <Card>
              <CardHeader>
                <CardTitle>Add New Food Item</CardTitle>
                <CardDescription>
                  Enter details about the food you want to track
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FoodEntryForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Food Expiry Calendar</CardTitle>
                <CardDescription>
                  Visual calendar of when your food items will expire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FoodCalendar />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Food Inventory</CardTitle>
                <CardDescription>
                  Complete list of all your food items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FoodList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations">
            <Card>
              <CardHeader>
                <CardTitle>Donation Organizations</CardTitle>
                <CardDescription>
                  Find organizations that accept food donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizationsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
