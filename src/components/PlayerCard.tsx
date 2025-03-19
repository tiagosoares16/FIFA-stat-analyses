import type { Player } from '@/lib/types'
import { usePlayerStore } from '@/lib/store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart4, 
  PlusCircle, 
  Users, 
  Trash2, 
  ArrowRightLeft 
} from 'lucide-react'

interface PlayerCardProps {
  player: Player
  variant?: 'default' | 'compact'
  showActions?: boolean
}

export function PlayerCard({ player, variant = 'default', showActions = true }: PlayerCardProps) {
  const { addToCompare, addToSquad, addToRemoved } = usePlayerStore()
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {player.name}
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            {player.overall}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 rounded-full border-2 border-slate-200">
            <div className="bg-slate-100 h-full w-full flex items-center justify-center text-2xl font-bold text-slate-400">
              {player.position}
            </div>
          </Avatar>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Club</div>
            <div className="font-medium">{player.club}</div>
            <div className="text-sm text-muted-foreground">Nationality</div>
            <div className="font-medium">{player.nationality}</div>
          </div>
        </div>
        
        {variant === 'default' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Height:</span> {player.height}cm
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Potential:</span> {player.potential}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Position:</span> {player.position}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => addToCompare(player)}
          >
            <BarChart4 className="h-3.5 w-3.5 mr-1" />
            Compare
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => addToSquad(player)}
          >
            <Users className="h-3.5 w-3.5 mr-1" />
            Add to Squad
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => addToRemoved(player)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Remove
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 