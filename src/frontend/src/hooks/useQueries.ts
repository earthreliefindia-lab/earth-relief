import type { BlogPost, ImpactStats } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";

export function useGetBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetImpactStats() {
  const { actor, isFetching } = useActor();
  return useQuery<ImpactStats | null>({
    queryKey: ["impactStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getImpactStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}
