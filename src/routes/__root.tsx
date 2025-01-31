import * as React from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

import { Icon } from "components/icon/icon";
import { Header } from "components/header/header";
import { classes } from "utils/classes";
import { useAppStore } from "stores/appStore";
import { Login } from "components/login/login";

import styles from "./styles.module.css";
import { pb } from "inits/backend";

const Root = () => {
  const { pathname } = useLocation();
  const { user, updateAppStore } = useAppStore();

  const [isInitialising, setIsInitialising] = React.useState(true);

  // const initialise = async () => {
  //   let session: Models.Session | undefined;

  //   try {
  //     session = await account.getSession("current");
  //   } catch (error) {
  //     console.log(String(error));
  //   }

  //   try {
  //     if (!session) {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       const secret = urlParams.get("secret");
  //       const userId = urlParams.get("userId");

  //       if (!secret || !userId) throw "Missing secret or userId";

  //       session = await account.createSession(userId, secret);
  //     }
  //   } catch (error) {
  //     console.log(String(error));
  //   }

  //   updateAppStore({
  //     user: {
  //       id: session?.userId || "",
  //     },
  //   });

  //   setIsInitialising(false);
  // };

  const initialise = () => {
    if (pb.authStore.isValid) {
      updateAppStore({
        user: {
          id: pb.authStore.record?.id,
        },
      });
    }

    setIsInitialising(false);
  };

  React.useEffect(() => {
    initialise();
  }, []);

  if (isInitialising) return "...loading";

  if (!user.id) return <Login />;

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
