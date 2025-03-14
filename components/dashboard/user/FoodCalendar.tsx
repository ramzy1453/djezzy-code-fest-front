"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay, addDays, differenceInDays } from "date-fns";

// Sample data - in a real app, this would come from a database
const foodItems = [
  {
    id: 1,
    name: "Milk",
    quantity: "1 L",
    expiryDate: addDays(new Date(), 3),
    category: "dairy",
  },
  {
    id: 2,
    name: "Apples",
    quantity: "5 pcs",
    expiryDate: addDays(new Date(), 7),
    category: "fruits",
  },
  {
    id: 3,
    name: "Chicken Breast",
    quantity: "500 g",
    expiryDate: addDays(new Date(), 2),
    category: "meat",
  },
  {
    id: 4,
    name: "Yogurt",
    quantity: "4 pcs",
    expiryDate: addDays(new Date(), 5),
    category: "dairy",
  },
  {
    id: 5,
    name: "Bread",
    quantity: "1 loaf",
    expiryDate: addDays(new Date(), 4),
    category: "grains",
  },
  {
    id: 6,
    name: "Tomatoes",
    quantity: "6 pcs",
    expiryDate: addDays(new Date(), 6),
    category: "vegetables",
  },
  {
    id: 7,
    name: "Cheese",
    quantity: "200 g",
    expiryDate: addDays(new Date(), 10),
    category: "dairy",
  },
  {
    id: 8,
    name: "Lettuce",
    quantity: "1 head",
    expiryDate: addDays(new Date(), 4),
    category: "vegetables",
  },
  {
    id: 9,
    name: "Orange Juice",
    quantity: "1 L",
    expiryDate: addDays(new Date(), 8),
    category: "beverages",
  },
  {
    id: 10,
    name: "Ground Beef",
    quantity: "300 g",
    expiryDate: addDays(new Date(), 1),
    category: "meat",
  },
];

const categoryColors: Record<string, string> = {
  dairy: "bg-blue-500",
  fruits: "bg-green-500",
  meat: "bg-red-500",
  grains: "bg-yellow-500",
  vegetables: "bg-emerald-500",
  beverages: "bg-purple-500",
  default: "bg-gray-500",
};

export default function FoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Function to get items expiring on a specific date
  const getExpiringItems = (date: Date | undefined) => {
    if (!date) return [];
    return foodItems.filter((item) => isSameDay(item.expiryDate, date));
  };

  // Get items expiring on the selected date
  const selectedDateItems = getExpiringItems(selectedDate);

  // Create a modifiers object for React Day Picker
  const modifiers = {
    expiringFood: foodItems.map((item) => new Date(item.expiryDate)),
  };

  // Create modifier styles
  const modifiersStyles = {
    expiringFood: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderRadius: "0.375rem",
      color: "rgb(185, 28, 28)",
    },
  };

  // Create a custom footer for the calendar
  const footer = (
    <div className="mt-3 text-center text-xs">
      <span className="inline-block w-3 h-3 rounded-full bg-red-100 mr-1"></span>
      <span className="text-gray-500">= Items expiring</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              footer={footer}
              className="rounded-md"
            />
          </div>

          {/* Simple date strip for next 14 days */}
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: 14 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const hasItems = foodItems.some((item) =>
                isSameDay(item.expiryDate, date)
              );

              return (
                <div
                  key={i}
                  className={`p-1 rounded cursor-pointer ${
                    selectedDate && isSameDay(date, selectedDate)
                      ? "bg-green-500 text-white"
                      : hasItems
                      ? "bg-red-100 dark:bg-red-900/30"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="font-medium">{format(date, "d")}</div>
                  <div className="text-[10px]">{format(date, "EEE")}</div>
                  {hasItems && (
                    <div className="mt-1 flex justify-center">
                      <div className="h-1 w-1 rounded-full bg-red-500"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:w-1/2">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-4">
                {selectedDate ? (
                  <>Items expiring on {format(selectedDate, "MMMM d, yyyy")}</>
                ) : (
                  <>Select a date to see expiring items</>
                )}
              </h3>

              {selectedDateItems.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDateItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            categoryColors[item.category] ||
                            categoryColors.default
                          }`}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : selectedDate ? (
                <p className="text-gray-500">No items expiring on this date.</p>
              ) : (
                <p className="text-gray-500">
                  Select a date to view expiring items.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Expiring Today</h3>
                <div className="text-2xl font-bold text-red-500">
                  {
                    foodItems.filter((item) =>
                      isSameDay(item.expiryDate, new Date())
                    ).length
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Expiring This Week</h3>
                <div className="text-2xl font-bold text-amber-500">
                  {
                    foodItems.filter((item) => {
                      const daysUntilExpiry = differenceInDays(
                        item.expiryDate,
                        new Date()
                      );
                      return daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
                    }).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-lg mb-4">Legend</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(categoryColors)
            .filter(([key]) => key !== "default")
            .map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <span className="capitalize text-sm">{category}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
