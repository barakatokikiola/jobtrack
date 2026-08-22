import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateApplication,
} from "../services/applications.service";

import type { ApplicationFormData } from "../schemas/application.schema";

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ApplicationFormData;
    }) => updateApplication(id, data),

    onSuccess: (application) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["application", application.id],
      });
    },
  });
}