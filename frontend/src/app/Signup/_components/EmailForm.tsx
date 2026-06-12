"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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

const formSchema = z.object({
  username: z.string().min(3, "Хамгийн багадаа 3 тэмдэгт байх ёстой"),
  email: z
    .string()
    .min(10, "Хамгийн багадаа 10 тэмдэгт байх ёстой")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email формат буруу"),
});

export default function EmailForm({
  onNext,
}: {
  onNext: (email: string, username: string) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values.email, values.username);
  }
  const router = useRouter();
  return (
    <div className="p-5 flex justify-center items-center gap-3">
      <div className="w-full flex justify-center">
        <Card className="w-100 border-none">
          <button className="pl-5">
            <ArrowLeft className="bg-gray-200 w-9 h-9 rounded-md" />
          </button>

          <CardHeader>
            <h1 className="text-xl font-bold">Create your account</h1>
            <p className="text-gray-500">
              Sign up to explore your favorite dishes.
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Let's go
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
