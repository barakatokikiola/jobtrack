import { useQuery } from "@tanstack/react-query";
import { getApplicationById } from "../services/applications.service";

export function useApplication(id: string) {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
    enabled: Boolean(id),
  });
}