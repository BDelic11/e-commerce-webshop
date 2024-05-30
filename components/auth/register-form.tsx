"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//schemas
import { RegisterSchema } from "@/schemas";

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
import FormError from "../form-error";
import FormSuccess from "../form-success";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          setError(data?.error);
        }
        if (data.success) {
          router.push("/auth/login");
          toast("Uspješno ste se registrirali");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Imate korisnički račun?"
      showSocial
      classname=" p-6 border-hidden shadow-none md:p-12 md:shadow-lg md:border-solid md:py-0 md:w-1/3 "
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
            <FormField
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
            ></FormField>
            <FormField
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
            ></FormField>
            <FormField
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
            ></FormField>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button variant="default" size="lg" type="submit" className="w-full">
            Registriraj se
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
