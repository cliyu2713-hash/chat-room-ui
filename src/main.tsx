import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootRoute, Router, RouterProvider } from '@tanstack/react-router'
import { ChatRoom, Route } from './routes/index.tsx'
import './index.css'

const rootRoute = new RootRoute({
  component: () => <RouterProvider router={router} />,
})

const indexRoute = Route

const routeTree = rootRoute.addChildren([indexRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
