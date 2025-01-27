import { createFileRoute } from "@tanstack/react-router";
import { Login } from "./-login";

export const Route = createFileRoute("/login/login")({
  component: Login,
});
