import {
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Links
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body class="bg-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Outlet />
  )
}
