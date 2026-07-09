"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AuthRequiredDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
};

export const AuthRequiredDialog = ({
  open,
  onOpenChange,
  title = "Та эхлээд нэвтрэх хэрэгтэй",
  description = "Хоол захиалахдаа эхлээд өөрийн аккаунтаар нэвтэрнэ үү.",
}: AuthRequiredDialogProps) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-zinc-500 mb-6">{description}</p>

        <div className="flex flex-col gap-3">
          <Button
            className="rounded-full bg-black hover:bg-gray-600"
            onClick={() => {
              onOpenChange(false);
              router.push("/login");
            }}
          >
            Login
          </Button>

          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              onOpenChange(false);
              router.push("/Signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
