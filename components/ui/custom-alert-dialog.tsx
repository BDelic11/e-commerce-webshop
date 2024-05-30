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

interface CustomAlertDialogProps {
  children: React.ReactNode;
  deletingObject: string;
  action: (id: string) => void;
  id: string;
}

const CustomAlertDialog = ({
  children,
  deletingObject,
  action,
  id,
}: CustomAlertDialogProps) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Jeste li sigurni?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Ova se akcija nemože poništiti. Trajno ćete izbrisati
              ${deletingObject} i njegove podatke.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Odustani</AlertDialogCancel>
            <AlertDialogAction onClick={() => action(id)}>
              Uredu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomAlertDialog;
