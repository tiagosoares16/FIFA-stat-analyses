import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlayerCard } from '@/components/PlayerCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BarChart4, Search, Star, TrendingUp, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [trendingPlayers, setTrendingPlayers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchTrendingPlayers = async () => {
      try {
        setIsLoading(true)
        const response = await api.getTrendingPlayers()
        setTrendingPlayers(response.data.slice(0, 4))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trending players')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTrendingPlayers()
  }, [])
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">FIFA Stats Explorer</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your ultimate platform for FIFA player data, comparisons and squad building
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
            <Link to="/players">
              <Search className="mr-2 h-5 w-5" />
              Find Players
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link to="/squad-builder">
              <Users className="mr-2 h-5 w-5" />
              Build Squad
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-blue-500" />
                Advanced Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Search players by name, club, nationality, position, potential, and more.
              </CardDescription>
              <Button asChild variant="link" className="mt-2 p-0">
                <Link to="/players" className="flex items-center">
                  Try Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart4 className="mr-2 h-5 w-5 text-blue-500" />
                Player Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compare multiple players side by side to analyze their strengths and weaknesses.
              </CardDescription>
              <Button asChild variant="link" className="mt-2 p-0">
                <Link to="/compare" className="flex items-center">
                  Try Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Squad Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create your dream team and calculate chemistry and overall rating.
              </CardDescription>
              <Button asChild variant="link" className="mt-2 p-0">
                <Link to="/squad-builder" className="flex items-center">
                  Try Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Trending Players Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Players</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/players" className="flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        ) : error ? (
          <div className="text-center p-6 border rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
