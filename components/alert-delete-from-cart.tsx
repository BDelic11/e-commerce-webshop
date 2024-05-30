import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCartItem } from "@/actions/cartItem";

interface CustomAlertDialogProps {
  children: React.ReactNode;
  deletingObject: string;
  cartId: string;
  itemId: string;
}

const AlertDeleteFromCart = ({
  children,
  deletingObject,
  cartId,
  itemId,
}: CustomAlertDialogProps) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Jeste li sigurni?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Ova se akcija nemože poništiti. Trajno ćete maknuti
              ${deletingObject} iz košarice.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Odustani</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCartItem(cartId, itemId)}>
              Uredu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDeleteFromCart;
