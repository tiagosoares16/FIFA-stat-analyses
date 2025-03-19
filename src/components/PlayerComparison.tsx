import { usePlayerStore } from '@/lib/store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { X, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function PlayerComparison() {
  const { compareList, removeFromCompare, clearCompareList } = usePlayerStore()
  
  if (compareList.length === 0) {
    return (
      <div className="text-center p-6 border rounded-lg bg-muted/10">
        <h3 className="text-lg font-medium mb-2">No Players Selected</h3>
        <p className="text-muted-foreground mb-4">
          Add players to compare their stats side by side.
        </p>
      </div>
    )
  }
  
  const attributeCategories = [
    {
      name: 'Basic Info',
      attributes: [
        { key: 'name', label: 'Name' },
        { key: 'position', label: 'Position' },
        { key: 'club', label: 'Club' },
        { key: 'nationality', label: 'Nationality' },
        { key: 'height', label: 'Height' },
      ]
    },
    {
      name: 'Ratings',
      attributes: [
        { key: 'overall', label: 'Overall' },
        { key: 'potential', label: 'Potential' },
      ]
    }
    // Add more categories here (physical, technical, etc.) as needed
  ]
  
  const getBestValueClass = (key: string, value: any) => {
    // For numeric attributes, highlight the best value
    if (typeof value === 'number') {
      // For most attributes, higher is better
      const isHighestBetter = ['height'].includes(key) ? false : true
      
      const values = compareList.map(player => player[key as keyof typeof player] as number)
      const bestValue = isHighestBetter ? Math.max(...values) : Math.min(...values)
      
      if (value === bestValue) {
        return 'font-bold text-green-600 dark:text-green-400'
      }
    }
    
    return ''
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Player Comparison</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearCompareList}
        >
          <Trash className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Attribute</TableHead>
              {compareList.map((player) => (
                <TableHead key={player.id} className="text-center min-w-[150px]">
                  <div className="flex flex-col items-center">
                    <div className="mb-1 font-bold">{player.name}</div>
                    <Badge variant="outline" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      {player.overall}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-0 right-0 h-5 w-5"
                      onClick={() => removeFromCompare(player.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {attributeCategories.map((category) => (
              <>
                <TableRow key={category.name} className="bg-muted/50">
                  <TableCell colSpan={compareList.length + 1} className="font-bold">
                    {category.name}
                  </TableCell>
                </TableRow>
                
                {category.attributes.map((attr) => (
                  <TableRow key={attr.key}>
                    <TableCell className="font-medium">{attr.label}</TableCell>
                    {compareList.map((player) => {
                      const value = player[attr.key as keyof typeof player]
                      return (
                        <TableCell 
                          key={`${player.id}-${attr.key}`} 
                          className={`text-center ${getBestValueClass(attr.key, value)}`}
                        >
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 