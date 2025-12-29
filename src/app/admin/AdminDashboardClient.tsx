"use client";
import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
 

function AdminDashboardClient() {
    const { user } = useUser();
    const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
    const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointments();

     // calculate stats from real data
    const stats = {
       totalDoctors: doctors.length,
       activeDoctors: doctors.filter((doc) => doc.isActive).length,
       totalAppointments: appointments.length,
       completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length,
    };

    if (doctorsLoading || appointmentsLoading) return <LoadingUI />;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Admin Dashboard</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Manage doctors, oversee appointments, and monitor your dental practice performance.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
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
    )
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <Navbar />

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

        {/* Glow Orbs */}
        <div className="absolute top-32 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center space-y-6">
            
            {/* SPINNER */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full bg-primary/20 animate-pulse" />
            </div>

            {/* TEXT */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-wide">
                Loading Admin Dashboard
              </h2>
              <p className="text-muted-foreground text-sm">
                Fetching doctors, appointments & stats…
              </p>
            </div>

            {/* PROGRESS DOTS */}
            <div className="flex justify-center gap-2 pt-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
