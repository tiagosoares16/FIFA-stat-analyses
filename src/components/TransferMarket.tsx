import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { usePlayerStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlayerCard } from '@/components/PlayerCard'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeftRight, UserMinus, UserPlus } from 'lucide-react'

export function TransferMarket() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transfers, setTransfers] = useState<any[]>([])
  const [freeAgents, setFreeAgents] = useState<any[]>([])
  const [loanPlayers, setLoanPlayers] = useState<any[]>([])
  const { removedPlayers, restorePlayer } = usePlayerStore()
  
  const fetchTransferData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Fetch all transfer data in parallel
      const [transfersResponse, freeAgentsResponse, loanPlayersResponse] = await Promise.all([
        api.getTransfers(),
        api.getFreeAgents(),
        api.getLoanPlayers(),
      ])
      
      setTransfers(transfersResponse.data)
      setFreeAgents(freeAgentsResponse.data)
      setLoanPlayers(loanPlayersResponse.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transfer data')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchTransferData()
  }, [])
  
  const renderTabContent = (data: any[], emptyMessage: string) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
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
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      )
    }
    
    if (data.length === 0) {
      return (
        <div className="flex justify-center items-center p-6 text-center">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">No Players Found</h3>
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    )
  }
  
  const renderRemovedPlayers = () => {
    if (removedPlayers.length === 0) {
      return (
        <div className="flex justify-center items-center p-6 text-center">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">No Removed Players</h3>
            <p className="text-muted-foreground">Players you remove will appear here.</p>
          </div>
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {removedPlayers.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center"
                    onClick={() => restorePlayer(player.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Restore Player
                  </button>
                </div>
                <PlayerCard player={player} showActions={false} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="transfers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transfers" className="flex items-center">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Transfers
          </TabsTrigger>
          <TabsTrigger value="free-agents" className="flex items-center">
            <UserMinus className="h-4 w-4 mr-2" />
            Free Agents
          </TabsTrigger>
          <TabsTrigger value="loan-players" className="flex items-center">
            <ArrowLeftRight className="h-4 w-4 mr-2 rotate-90" />
            Loan Players
          </TabsTrigger>
          <TabsTrigger value="removed-players" className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Removed Players
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transfers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent(transfers, 'No recent transfers found in the database.')}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="free-agents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Agents</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent(freeAgents, 'No free agents found in the database.')}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loan-players" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Listed Players</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent(loanPlayers, 'No loan listed players found in the database.')}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="removed-players" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Removed Players</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRemovedPlayers()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 