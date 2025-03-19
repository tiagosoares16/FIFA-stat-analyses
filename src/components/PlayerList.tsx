import { usePlayerStore } from '@/lib/store'
import { PlayerCard } from '@/components/PlayerCard'
import { Skeleton } from '@/components/ui/skeleton'

export function PlayerList() {
  const { players, isLoading, error } = usePlayerStore()
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center p-6 text-center">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold mb-2">Error Loading Players</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }
  
  if (players.length === 0) {
    return (
      <div className="flex justify-center items-center p-6 text-center">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold mb-2">No Players Found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  )
} 