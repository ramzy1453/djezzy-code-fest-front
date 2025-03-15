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
  Trash2,
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

// Sample data - in a real app, this would come from a database
const organizations = [
  {
    id: 1,
    name: "Green Leaf Restaurant",
    description:
      "Farm-to-table restaurant focused on sustainable practices and reducing food waste.",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@greenleaf.org",
    website: "https://greenleaf.org",
    acceptsTypes: ["produce", "dairy", "bakery", "prepared"],
    distance: 1.2,
    type: "restaurant",
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
    type: "food-bank",
  },
  {
    id: 3,
    name: "Harvest Cafe",
    description:
      "Local cafe committed to sustainable practices and community support.",
    address: "789 Pine St, Anytown, USA",
    phone: "(555) 456-7890",
    email: "info@harvestcafe.org",
    website: "https://harvestcafe.org",
    acceptsTypes: ["prepared", "bakery"],
    distance: 3.7,
    type: "restaurant",
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
    type: "community-center",
  },
  {
    id: 5,
    name: "Fresh Start Bistro",
    description:
      "Upscale bistro with a focus on local ingredients and zero waste.",
    address: "202 Maple Ave, Anytown, USA",
    phone: "(555) 876-5432",
    email: "contact@freshstartbistro.com",
    website: "https://freshstartbistro.com",
    acceptsTypes: ["produce", "dairy", "bakery"],
    distance: 5.3,
    type: "restaurant",
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
  { value: "restaurant", label: "Restaurants" },
  { value: "food-bank", label: "Food Banks" },
  { value: "community-center", label: "Community Centers" },
  { value: "school", label: "Schools" },
  { value: "shelter", label: "Shelters" },
  { value: "other", label: "Other" },
];

// Yup validation schema for the form
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Organization name must be at least 2 characters")
    .required("Organization name is required"),
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
  type: Yup.string().required("Organization type is required"),
  acceptsTypes: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one food type")
    .required("Please select at least one food type"),
});

// Initial values for the form
interface FormValues {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  type: string;
  acceptsTypes: string[];
}

const initialValues: FormValues = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  type: "",
  acceptsTypes: [],
};

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Organizations</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Find and manage organizations that participate in food waste
              reduction
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Organization</DialogTitle>
                <DialogDescription>
                  Enter the details of the organization you want to add to the
                  platform.
                </DialogDescription>
              </DialogHeader>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);

                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Organization Name</Label>
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
                      <Label htmlFor="type">Organization Type</Label>
                      <div className="relative">
                        <Field name="type">
                          {({ field }: FieldProps) => (
                            <Select
                              onValueChange={(value) =>
                                setFieldValue("type", value)
                              }
                              value={field.value}
                            >
                              <SelectTrigger
                                className={
                                  errors.type && touched.type
                                    ? "border-red-500"
                                    : ""
                                }
                              >
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                              <SelectContent>
                                {organizationTypes
                                  .filter((type) => type.value !== "all")
                                  .map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        placeholder="Brief description of the organization and its mission"
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
                          placeholder="contact@organization.com"
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
                          placeholder="https://organization.com"
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
                        <Label>Accepted Food Types</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Select the types of food this organization can accept.
                        </p>
                      </div>

                      <FieldArray name="acceptsTypes">
                        {() => (
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(foodTypeLabels).map(
                              ([value, { label }]) => (
                                <div
                                  key={value}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`acceptsTypes-${value}`}
                                    checked={values.acceptsTypes.includes(
                                      value
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setFieldValue("acceptsTypes", [
                                          ...values.acceptsTypes,
                                          value,
                                        ]);
                                      } else {
                                        setFieldValue(
                                          "acceptsTypes",
                                          values.acceptsTypes.filter(
                                            (type) => type !== value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor={`acceptsTypes-${value}`}
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
                        name="acceptsTypes"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                      >
                        {isSubmitting ? "Adding..." : "Add Organization"}
                      </Button>
                    </DialogFooter>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>

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
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Organizations:</span>
                  <span className="font-medium">{organizations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Restaurants:</span>
                  <span className="font-medium">
                    {
                      organizations.filter((org) => org.type === "restaurant")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Food Banks:</span>
                  <span className="font-medium">
                    {
                      organizations.filter((org) => org.type === "food-bank")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Community Centers:</span>
                  <span className="font-medium">
                    {
                      organizations.filter(
                        (org) => org.type === "community-center"
                      ).length
                    }
                  </span>
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
                        <Button className="sm:flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                          Contact
                        </Button>
                        <Button variant="outline" className="sm:flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
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
                  Try adjusting your filters or search terms to find what you
                  are looking for.
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
      </main>
    </div>
  );
}
