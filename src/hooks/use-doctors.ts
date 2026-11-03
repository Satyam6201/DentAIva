"use client";

import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
  return useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAdminDashboardStats"] });
    },
    onError: (error) => console.error("Error creating doctor:", error),
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["getAdminDashboardStats"] });
    },
    onError: (error) => console.error("Failed to update doctor:", error),
  });
}

// Get available doctors for appointments
export function useAvailableDoctors() {
  return useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
}
