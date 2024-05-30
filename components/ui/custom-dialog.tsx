import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AddProductForm from "../add-product-form";
import { Product } from "@/types/product";
import { Filter } from "@/data/filters";
import { StaticImageData } from "next/image";
import { Button } from "./button";

interface CustomDialogProps {
  children: React.ReactNode;
  header: string;
  classname?: string;
  trigger: string;
  triggerIcon?: StaticImageData;
  action?: (value: any) => void;
  actionLabel?: string;
}
const CustomDialog = ({
  children,
  header,
  classname,
  trigger,
  triggerIcon,
  action,
  actionLabel,
}: CustomDialogProps) => {
  return (
    <div className={`${classname}`}>
      <Dialog>
        <DialogTrigger>
          <div className="flex flex-row justify-center align-middle pt-1 md:pt-0 gap-2 md:gap-0">
            {trigger}{" "}
            {triggerIcon && (
              <Image
                src={triggerIcon}
                alt="filter icon"
                width={24}
                height={24}
              />
            )}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
        </DialogContent>
        {/* {action ? (
          <DialogFooter>
            <Button onClick={action}>{actionLabel}</Button>
          </DialogFooter>
        ) : (
          ""
        )} */}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
