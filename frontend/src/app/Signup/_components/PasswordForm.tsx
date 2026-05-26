"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
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
import { ArrowLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Хамгийн багадаа 8 тэмдэгт")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Том үсэг, жижиг үсэг, тоо агуулсан байх ёстой"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

export default function PasswordForm({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      email,
      password: values.password,
    });
    // 👉 энд signup API дуудна
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  return (
    <div className="p-5 flex justify-center items-center gap-3">
      <div className="w-full flex justify-center">
        <Card className="w-100 border-none">
          <button onClick={onBack} className="pl-5">
            <ArrowLeft className="bg-gray-200 w-9 h-9 rounded-md" />
          </button>

          <CardHeader>
            <h1 className="text-xl font-bold">Create a strong password</h1>
            <p className="text-gray-500">
              Create a strong password with letters, numbers.
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirm ? (
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid}
                >
                  Create account
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="text-gray-500">Already have an account?</p>
            <Button
              variant="link"
              className="text-blue-500"
              onClick={() => router.push("/login")}
            >
              Login
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
