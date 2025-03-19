import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '@/components/Header'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} FIFA Stats Explorer. All rights reserved.
      </footer>
      <TanStackRouterDevtools />
    </div>
  ),
})
