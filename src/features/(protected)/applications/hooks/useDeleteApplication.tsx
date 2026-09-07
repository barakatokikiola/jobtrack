import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteApplication } from "../services/applications.service";

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteApplication(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.removeQueries({
        queryKey: ["application", id],
      });
    },
  });
}