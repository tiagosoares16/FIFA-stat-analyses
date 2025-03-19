import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, X } from 'lucide-react'
import { api } from '@/lib/api'
import { usePlayerStore } from '@/lib/store'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface SearchFilters {
  name?: string
  club?: string
  nationality?: string
  position?: string
  minPotential?: number
  maxPotential?: number
  minHeight?: number
  maxHeight?: number
}

export function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { setPlayers, setLoading, setError } = usePlayerStore()
  
  const handleSearch = async () => {
    try {
      setLoading(true)
      
      // Combine search query with filters
      const searchParams = {
        ...filters,
        name: searchQuery || filters.name,
      }
      
      const response = await api.getPlayers(searchParams)
      setPlayers(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch players')
    } finally {
      setLoading(false)
    }
  }
  
  // Fetch initial data on component mount
  useEffect(() => {
    handleSearch()
  }, [])
  
  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  const clearFilters = () => {
    setFilters({})
    setSearchQuery('')
  }
  
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search players..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Players</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="club" className="text-sm font-medium">Club</label>
                <Input
                  id="club"
                  placeholder="Enter club name"
                  value={filters.club || ''}
                  onChange={(e) => handleFilterChange('club', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="nationality" className="text-sm font-medium">Nationality</label>
                <Input
                  id="nationality"
                  placeholder="Enter nationality"
                  value={filters.nationality || ''}
                  onChange={(e) => handleFilterChange('nationality', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="position" className="text-sm font-medium">Position</label>
                <Input
                  id="position"
                  placeholder="Enter position (e.g. ST, CM, CB)"
                  value={filters.position || ''}
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="minPotential" className="text-sm font-medium">Min Potential</label>
                  <Input
                    id="minPotential"
                    type="number"
                    placeholder="Min"
                    min={1}
                    max={99}
                    value={filters.minPotential || ''}
                    onChange={(e) => handleFilterChange('minPotential', parseInt(e.target.value) || '')}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="maxPotential" className="text-sm font-medium">Max Potential</label>
                  <Input
                    id="maxPotential"
                    type="number"
                    placeholder="Max"
                    min={1}
                    max={99}
                    value={filters.maxPotential || ''}
                    onChange={(e) => handleFilterChange('maxPotential', parseInt(e.target.value) || '')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="minHeight" className="text-sm font-medium">Min Height (cm)</label>
                  <Input
                    id="minHeight"
                    type="number"
                    placeholder="Min"
                    min={150}
                    max={220}
                    value={filters.minHeight || ''}
                    onChange={(e) => handleFilterChange('minHeight', parseInt(e.target.value) || '')}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="maxHeight" className="text-sm font-medium">Max Height (cm)</label>
                  <Input
                    id="maxHeight"
                    type="number"
                    placeholder="Max"
                    min={150}
                    max={220}
                    value={filters.maxHeight || ''}
                    onChange={(e) => handleFilterChange('maxHeight', parseInt(e.target.value) || '')}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                
                <Button onClick={() => {
                  handleSearch()
                  setIsFilterOpen(false)
                }}>
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      
      {Object.keys(filters).length > 0 && (
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Active Filters:</span>
              
              {Object.entries(filters).map(([key, value]) => (
                value && (
                  <Badge key={key} variant="secondary" className="px-2 py-1">
                    {key}: {value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => handleFilterChange(key as keyof SearchFilters, '')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-xs"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 