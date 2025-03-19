import { createFileRoute } from '@tanstack/react-router'
import { PlayerComparison } from '@/components/PlayerComparison'
import { PlayerSearch } from '@/components/PlayerSearch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePlayerStore } from '@/lib/store'

export const Route = createFileRoute('/compare')({
  component: ComparePage,
})

function ComparePage() {
  const { compareList } = usePlayerStore()
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <PlayerComparison />
        </div>
        
        {compareList.length < 5 && (
          <>
            <div className="lg:col-span-3 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Players to Compare</CardTitle>
                  <CardDescription>
                    Search for players and add them to your comparison list (maximum 5 players).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PlayerSearch />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 