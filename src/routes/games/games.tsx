import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/games')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/games/games"!</div>
}
