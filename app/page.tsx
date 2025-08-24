import { USDCSupplyCard } from "../components/usdc-supply-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">$</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">USDC Tracker</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Live Data
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Insights
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
            </nav>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Real-Time USDC Supply Tracking</h2>
            <p className="text-xl text-gray-600 mb-8">
              Monitor Circle's USDC total supply with live updates every 10 seconds. Powered by Grove City's
              institutional-grade Ethereum RPC infrastructure.
            </p>
          </div>

          {/* Live Supply Card */}
          <div className="mb-16">
            <USDCSupplyCard />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Updates</h3>
              <p className="text-gray-600">Real-time data polling every 10 seconds directly from Ethereum mainnet</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-amber-600 font-bold">RPC</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grove City RPC</h3>
              <p className="text-gray-600">Powered by institutional-grade blockchain infrastructure</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-green-600 font-bold">$</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">USDC Focus</h3>
              <p className="text-gray-600">Dedicated tracking of Circle's USD Coin supply metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Built with v0.dev • Powered by Grove City RPC • Data from Ethereum Mainnet</p>
        </div>
      </footer>
    </main>
  )
}
