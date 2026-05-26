"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Snowfall from "react-snowfall";

const formSchema = z.object({
  email: z
    .string()
    .min(3, "Хамгийн багадаа 3 тэмдэгт байх ёстой")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email формат буруу"),
  password: z.string().min(3, "Хамгийн багадаа 3 тэмдэгт байх ёстой"),
});

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      router.push("/admin");
    } else {
      localStorage.setItem("role", "user");
      router.push("/user");
    }
  }

  return (
    <div className="p-5 flex justify-center items-center gap-3">
      <Snowfall color="#82C3D9" />
      <div className="w-full flex justify-center">
        <Card className="w-100 border-none">
          <CardHeader>
            <h1 className="text-xl font-bold">Login</h1>
            <p className="text-gray-500">
              Enter your email and password to continue.
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="text-gray-500">Don’t have an account?</p>
            <Button
              className="text-blue-500"
              variant="link"
              onClick={() => router.push("/Signup")}
            >
              Sign up
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full">
        <img
          src="delivery.jpg"
          alt="delivery"
          className="w-full h-280 object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
