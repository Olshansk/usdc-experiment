import { USDCSupplyCard } from "@/components/usdc-supply-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">$</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">USDC Tracker</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Live Data
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Insights
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-5xl font-bold text-foreground mb-6">Real-Time USDC Supply Tracking</h2>
            <p className="text-xl text-muted-foreground mb-8">
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
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Live Updates</h3>
              <p className="text-muted-foreground">
                Real-time data polling every 10 seconds directly from Ethereum mainnet
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-secondary font-bold">RPC</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Grove City RPC</h3>
              <p className="text-muted-foreground">Powered by institutional-grade blockchain infrastructure</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-accent font-bold">$</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">USDC Focus</h3>
              <p className="text-muted-foreground">Dedicated tracking of Circle's USD Coin supply metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with v0.dev • Powered by Grove City RPC • Data from Ethereum Mainnet
          </p>
        </div>
      </footer>
    </main>
  )
}
