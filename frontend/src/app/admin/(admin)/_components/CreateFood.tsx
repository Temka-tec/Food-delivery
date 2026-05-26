"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const foodFormSchema = z.object({
  name: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Price must be a valid positive number.",
    },
  ),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  ingredients: z.string().min(5, {
    message: "Ingredients must be at least 5 characters.",
  }),
  categoryId: z.string().min(1, {
    message: "Please select a category.",
  }),
});

type FoodFormValues = z.infer<typeof foodFormSchema>;

type Category = {
  _id: string;
  name: string;
};

export const CreateFoodDialog = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      price: "",
      ingredients: "",
      image: "",
      categoryId: "",
    },
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.details || error.error}`);
        return;
      }

      const blob = await response.json();
      setUploadedImageUrl(blob.url);
      form.setValue("image", blob.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImageUrl("");
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: FoodFormValues) => {
    await api.post("/foods/create", {
      name: values.name,
      price: parseFloat(values.price),
      ingredients: values.ingredients,
      image: values.image,
      categoryIds: [values.categoryId],
    });

    form.reset();
    setUploadedImageUrl("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get<Category[]>("/categories");
        setCategories(data);

        if (data.length && !form.getValues("categoryId")) {
          form.setValue("categoryId", data[0]._id, { shouldValidate: true });
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (isUploading) return;
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-full flex flex-col gap-4 items-center justify-center p-4"
        >
          <Plus />
          Add New Dish
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Add new Dish</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type food name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Select
                    value={field.value ?? ""}
                    onValueChange={(v) => field.onChange(v)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={String(category._id)}
                          value={String(category._id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Food image</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      {uploadedImageUrl ? (
                        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                          <Image
                            src={uploadedImageUrl}
                            alt="Uploaded food"
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="file-upload"
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600">
                            {isUploading
                              ? "Uploading..."
                              : "Choose a file or drag & drop it here"}
                          </p>
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-black text-white hover:bg-black/90"
              >
                Add Dish
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
