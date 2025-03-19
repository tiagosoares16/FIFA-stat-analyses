import { createFileRoute } from '@tanstack/react-router'
import { PlayerSearch } from '@/components/PlayerSearch'
import { PlayerList } from '@/components/PlayerList'

export const Route = createFileRoute('/players')({
  component: PlayersPage,
})

function PlayersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Player Search</h1>
      
      <PlayerSearch />
      
      <div className="mt-8">
        <PlayerList />
      </div>
    </div>
  )
} 