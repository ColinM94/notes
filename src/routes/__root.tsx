import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import styles from "./styles.module.css";

const component = () => (
  <>
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>

      <div className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/about" className={styles.navLink}>
          About
        </Link>
        <Link to="/settings" className={styles.navLink}>
          Settings
        </Link>
      </div>
    </div>

    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({
  component,
});
