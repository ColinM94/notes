import { createFileRoute } from "@tanstack/react-router";

export const RouteComponent = () => {
  return <div>Settings</div>;
};

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});
