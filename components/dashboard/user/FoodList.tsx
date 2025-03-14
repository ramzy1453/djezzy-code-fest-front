"use client";

import { useState } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { Search, Filter, ArrowUpDown, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Sample data - in a real app, this would come from a database
const foodItems = [
  {
    id: 1,
    name: "Milk",
    quantity: "1",
    unit: "L",
    expiryDate: addDays(new Date(), 3),
    category: "dairy",
    location: "refrigerator",
  },
  {
    id: 2,
    name: "Apples",
    quantity: "5",
    unit: "pcs",
    expiryDate: addDays(new Date(), 7),
    category: "fruits",
    location: "refrigerator",
  },
  {
    id: 3,
    name: "Chicken Breast",
    quantity: "500",
    unit: "g",
    expiryDate: addDays(new Date(), 2),
    category: "meat",
    location: "freezer",
  },
  {
    id: 4,
    name: "Yogurt",
    quantity: "4",
    unit: "pcs",
    expiryDate: addDays(new Date(), 5),
    category: "dairy",
    location: "refrigerator",
  },
  {
    id: 5,
    name: "Bread",
    quantity: "1",
    unit: "loaf",
    expiryDate: addDays(new Date(), 4),
    category: "grains",
    location: "pantry",
  },
  {
    id: 6,
    name: "Tomatoes",
    quantity: "6",
    unit: "pcs",
    expiryDate: addDays(new Date(), 6),
    category: "vegetables",
    location: "refrigerator",
  },
  {
    id: 7,
    name: "Cheese",
    quantity: "200",
    unit: "g",
    expiryDate: addDays(new Date(), 10),
    category: "dairy",
    location: "refrigerator",
  },
  {
    id: 8,
    name: "Lettuce",
    quantity: "1",
    unit: "head",
    expiryDate: addDays(new Date(), 4),
    category: "vegetables",
    location: "refrigerator",
  },
  {
    id: 9,
    name: "Orange Juice",
    quantity: "1",
    unit: "L",
    expiryDate: addDays(new Date(), 8),
    category: "beverages",
    location: "refrigerator",
  },
  {
    id: 10,
    name: "Ground Beef",
    quantity: "300",
    unit: "g",
    expiryDate: addDays(new Date(), 1),
    category: "meat",
    location: "freezer",
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

interface FoodListProps {
  limit?: number;
  filterByDays?: number;
}

export default function FoodList({ limit, filterByDays }: FoodListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "expiryDate",
    direction: "asc",
  });

  // Filter and sort the food items
  let filteredItems = [...foodItems];

  // Filter by days until expiry if specified
  if (filterByDays !== undefined) {
    filteredItems = filteredItems.filter((item) => {
      const daysUntilExpiry = differenceInDays(item.expiryDate, new Date());
      return daysUntilExpiry >= 0 && daysUntilExpiry <= filterByDays;
    });
  }

  // Filter by search term
  if (searchTerm) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by category
  if (categoryFilter !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.category === categoryFilter
    );
  }

  // Sort the items
  filteredItems.sort((a, b) => {
    if (sortConfig.key === "expiryDate") {
      return sortConfig.direction === "asc"
        ? a.expiryDate.getTime() - b.expiryDate.getTime()
        : b.expiryDate.getTime() - a.expiryDate.getTime();
    } else if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "category") {
      return sortConfig.direction === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    }
    return 0;
  });

  // Limit the number of items if specified
  if (limit) {
    filteredItems = filteredItems.slice(0, limit);
  }

  // Function to request sorting
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Function to get expiry status
  const getExpiryStatus = (date: Date) => {
    const daysUntilExpiry = differenceInDays(date, new Date());

    if (daysUntilExpiry < 0) {
      return { label: "Expired", variant: "destructive" as const };
    } else if (daysUntilExpiry === 0) {
      return { label: "Today", variant: "destructive" as const };
    } else if (daysUntilExpiry <= 3) {
      return {
        label: `${daysUntilExpiry} days`,
        variant: "destructive" as const,
      };
    } else if (daysUntilExpiry <= 7) {
      return {
        label: `${daysUntilExpiry} days`,
        variant: "secondary" as const,
      };
    } else {
      return { label: `${daysUntilExpiry} days`, variant: "outline" as const };
    }
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search food items..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">
                <Button
                  variant="ghost"
                  className="p-0 h-8 font-medium"
                  onClick={() => requestSort("name")}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 h-8 font-medium"
                  onClick={() => requestSort("category")}
                >
                  Category
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 h-8 font-medium"
                  onClick={() => requestSort("expiryDate")}
                >
                  Expires
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            categoryColors[item.category] ||
                            categoryColors.default
                          }`}
                        ></div>
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {format(item.expiryDate, "MMM d, yyyy")}
                        </span>
                        <Badge
                          variant={expiryStatus.variant}
                          className="mt-1 w-fit"
                        >
                          {expiryStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <path
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No food items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
