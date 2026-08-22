import { getApplications } from "@/features/applications/services/applications.service";
import { useQuery } from "@tanstack/react-query";


export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
}