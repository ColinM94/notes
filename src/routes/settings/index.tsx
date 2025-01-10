import { createFileRoute } from "@tanstack/react-router";

import { Card } from "components/card/card";

import styles from "./styles.module.css";

export const RouteComponent = () => {
  return (
    <>
      <Card className={styles.card}>Hello</Card>
    </>
  );
};

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});
