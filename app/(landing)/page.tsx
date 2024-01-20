import { LandingHero } from "@/components/LandingHero"
import { LandingNavBar } from "@/components/LandingNavBar"

export default function Landing() {
  return (
    <div className="h-full">
      <LandingNavBar />
      <LandingHero />
    </div>
  )
}
