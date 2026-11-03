"use client";

import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useAdminDashboardStats } from "@/hooks/use-appointment";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: serverStats, isLoading: statsLoading } = useAdminDashboardStats();

  const stats = {
    totalDoctors: serverStats?.totalDoctors ?? 0,
    activeDoctors: serverStats?.activeDoctors ?? 0,
    totalAppointments: serverStats?.totalAppointments ?? 0,
    completedAppointments: serverStats?.completedAppointments ?? 0,
  };

  if (statsLoading && !serverStats) return <LoadingUI />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24 pb-16 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card border border-border/80 rounded-2xl p-5 sm:p-6 gap-4 shadow-xs">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20 text-[11px] font-semibold text-primary uppercase tracking-wide">
              <span className="size-1.5 bg-primary rounded-full animate-pulse" />
              Practice Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {user?.firstName || "Administrator"}!
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Oversee clinical operations, manage attending doctor profiles, and review hospital appointment throughput.
            </p>
          </div>

          <div className="hidden lg:flex items-center justify-center size-14 bg-primary/10 rounded-xl border border-primary/20 text-primary shrink-0">
            <SettingsIcon className="size-7 text-primary" />
          </div>
        </div>

        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />

        <DoctorsManagement />
        <RecentAppointments />
      </div>
    </div>
  );
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center space-y-4">
            <div className="relative size-12 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-semibold tracking-wide">
                Loading Practice Portal
              </h2>
              <p className="text-muted-foreground text-xs">
                Fetching clinical operations and practice statistics...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
