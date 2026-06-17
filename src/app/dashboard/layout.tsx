import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { WorkspaceProvider } from "@/context/workspace-context";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { OnboardingWizard } from "@/components/dashboard/onboarding-wizard";
import { ProductTour } from "@/components/dashboard/product-tour";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="flex min-h-screen bg-muted/10">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
          <Header />
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
      <CommandPalette />
      <OnboardingWizard />
      <ProductTour />
    </WorkspaceProvider>
  );
}


