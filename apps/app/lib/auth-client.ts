import { createAuthClient } from 'better-auth/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authClient: any = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
})

export const { signIn, signUp, useSession, signOut } = authClient