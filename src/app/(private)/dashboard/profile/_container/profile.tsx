'use client'

import { SidebarLayout } from "@/core/layouts/sidebar.layout"
import ProfileHeroSection from "@/core/section/private/profile/hero-section"

export default function ProfileContainer(){
    return(
        <SidebarLayout>
            <main>
                <ProfileHeroSection />
            </main>
        </SidebarLayout>
    )
}