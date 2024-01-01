import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
export default function Dashboard() {
  return (
    <div className="flex items-center justify-center h-full">
      <UserButton />
    </div>
  )
}
