"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data - in a real app, this would come from a database
const organizations = [
  {
    id: 1,
    name: "Food Rescue Network",
    description:
      "Collects surplus food from businesses and distributes it to those in need.",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@foodrescue.org",
    website: "https://foodrescue.org",
    acceptsTypes: ["produce", "dairy", "bakery", "prepared", "canned"],
    distance: 1.2,
  },
  {
    id: 2,
    name: "Community Food Bank",
    description:
      "Provides food assistance to low-income families and individuals.",
    address: "456 Oak Ave, Anytown, USA",
    phone: "(555) 987-6543",
    email: "contact@communityfoodbank.org",
    website: "https://communityfoodbank.org",
    acceptsTypes: ["canned", "dry", "produce"],
    distance: 2.5,
  },
  {
    id: 3,
    name: "Homeless Shelter",
    description: "Provides meals and shelter for homeless individuals.",
    address: "789 Pine St, Anytown, USA",
    phone: "(555) 456-7890",
    email: "info@homelessshelter.org",
    website: "https://homelessshelter.org",
    acceptsTypes: ["prepared", "canned", "dry"],
    distance: 3.7,
  },
  {
    id: 4,
    name: "Senior Center",
    description: "Provides meals and activities for seniors in the community.",
    address: "101 Elm St, Anytown, USA",
    phone: "(555) 234-5678",
    email: "info@seniorcenter.org",
    website: "https://seniorcenter.org",
    acceptsTypes: ["prepared", "produce", "bakery"],
    distance: 4.1,
  },
  {
    id: 5,
    name: "School Lunch Program",
    description: "Provides nutritious meals to students in need.",
    address: "202 Maple Ave, Anytown, USA",
    phone: "(555) 876-5432",
    email: "lunch@schooldistrict.org",
    website: "https://schooldistrict.org/lunch",
    acceptsTypes: ["produce", "dairy", "bakery"],
    distance: 5.3,
  },
];

const foodTypeLabels: Record<string, { label: string, color: string }> = {
  produce: {
    label: "Fresh Produce",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  dairy: {
    label: "Dairy",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  bakery: {
    label: "Bakery",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  prepared: {
    label: "Prepared Meals",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  canned: {
    label: "Canned Goods",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  dry: {
    label: "Dry Goods",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
};

interface OrganizationsListProps {
  limit?: number;
}

export default function OrganizationsList({ limit }: OrganizationsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("distance");

  // Filter and sort the organizations
  let filteredOrgs = [...organizations];

  // Filter by search term
  if (searchTerm) {
    filteredOrgs = filteredOrgs.filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by food type
  if (foodTypeFilter !== "all") {
    filteredOrgs = filteredOrgs.filter((org) =>
      org.acceptsTypes.includes(foodTypeFilter)
    );
  }

  // Sort the organizations
  filteredOrgs.sort((a, b) => {
    if (sortBy === "distance") {
      return a.distance - b.distance;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Limit the number of organizations if specified
  if (limit) {
    filteredOrgs = filteredOrgs.slice(0, limit);
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search organizations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={foodTypeFilter} onValueChange={setFoodTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by food type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Food Types</SelectItem>
                <SelectItem value="produce">Fresh Produce</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="prepared">Prepared Meals</SelectItem>
                <SelectItem value="canned">Canned Goods</SelectItem>
                <SelectItem value="dry">Dry Goods</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredOrgs.length > 0 ? (
          filteredOrgs.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{org.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {org.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {org.distance} miles
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {org.acceptsTypes.map((type) => (
                      <Badge key={type} className={foodTypeLabels[type].color}>
                        {foodTypeLabels[type].label}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{org.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{org.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{org.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button className="sm:flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                    Contact to Donate
                  </Button>
                  <Button variant="outline" className="sm:flex-1">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No organizations found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
