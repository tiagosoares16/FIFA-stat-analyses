import { Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="p-4 flex items-center bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-10.5l5 3-5 3v-6z" />
          </svg>
          <span className="text-xl font-bold">FIFA Stats Explorer</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline font-medium">Home</Link>
          <Link to="/players" className="hover:underline font-medium">Players</Link>
          <Link to="/compare" className="hover:underline font-medium">Compare</Link>
          <Link to="/squad-builder" className="hover:underline font-medium">Squad Builder</Link>
          <Link to="/transfers" className="hover:underline font-medium">Transfers</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 rounded-full">
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
