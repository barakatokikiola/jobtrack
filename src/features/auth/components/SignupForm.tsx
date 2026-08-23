"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, type SignupFormData } from "../schemas/auth.schema";
import { signup } from "../services/auth.service";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function SignupForm() {
  const [success, setSuccess] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupFormData) {
    setSuccess(false);

    try {
      const result = await signup(data);

      if (result.user && !result.session) {
        setSuccess(true);
        toast.success("Welcome to JobTrack!", {
          description: "Your account has been created successfully.",
          position: "top-right",
        });
        form.reset();
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error("Account Creation Failed", {
        description: message,
        position: "top-right",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        {success && (
          <div className="rounded-md border p-4 text-sm">
            <p className="font-medium">Account created successfully!</p>
            <p className="text-muted-foreground">
              Check your email to confirm your account before signing in.
            </p>
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="pl-10"
                    />
                  </div>
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
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
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
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-navy text-white hover:bg-navy-dark"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create account"}
          </Button>
        </form>
      </Form>
      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-sm text-navy hover:underline hover:text-brand font-medium"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
