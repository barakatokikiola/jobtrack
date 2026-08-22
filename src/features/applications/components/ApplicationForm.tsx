"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import {
  applicationSchema,
  type ApplicationFormData,
} from "../schemas/application.schema";
import { useRouter } from "next/navigation";
import { useCreateApplication } from "../hooks/useCreateApplication";
import { useUpdateApplication } from "../hooks/useUpdateApplication";
import { Button } from "@/components/ui/button";
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

import type { Application } from "../types/application.types";

type ApplicationFormProps = {
  userId: string;
  application?: Application;
};

export function ApplicationForm({ userId, application }: ApplicationFormProps) {
  const createApplication = useCreateApplication();
  const updateApplication = useUpdateApplication();
  const router = useRouter();

  const form = useForm<
    z.input<typeof applicationSchema>,
    unknown,
    ApplicationFormData
  >({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      job_type: "Full-time",
      work_mode: "Remote",
      salary_min: undefined,
      salary_max: undefined,
      currency: "NGN",
      job_url: "",
      status: "Applied",
      applied_at: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (application) {
      form.reset({
        company: application.company,
        position: application.position,
        location: application.location ?? "",
        job_type: application.job_type,
        work_mode: application.work_mode,
        salary_min: application.salary_min ?? undefined,
        salary_max: application.salary_max ?? undefined,
        currency: application.currency,
        job_url: application.job_url ?? "",
        status: application.status,
        applied_at: application.applied_at ?? "",
        notes: application.notes ?? "",
      });
    }
  }, [application, form]);

  async function onSubmit(data: ApplicationFormData) {
    if (application) {
      updateApplication.mutate(
        {
          id: application.id,
          data,
        },
        {
          onSuccess: () => {
            router.push(`/applications/${application.id}`);
            router.refresh();
          },
        },
      );

      return;
    }

    createApplication.mutate(
      {
        data,
        userId,
      },
      {
        onSuccess: () => {
          form.reset();
          router.push("/applications");
          router.refresh();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>

              <FormControl>
                <Input placeholder="e.g. Microsoft" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>

              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>

              <FormControl>
                <Input placeholder="e.g. Lagos, Nigeria" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="work_mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Mode</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary_min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Salary</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 250000"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary_max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Salary</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 350000"
                  {...field}
                  value={field.value == null ? "" : String(field.value)}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NGN">NGN — Nigerian Naira</SelectItem>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job URL</FormLabel>

              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/job"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applied_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applied Date</FormLabel>

              <FormControl>
                <Input type="date" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>

              <FormControl>
                <textarea
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Add any notes about this application..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createApplication.isPending || updateApplication.isPending}
        >
          {createApplication.isPending || updateApplication.isPending
            ? "Saving..."
            : application
              ? "Update application"
              : "Add application"}
        </Button>

        {(createApplication.isError || updateApplication.isError) && (
          <p className="text-sm text-destructive">
            {createApplication.error?.message ||
              updateApplication.error?.message}
          </p>
        )}
      </form>
    </Form>
  );
}
