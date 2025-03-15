"use client";

import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import {
  Search,
  Plus,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  Edit,
  Gift,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IOrg } from "@/types/org";

// Sample data - in a real app, this would come from a database
const organizations: IOrg[] = [
  {
    id: 1,
    name: "Community Food Bank",
    description:
      "Provides food assistance to low-income families and individuals.",
    address: "456 Oak Ave, Anytown, USA",
    phone: "(555) 987-6543",
    email: "contact@communityfoodbank.org",
    website: "https://communityfoodbank.org",
    acceptsTypes: ["canned", "dry", "produce"],
    distance: 2.5,
    type: "food-bank",
  },
  {
    id: 2,
    name: "Homeless Shelter",
    description: "Provides meals and shelter for homeless individuals.",
    address: "789 Pine St, Anytown, USA",
    phone: "(555) 456-7890",
    email: "info@homelessshelter.org",
    website: "https://homelessshelter.org",
    acceptsTypes: ["prepared", "canned", "dry"],
    distance: 3.7,
    type: "shelter",
  },
  {
    id: 3,
    name: "Senior Center",
    description: "Provides meals and activities for seniors in the community.",
    address: "101 Elm St, Anytown, USA",
    phone: "(555) 234-5678",
    email: "info@seniorcenter.org",
    website: "https://seniorcenter.org",
    acceptsTypes: ["prepared", "produce", "bakery"],
    distance: 4.1,
    type: "community-center",
  },
  {
    id: 4,
    name: "School Lunch Program",
    description: "Provides nutritious meals to students in need.",
    address: "202 Maple Ave, Anytown, USA",
    phone: "(555) 876-5432",
    email: "lunch@schooldistrict.org",
    website: "https://schooldistrict.org/lunch",
    acceptsTypes: ["produce", "dairy", "bakery"],
    distance: 5.3,
    type: "school",
  },
  {
    id: 5,
    name: "Local Food Pantry",
    description: "Neighborhood food pantry serving families in need.",
    address: "303 Cedar Blvd, Anytown, USA",
    phone: "(555) 345-6789",
    email: "help@foodpantry.org",
    website: "https://foodpantry.org",
    acceptsTypes: ["canned", "dry", "produce", "dairy"],
    distance: 1.8,
    type: "food-bank",
  },
];

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Green Leaf Restaurant",
    description:
      "Farm-to-table restaurant focused on sustainable practices and reducing food waste.",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@greenleaf.org",
    website: "https://greenleaf.org",
    foodTypes: ["produce", "dairy", "bakery", "prepared"],
    donationHistory: [
      {
        date: "2023-05-15",
        organization: "Community Food Bank",
        items: "Produce, bread",
        quantity: "15 lbs",
      },
      {
        date: "2023-06-02",
        organization: "Homeless Shelter",
        items: "Prepared meals",
        quantity: "20 servings",
      },
      {
        date: "2023-06-20",
        organization: "Senior Center",
        items: "Baked goods",
        quantity: "30 items",
      },
    ],
  },
  {
    id: 2,
    name: "Harvest Cafe",
    description:
      "Local cafe committed to sustainable practices and community support.",
    address: "789 Pine St, Anytown, USA",
    phone: "(555) 456-7890",
    email: "info@harvestcafe.org",
    website: "https://harvestcafe.org",
    foodTypes: ["prepared", "bakery"],
    donationHistory: [
      {
        date: "2023-05-10",
        organization: "School Lunch Program",
        items: "Baked goods",
        quantity: "25 items",
      },
      {
        date: "2023-06-15",
        organization: "Local Food Pantry",
        items: "Sandwiches",
        quantity: "15 items",
      },
    ],
  },
  {
    id: 3,
    name: "Fresh Start Bistro",
    description:
      "Upscale bistro with a focus on local ingredients and zero waste.",
    address: "202 Maple Ave, Anytown, USA",
    phone: "(555) 876-5432",
    email: "contact@freshstartbistro.com",
    website: "https://freshstartbistro.com",
    foodTypes: ["produce", "dairy", "bakery", "prepared"],
    donationHistory: [
      {
        date: "2023-06-01",
        organization: "Community Food Bank",
        items: "Produce, dairy",
        quantity: "20 lbs",
      },
      {
        date: "2023-06-18",
        organization: "Senior Center",
        items: "Prepared meals",
        quantity: "15 servings",
      },
    ],
  },
];

const foodTypeLabels: Record<string, { label: string; color: string }> = {
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

const organizationTypes = [
  { value: "all", label: "All Types" },
  { value: "food-bank", label: "Food Banks" },
  { value: "community-center", label: "Community Centers" },
  { value: "school", label: "Schools" },
  { value: "shelter", label: "Shelters" },
  { value: "other", label: "Other" },
];

// Yup validation schema for the restaurant form
const restaurantValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Restaurant name must be at least 2 characters")
    .required("Restaurant name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  address: Yup.string()
    .min(5, "Address is required")
    .required("Address is required"),
  phone: Yup.string()
    .min(5, "Phone number is required")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  website: Yup.string().url("Invalid URL").nullable(),
  foodTypes: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one food type")
    .required("Please select at least one food type"),
});

// Yup validation schema for the donation form
const donationValidationSchema = Yup.object({
  organizationId: Yup.string().required("Please select an organization"),
  foodType: Yup.string().required("Please select a food type"),
  quantity: Yup.string().required("Quantity is required"),
  description: Yup.string()
    .min(5, "Please provide a brief description")
    .required("Description is required"),
  pickupDate: Yup.date()
    .min(new Date(), "Pickup date must be in the future")
    .required("Pickup date is required"),
  pickupTime: Yup.string().required("Pickup time is required"),
  notes: Yup.string(),
});

// Initial values for the restaurant form
const restaurantInitialValues = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  foodTypes: [],
};

// Initial values for the donation form
const donationInitialValues = {
  organizationId: "",
  foodType: "",
  quantity: "",
  description: "",
  pickupDate: "",
  pickupTime: "",
  notes: "",
};

interface RestaurantFormValues {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  foodTypes: string[];
}

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const [isRestaurantDialogOpen, setIsRestaurantDialogOpen] = useState(false);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<IOrg | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("donate");

  // Filter organizations based on search term and filters
  const filteredOrganizations = organizations.filter((org) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by organization type
    const matchesType = typeFilter === "all" || org.type === typeFilter;

    // Filter by food type
    const matchesFoodType =
      foodTypeFilter === "all" || org.acceptsTypes.includes(foodTypeFilter);

    return matchesSearch && matchesType && matchesFoodType;
  });

  // Handle donation form submission

  // Open donation dialog with selected organization
  const openDonationDialog = (organization: IOrg) => {
    setSelectedOrganization(organization);
    setIsDonationDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your restaurant profile and donate surplus food to
              organizations
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog
              open={isRestaurantDialogOpen}
              onOpenChange={setIsRestaurantDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Restaurant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Restaurant</DialogTitle>
                  <DialogDescription>
                    Enter your restaurant details to join ماتارميهاش platform.
                  </DialogDescription>
                </DialogHeader>

                <Formik<RestaurantFormValues>
                  initialValues={restaurantInitialValues}
                  validationSchema={restaurantValidationSchema}
                  onSubmit={(values, { resetForm }) => {
                    // In a real app, this would send the data to your backend
                    console.log("Restaurant form submitted:", values);

                    // Close the dialog and reset the form
                    setIsRestaurantDialogOpen(false);
                    resetForm();
                  }}
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    values,
                    setFieldValue,
                  }) => (
                    <Form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Restaurant Name</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="e.g. Green Leaf Restaurant"
                          className={
                            errors.name && touched.name ? "border-red-500" : ""
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          placeholder="Brief description of your restaurant and sustainability practices"
                          className={`resize-none ${
                            errors.description && touched.description
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Field
                            as={Input}
                            id="address"
                            name="address"
                            placeholder="Full address"
                            className={
                              errors.address && touched.address
                                ? "border-red-500"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Field
                            as={Input}
                            id="phone"
                            name="phone"
                            placeholder="e.g. (555) 123-4567"
                            className={
                              errors.phone && touched.phone
                                ? "border-red-500"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Field
                            as={Input}
                            id="email"
                            name="email"
                            placeholder="contact@restaurant.com"
                            className={
                              errors.email && touched.email
                                ? "border-red-500"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Field
                            as={Input}
                            id="website"
                            name="website"
                            placeholder="https://restaurant.com"
                            className={
                              errors.website && touched.website
                                ? "border-red-500"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="website"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="mb-2">
                          <Label>Food Types You Can Donate</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Select the types of food your restaurant can
                            potentially donate.
                          </p>
                        </div>

                        <FieldArray name="foodTypes">
                          {() => (
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(foodTypeLabels).map(
                                ([value, { label }]) => (
                                  <div
                                    key={value}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`foodTypes-${value}`}
                                      checked={values.foodTypes.includes(value)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setFieldValue("foodTypes", [
                                            ...values.foodTypes,
                                            value,
                                          ]);
                                        } else {
                                          setFieldValue(
                                            "foodTypes",
                                            values.foodTypes.filter(
                                              (type) => type !== value
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <Label
                                      htmlFor={`foodTypes-${value}`}
                                      className="text-sm font-normal"
                                    >
                                      {label}
                                    </Label>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                        <ErrorMessage
                          name="foodTypes"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsRestaurantDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                        >
                          {isSubmitting ? "Adding..." : "Add Restaurant"}
                        </Button>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donate">Donate Food</TabsTrigger>
            <TabsTrigger value="profile">Restaurant Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Search</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search organizations..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Organization Type</Label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Accepts Food Type</Label>
                      <Select
                        value={foodTypeFilter}
                        onValueChange={setFoodTypeFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Food Types</SelectItem>
                          {Object.entries(foodTypeLabels).map(
                            ([value, { label }]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm("");
                        setTypeFilter("all");
                        setFoodTypeFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Donation Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Donations:</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">This Month:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Food Saved:</span>
                      <span className="font-medium">105 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CO₂ Prevented:</span>
                      <span className="font-medium">42 kg</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Organizations list */}
              <div className="md:col-span-3 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredOrganizations.length}{" "}
                    {filteredOrganizations.length === 1
                      ? "Organization"
                      : "Organizations"}{" "}
                    Found
                  </h2>
                  <Select defaultValue="distance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredOrganizations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredOrganizations.map((org) => (
                      <Card key={org.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{org.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {org.description}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <MapPin className="h-3 w-3" />
                              {org.distance} miles
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {org.acceptsTypes.map((type) => (
                                <Badge
                                  key={type}
                                  className={foodTypeLabels[type].color}
                                >
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
                            <Button
                              className="sm:flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                              onClick={() => openDonationDialog(org)}
                            >
                              <Gift className="mr-2 h-4 w-4" />
                              Donate Food
                            </Button>
                            <Button variant="outline" className="sm:flex-1">
                              View Details
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No organizations found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Try adjusting your filters or search terms to find what
                      you are looking for.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setTypeFilter("all");
                        setFoodTypeFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Restaurant profile */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Profile</CardTitle>
                    <CardDescription>
                      Your restaurant information and donation history
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          Green Leaf Restaurant
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Farm-to-table restaurant focused on sustainable
                          practices and reducing food waste.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>123 Main St, Anytown, USA</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>(555) 123-4567</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>info@greenleaf.org</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                            <a
                              href="https://greenleaf.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">
                          Food Types Available for Donation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={foodTypeLabels.produce.color}>
                            {foodTypeLabels.produce.label}
                          </Badge>
                          <Badge className={foodTypeLabels.dairy.color}>
                            {foodTypeLabels.dairy.label}
                          </Badge>
                          <Badge className={foodTypeLabels.bakery.color}>
                            {foodTypeLabels.bakery.label}
                          </Badge>
                          <Badge className={foodTypeLabels.prepared.color}>
                            {foodTypeLabels.prepared.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Donation History</h4>
                      <div className="border rounded-md">
                        <div className="grid grid-cols-4 gap-4 p-3 border-b font-medium text-sm">
                          <div>Date</div>
                          <div>Organization</div>
                          <div>Items</div>
                          <div>Quantity</div>
                        </div>
                        {restaurants[0].donationHistory.map(
                          (donation, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-4 gap-4 p-3 border-b last:border-0 text-sm"
                            >
                              <div>{donation.date}</div>
                              <div>{donation.organization}</div>
                              <div>{donation.items}</div>
                              <div>{donation.quantity}</div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" className="mr-2">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats and quick actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Donations:</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Food Saved:</span>
                      <span className="font-medium">105 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CO₂ Prevented:</span>
                      <span className="font-medium">42 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">People Fed:</span>
                      <span className="font-medium">~65</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      <Gift className="mr-2 h-4 w-4" />
                      New Donation
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Update Inventory
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Donation History
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Impact Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Have questions about donating food or using the platform?
                    </p>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                    <Button variant="link" className="w-full">
                      View FAQ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Donation Dialog */}
        <Dialog
          open={isDonationDialogOpen}
          onOpenChange={setIsDonationDialogOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Donate Food</DialogTitle>
              <DialogDescription>
                {selectedOrganization ? (
                  <>Arrange a food donation to {selectedOrganization.name}</>
                ) : (
                  <>Enter details about the food you want to donate</>
                )}
              </DialogDescription>
            </DialogHeader>

            <Formik
              initialValues={{
                ...donationInitialValues,
                organizationId: selectedOrganization
                  ? selectedOrganization.id.toString()
                  : "",
              }}
              validationSchema={donationValidationSchema}
              onSubmit={(values, { resetForm }) => {
                // In a real app, this would send the data to your backend
                console.log("Donation form submitted:", values);

                // Close the dialog and reset the form
                setIsDonationDialogOpen(false);
                resetForm();
              }}
            >
              {({ isSubmitting, errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                  {!selectedOrganization && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationId">Organization</Label>
                      <Field name="organizationId">
                        {({ field }: FieldProps) => (
                          <Select
                            onValueChange={(value) =>
                              setFieldValue("organizationId", value)
                            }
                            value={field.value}
                          >
                            <SelectTrigger
                              className={
                                errors.organizationId && touched.organizationId
                                  ? "border-red-500"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Select an organization" />
                            </SelectTrigger>
                            <SelectContent>
                              {organizations.map((org) => (
                                <SelectItem
                                  key={org.id}
                                  value={org.id.toString()}
                                >
                                  {org.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="organizationId"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="foodType">Food Type</Label>
                    <Field name="foodType">
                      {({ field }: FieldProps) => (
                        <Select
                          onValueChange={(value) =>
                            setFieldValue("foodType", value)
                          }
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              errors.foodType && touched.foodType
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(foodTypeLabels).map(
                              ([value, { label }]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="foodType"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Field
                        as={Input}
                        id="quantity"
                        name="quantity"
                        placeholder="e.g. 10 lbs, 5 trays, etc."
                        className={
                          errors.quantity && touched.quantity
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Field
                        as={Input}
                        id="description"
                        name="description"
                        placeholder="Brief description of the food"
                        className={
                          errors.description && touched.description
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Field
                        as={Input}
                        id="pickupDate"
                        name="pickupDate"
                        type="date"
                        className={
                          errors.pickupDate && touched.pickupDate
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="pickupDate"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Pickup Time</Label>
                      <Field
                        as={Input}
                        id="pickupTime"
                        name="pickupTime"
                        type="time"
                        className={
                          errors.pickupTime && touched.pickupTime
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="pickupTime"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Field
                      as={Textarea}
                      id="notes"
                      name="notes"
                      placeholder="Any special instructions or additional information"
                      className="resize-none"
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDonationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Donation"}
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
