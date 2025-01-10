import { createFileRoute } from "@tanstack/react-router";

export const RouteComponent = () => {
  return <div>Hello "/about/"!</div>;
};

export const Route = createFileRoute("/about/")({
  component: RouteComponent,
});
