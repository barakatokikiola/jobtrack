import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createApplication } from "../services/applications.service";
import type { ApplicationFormData } from "../schemas/application.schema";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      userId,
    }: {
      data: ApplicationFormData;
      userId: string;
    }) => createApplication(data, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}