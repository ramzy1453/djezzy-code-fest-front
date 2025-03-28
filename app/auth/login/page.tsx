"use client";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useLoginMutation } from "@/lib/services/user.service";
import { ILogin } from "@/types/user";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login } = useLoginMutation();

  const loginFormik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    async onSubmit(values) {
      console.log(values);
      try {
        await login(values);

        toast.success("Login successful");
        loginFormik.resetForm();
        router.push("/dashboard/regular");
      } catch {
        toast.error("Error during login");
      }
    },
  });

  return (
    <div className="mx-auto max-w-4xl h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 relative">
      <div className="space-y-7 w-full">
        <div className="flex justify-center items-center space-x-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Matarmihach
          </h1>
        </div>

        <div className="border border-[#D9DCE2] rounded-md flex flex-col md:flex-row md:space-x-16 p-6 sm:p-10 md:p-16 w-full">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-xl sm:text-2xl font-medium mb-3.5">Welcome</h1>
            <div className="space-y-4 text-sm sm:text-base">
              <p>
                {`You are one step away from accessing a powerful tool designed to reduce food waste efficiently. In just a few clicks, connect with businesses, charities, and individuals to give surplus food a second life.
A smart and sustainable solution – tailored to your needs.
`}
              </p>
              <p>A personalized workspace - tailored to your needs.</p>
              <p>Log in and lets get started</p>
            </div>
          </div>

          <div className="flex-1">
            <form className="space-y-4" onSubmit={loginFormik.handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold mb-1">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="focus-visible:ring-primary"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                />
                {loginFormik.touched.email && loginFormik.errors.email && (
                  <p className="text-red-500 text-sm">
                    {loginFormik.errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold mb-1">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  className="focus-visible:ring-primary"
                />
                {loginFormik.touched.password &&
                  loginFormik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {loginFormik.errors.password}
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full font-medium"
                disabled={loginFormik.isSubmitting}
              >
                {loginFormik.isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
