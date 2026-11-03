"use client";

import {
  bookAppointment,
  getAdminDashboardStats,
  getAppointments,
  getBookedTimeSlots,
  getUserAppointments,
  updateAppointmentStatus,
} from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAppointments(limit: number = 100, offset: number = 0) {
  return useQuery({
    queryKey: ["getAppointments", limit, offset],
    queryFn: () => getAppointments(limit, offset),
  });
}

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ["getAdminDashboardStats"],
    queryFn: getAdminDashboardStats,
    refetchInterval: 30000, // Background poll every 30s for live clinic updates
  });
}

export function useBookedTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ["getBookedTimeSlots", doctorId, date],
    queryFn: () => getBookedTimeSlots(doctorId, date),
    enabled: Boolean(doctorId && date),
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
      queryClient.invalidateQueries({
        queryKey: ["getBookedTimeSlots", variables.doctorId, variables.date],
      });
      queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["getAdminDashboardStats"] });
    },
    onError: (error) => console.error("Failed to book appointment:", error),
  });
}

// Get user-specific appointments
export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["getAdminDashboardStats"] });
    },
    onError: (error) => console.error("Failed to update appointment:", error),
  });
}
