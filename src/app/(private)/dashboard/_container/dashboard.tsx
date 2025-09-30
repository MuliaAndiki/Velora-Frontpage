'use client'

import { SidebarLayout } from "@/core/layouts/sidebar.layout"
import DashboardHeroSection from "@/core/section/private/dashboard/hero-section"

export default function  DashboardContainer () {
    return(
        <SidebarLayout>
        <main className="w-full min-h-screen flex flex-col">
          <DashboardHeroSection />
        </main>
        </SidebarLayout>
    )
}
