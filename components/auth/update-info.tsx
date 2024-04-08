"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//schemas
import { RegisterSchema } from "@/schemas";
import { User } from "@/types/user";

// components
import CardWrapper from "./card-wrapper";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { updateUser } from "@/actions/update-user-infp";

interface UpdateInfoFormProps {
  data: User;
}

const UpdateInfoForm = ({ data }: UpdateInfoFormProps) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: data?.email,
      password: "********",
      name: data?.name,
      surname: data?.surname,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    updateUser(values, data?.email);
  };

  return (
    <CardWrapper
      headerLabel="Informacije o korisniku"
      showSocial={false}
      classname=" p-6 border-hidden shadow-none md:p-12 md:shadow-none lg:shadow-none md:py-0 md:w-2/3"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ime</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Unesite ime..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {/* <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezime</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Unesite prezime..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField> */}
            {/* <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Korisničko ime</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Unesite korisničko ime..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField> */}
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Unesite email..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lozinka</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Unesite lozinku..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField> */}
          </div>
          <Button variant="default" size="lg" type="submit" className="w-full">
            Spremi podatke
          </Button>
          {data.email} {data.name}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default UpdateInfoForm;
