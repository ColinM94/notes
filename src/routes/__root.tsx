import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

import { Icon } from "components/icon/icon";
import { classes } from "utils/classes";

import styles from "./styles.module.css";
import { Header } from "components/header/header";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className={styles.container}>
        <Header className={styles.header} />

        <div className={styles.content}>
          <Outlet />
        </div>

        <div className={styles.nav}>
          <Link
            to="/notes"
            className={classes(
              styles.link,
              pathname.includes("/notes") && styles.linkActive
            )}
          >
            <Icon icon="notes" />
          </Link>

          <Link
            to="/settings"
            className={classes(
              styles.link,
              pathname.includes("/settings") && styles.linkActive
            )}
          >
            <Icon icon="settings" />
          </Link>
        </div>
      </div>

      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
