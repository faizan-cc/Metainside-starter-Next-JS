"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useTrendingTokens,
  useTokenPrice,
  usePortfolio,
} from "@/hooks/useUniblock";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Wallet,
  Search,
  RefreshCw,
  ExternalLink,
  BarChart3,
} from "lucide-react";

// Popular token addresses for demo
const POPULAR_TOKENS = {
  ETH: "0x0000000000000000000000000000000000000000",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
};

export function MarketDataDashboard() {
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [walletAddress, setWalletAddress] = useState("");

  // Fetch trending tokens (Ethereum mainnet)
  const {
    tokens: trendingTokens,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrendingTokens(8, 1);

  // Fetch selected token price
  const { price: tokenPrice, isLoading: priceLoading } = useTokenPrice(
    POPULAR_TOKENS[selectedToken as keyof typeof POPULAR_TOKENS],
    1
  );

  // Fetch portfolio data if wallet address is provided
  const { portfolio, isLoading: portfolioLoading } = usePortfolio(
    walletAddress,
    1
  );

  const formatPrice = (price?: number | string) => {
    if (!price && price !== 0) return "N/A";
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "N/A";
    if (numPrice < 0.01) return `$${numPrice.toFixed(6)}`;
    if (numPrice < 1) return `$${numPrice.toFixed(4)}`;
    return `$${numPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatChange = (change?: number) => {
    if (!change && change !== 0)
      return <span className="text-gray-500">N/A</span>;
    const isPositive = change >= 0;
    return (
      <span
        className={`flex items-center gap-1 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  const formatVolume = (volume?: number) => {
    if (!volume && volume !== 0) return "N/A";
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Web3 Market Data Dashboard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real-time market data powered by Uniblock API
        </p>
      </div>

      {/* Token Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(POPULAR_TOKENS).map(([symbol, address]) => (
          <Card
            key={symbol}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedToken === symbol ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedToken(symbol)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{symbol}</CardTitle>
                <Badge
                  variant={selectedToken === symbol ? "default" : "secondary"}
                >
                  {selectedToken === symbol ? "Selected" : "Click to select"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {selectedToken === symbol && tokenPrice ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {formatPrice(tokenPrice.usdPrice || tokenPrice.price_usd)}
                  </div>
                  <div className="text-sm">
                    {formatChange(tokenPrice.price_change_24h)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Vol: {formatVolume(tokenPrice.volume_24h)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16">
                  <DollarSign className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Token Details */}
      {tokenPrice && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {selectedToken} Token Details
            </CardTitle>
            <CardDescription>
              Detailed information for {tokenPrice.name || selectedToken}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Current Price
                </p>
                <p className="text-2xl font-bold">
                  {formatPrice(tokenPrice.usdPrice || tokenPrice.price_usd)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  24h Change
                </p>
                <div className="text-xl font-semibold">
                  {formatChange(tokenPrice.price_change_24h)}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  24h Volume
                </p>
                <p className="text-xl font-semibold">
                  {formatVolume(tokenPrice.volume_24h)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Market Cap
                </p>
                <p className="text-xl font-semibold">
                  {formatVolume(tokenPrice.market_cap)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Tokens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Trending Tokens
            {trendingLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
          </CardTitle>
          <CardDescription>
            Most active tokens on Ethereum network
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trendingLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Loading trending tokens...
              </p>
            </div>
          ) : trendingError ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Failed to load trending tokens
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your Uniblock API key configuration
              </p>
            </div>
          ) : trendingTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingTokens.map((token, index) => (
                <div
                  key={token.address}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{token.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        {token.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatPrice(token.price_usd)}
                    </p>
                    <div className="text-sm">
                      {formatChange(token.price_change_24h)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No trending tokens available
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio Tracker
          </CardTitle>
          <CardDescription>
            Enter a wallet address to view portfolio holdings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={() => setWalletAddress("")} variant="outline">
              Clear
            </Button>
          </div>

          {portfolioLoading && walletAddress ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : portfolio ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Portfolio Value</h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatPrice(portfolio.total_value_usd)}
                </p>
              </div>
              <div className="grid gap-3">
                {portfolio.tokens.map((token) => (
                  <div
                    key={token.address}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{token.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        {token.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(token.value_usd)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {token.balance_formatted.toLocaleString()}{" "}
                        {token.symbol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : walletAddress ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No portfolio data available for this address
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Enter a wallet address to view portfolio
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Uniblock API Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Status</p>
              <p className="text-sm text-muted-foreground">
                Real-time Web3 market data integration
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Connected
            </Badge>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Token prices with 10-30s refresh intervals</p>
            <p>• Portfolio tracking and analytics</p>
            <p>• Trending tokens discovery</p>
            <p>• Transaction history and DEX trades</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
