import { useState } from 'react'
import { usePlayerStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlayerCard } from '@/components/PlayerCard'
import { X, Users, Save, Download, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Define positions in a 4-3-3 formation
const formations = {
  '4-3-3': [
    { id: 'GK', name: 'Goalkeeper', x: 50, y: 90 },
    { id: 'LB', name: 'Left Back', x: 20, y: 70 },
    { id: 'CB1', name: 'Center Back', x: 40, y: 70 },
    { id: 'CB2', name: 'Center Back', x: 60, y: 70 },
    { id: 'RB', name: 'Right Back', x: 80, y: 70 },
    { id: 'CDM', name: 'Defensive Mid', x: 50, y: 50 },
    { id: 'CM1', name: 'Center Mid', x: 30, y: 40 },
    { id: 'CM2', name: 'Center Mid', x: 70, y: 40 },
    { id: 'LW', name: 'Left Wing', x: 20, y: 20 },
    { id: 'ST', name: 'Striker', x: 50, y: 10 },
    { id: 'RW', name: 'Right Wing', x: 80, y: 20 },
  ],
  '4-4-2': [
    { id: 'GK', name: 'Goalkeeper', x: 50, y: 90 },
    { id: 'LB', name: 'Left Back', x: 20, y: 70 },
    { id: 'CB1', name: 'Center Back', x: 40, y: 70 },
    { id: 'CB2', name: 'Center Back', x: 60, y: 70 },
    { id: 'RB', name: 'Right Back', x: 80, y: 70 },
    { id: 'LM', name: 'Left Mid', x: 20, y: 40 },
    { id: 'CM1', name: 'Center Mid', x: 40, y: 40 },
    { id: 'CM2', name: 'Center Mid', x: 60, y: 40 },
    { id: 'RM', name: 'Right Mid', x: 80, y: 40 },
    { id: 'ST1', name: 'Striker', x: 35, y: 10 },
    { id: 'ST2', name: 'Striker', x: 65, y: 10 },
  ],
}

export function SquadBuilder() {
  const { savedSquad, removeFromSquad } = usePlayerStore()
  const [activeFormation, setActiveFormation] = useState<keyof typeof formations>('4-3-3')
  const [positionAssignments, setPositionAssignments] = useState<Record<string, number>>({})
  
  const availablePlayers = savedSquad.filter(player => 
    !Object.values(positionAssignments).includes(player.id)
  )
  
  const calculateSquadRating = () => {
    if (Object.keys(positionAssignments).length === 0) {
      return 0
    }
    
    const assignedPlayers = Object.entries(positionAssignments).map(([_, playerId]) => {
      return savedSquad.find(p => p.id === playerId)
    }).filter(Boolean)
    
    if (assignedPlayers.length === 0) {
      return 0
    }
    
    const avgRating = assignedPlayers.reduce((sum, player) => 
      sum + (player?.overall || 0), 0) / assignedPlayers.length
    
    return Math.round(avgRating)
  }
  
  const calculateChemistry = () => {
    // A simplified chemistry calculation
    // In a real app, this would be more complex based on club, nationality, etc.
    const positionsFilled = Object.keys(positionAssignments).length
    const totalPositions = formations[activeFormation].length
    
    return Math.round((positionsFilled / totalPositions) * 100)
  }
  
  const assignPlayerToPosition = (positionId: string, playerId: number) => {
    setPositionAssignments(prev => ({
      ...prev,
      [positionId]: playerId
    }))
  }
  
  const removePlayerFromPosition = (positionId: string) => {
    setPositionAssignments(prev => {
      const newAssignments = { ...prev }
      delete newAssignments[positionId]
      return newAssignments
    })
  }
  
  const getPlayerByPositionId = (positionId: string) => {
    const playerId = positionAssignments[positionId]
    return savedSquad.find(player => player.id === playerId)
  }
  
  const squadRating = calculateSquadRating()
  const chemistry = calculateChemistry()
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-8/12">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Squad Builder</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">Rating:</span>
                    <Badge variant="outline" className="bg-amber-500 text-white">
                      {squadRating}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">Chemistry:</span>
                    <Badge variant="outline" className="bg-green-500 text-white">
                      {chemistry}%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Tabs 
                defaultValue={activeFormation} 
                className="w-full mt-2"
                onValueChange={(value) => setActiveFormation(value as keyof typeof formations)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="4-3-3">4-3-3</TabsTrigger>
                  <TabsTrigger value="4-4-2">4-4-2</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <div 
                className="relative w-full h-[500px] bg-gradient-to-b from-green-600 to-green-700 rounded-lg border-2 border-white"
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNMTAwIDBWMjAwTTAgMTAwSDIwME01MCAxMDBhNTAsNTAgMCwxLDAgMTAwLDAgNTAsNTAgMCwxLDAtMTAwLDAiIHN0cm9rZT0iI2ZmZmZmZjMwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIiIGZpbGw9IiNmZmZmZmY1MCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAiIHN0cm9rZT0iI2ZmZmZmZjUwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNNSAxMDBBOTUsOTUgMCwwLDAgMTk1LDEwMCBBOTUsOTUgMCwwLDAgNSwxMDAiIHN0cm9rZT0iI2ZmZmZmZjMwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')" }}
              >
                {formations[activeFormation].map(position => {
                  const player = getPlayerByPositionId(position.id)
                  
                  return (
                    <div 
                      key={position.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: `${position.x}%`, 
                        top: `${position.y}%`,
                      }}
                    >
                      {player ? (
                        <div className="flex flex-col items-center">
                          <div className="relative bg-white text-black rounded-full w-14 h-14 flex items-center justify-center shadow-md border-2 border-slate-200">
                            <div className="flex flex-col items-center justify-center">
                              <div className="text-xs font-bold">{position.id}</div>
                              <div className="text-sm font-bold">{player.overall}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white p-0 hover:bg-red-600"
                              onClick={() => removePlayerFromPosition(position.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="mt-1 px-2 py-0.5 bg-black/70 text-white rounded text-xs max-w-[80px] truncate">
                            {player.name}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="bg-white/80 text-black rounded-full w-12 h-12 flex items-center justify-center border border-dashed border-white">
                            <div className="text-sm font-bold">{position.id}</div>
                          </div>
                          <div className="mt-1 text-white/90 text-xs">
                            {position.name}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save Squad
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-4/12">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Available Players ({availablePlayers.length})
              </CardTitle>
            </CardHeader>
            
            <CardContent className="max-h-[600px] overflow-y-auto scrollbar-thin pr-2">
              <div className="space-y-4">
                {availablePlayers.length === 0 ? (
                  <div className="text-center p-4 border rounded text-muted-foreground">
                    No players available. Add players to your squad.
                  </div>
                ) : (
                  formations[activeFormation].map(position => {
                    // Filter players who might be good for this position
                    // In a real app, this would use a more sophisticated algorithm
                    const suitablePlayers = availablePlayers.filter(player => {
                      // Simple position matching logic - could be improved
                      if (position.id === 'GK') return player.position === 'GK'
                      if (['LB', 'RB', 'CB1', 'CB2'].includes(position.id)) 
                        return ['LB', 'RB', 'CB'].includes(player.position)
                      if (['CM1', 'CM2', 'CDM'].includes(position.id)) 
                        return ['CM', 'CDM', 'CAM'].includes(player.position)
                      if (['LW', 'RW'].includes(position.id)) 
                        return ['LW', 'RW', 'LM', 'RM'].includes(player.position)
                      if (['ST', 'ST1', 'ST2'].includes(position.id)) 
                        return ['ST', 'CF'].includes(player.position)
                      
                      return true
                    })
                    
                    if (suitablePlayers.length === 0) return null
                    
                    return (
                      <div key={position.id}>
                        <h3 className="text-sm font-medium mb-2">For {position.name} ({position.id})</h3>
                        <div className="space-y-2">
                          {suitablePlayers.slice(0, 3).map(player => (
                            <div key={player.id} className="flex items-center justify-between p-2 bg-muted/40 rounded">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                                  {player.position}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{player.name}</div>
                                  <div className="text-xs text-muted-foreground">{player.club}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-amber-500 text-white">
                                  {player.overall}
                                </Badge>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => assignPlayerToPosition(position.id, player.id)}
                                >
                                  Assign
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }).filter(Boolean)
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 