import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { Item } from "../utils/Interfaces";
import toast from "react-hot-toast";

export const useGetItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const response = await client.get("/stock");
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch items. Please try again later.");
        throw error;
      }
    },
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Item) => {
      const response = await client.post("/stock", item, {
        method: "POST",
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Item added successfully");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => {
      toast.error("Something went wrong, ty again later please");
    },
  });
};
