import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { Order } from "../utils/Interfaces";
import toast from "react-hot-toast";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await client.get("/order");
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch orders. Please try again later.");
        throw error;
      }
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Order) => {
      const response = await client.post("/order", order, {
        method: "POST",
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order added successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Something went wrong, ty again later please");
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Order>;
    }) => {
      const response = await client.put(`/order/${id}`, updates, {
        method: "PUT",
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to update the order. Please try again later.");
    },
  });
};
