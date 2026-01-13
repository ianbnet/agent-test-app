import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCounter() {
  return useQuery({
    queryKey: [api.counter.get.path],
    queryFn: async () => {
      const res = await fetch(api.counter.get.path);
      if (!res.ok) throw new Error("Failed to fetch counter");
      return api.counter.get.responses[200].parse(await res.json());
    },
  });
}

export function useIncrementCounter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.counter.increment.path, {
        method: api.counter.increment.method,
      });
      if (!res.ok) throw new Error("Failed to increment counter");
      return api.counter.increment.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      // Optimistically update or just invalidate
      queryClient.setQueryData([api.counter.get.path], data);
    },
  });
}
