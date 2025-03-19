import { createFileRoute } from '@tanstack/react-router'
import { SquadBuilder } from '@/components/SquadBuilder'
import { PlayerSearch } from '@/components/PlayerSearch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/squad-builder')({
  component: SquadBuilderPage,
})

function SquadBuilderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Squad Builder</h1>
      
      <SquadBuilder />
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Find Players for Your Squad</CardTitle>
            <CardDescription>
              Search for players and add them to your squad (maximum 23 players).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerSearch />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 