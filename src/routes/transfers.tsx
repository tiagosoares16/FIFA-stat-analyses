import { createFileRoute } from '@tanstack/react-router'
import { TransferMarket } from '@/components/TransferMarket'

export const Route = createFileRoute('/transfers')({
  component: TransfersPage,
})

function TransfersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Transfer Market</h1>
      
      <TransferMarket />
    </div>
  )
} 