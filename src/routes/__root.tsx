import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import styles from "./styles.module.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={styles.container}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});
