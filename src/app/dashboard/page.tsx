import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <WelcomeSection />
          <MainActions />
          <ActivityOverview />
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
