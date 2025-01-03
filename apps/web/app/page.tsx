import { auth } from "@/lib/auth"
import { Button } from "@workspace/ui/components/button"
import { headers } from "next/headers"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <h1>Not authenticated</h1>
        </div>
      </div>
    </div>
  }
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <h1>Welcome {session.user.name}</h1>
        </div><Button size="sm">Button</Button>
      </div>
    </div>
  )
}
