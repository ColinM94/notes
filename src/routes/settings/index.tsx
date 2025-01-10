import { createFileRoute } from "@tanstack/react-router";

import { Card } from "components/card/card";

import styles from "./styles.module.css";

export const RouteComponent = () => {
  return (
    <div className={styles.container}>
      <Card>Hello</Card>
      asdfkljasdkfjsdl
    </div>
  );
};

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});
