"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "@workspace/ui/components/button"

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

const SignInForm = () => {

  const signInWithGoogle = async () => {
    const data = await signIn.social({
      provider: "google"
    })
    console.log(data)
  }

  return <div>
    <Button
      onClick={signInWithGoogle}
    >Sign in with Google</Button>
  </div>
}

