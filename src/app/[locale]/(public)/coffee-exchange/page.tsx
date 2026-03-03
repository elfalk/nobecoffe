'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  BarChart3,
  RefreshCw,
  Info
} from 'lucide-react';

// Mock coffee prices data
const mockCoffeePrices = [
  {
    id: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    nameEn: 'Ethiopia Yirgacheffe',
    price: 450,
    change: 15,
    changePercent: 3.45,
    unit: 'كجم',
    origin: 'إثيوبيا',
    grade: 'G1',
    lastUpdate: '2024-01-15 14:30'
  },
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    nameEn: 'Colombia Supremo',
    price: 380,
    change: -8,
    changePercent: -2.06,
    unit: 'كجم',
    origin: 'كولومبيا',
    grade: 'Excelso',
    lastUpdate: '2024-01-15 14:30'
  },
  {
    id: 3,
    name: 'قهوة برازيل سانتوس',
    nameEn: 'Brazil Santos',
    price: 320,
    change: 5,
    changePercent: 1.59,
    unit: 'كجم',
    origin: 'البرازيل',
    grade: 'NY2',
    lastUpdate: '2024-01-15 14:30'
  },
  {
    id: 4,
    name: 'قهوة كينيا AA',
    nameEn: 'Kenya AA',
    price: 520,
    change: 20,
    changePercent: 4.00,
    unit: 'كجم',
    origin: 'كينيا',
    grade: 'AA',
    lastUpdate: '2024-01-15 14:30'
  },
  {
    id: 5,
    name: 'قهوة غواتيمالا أنتيغوا',
    nameEn: 'Guatemala Antigua',
    price: 410,
    change: -5,
    changePercent: -1.20,
    unit: 'كجم',
    origin: 'غواتيمالا',
    grade: 'SHB',
    lastUpdate: '2024-01-15 14:30'
  },
  {
    id: 6,
    name: 'قهوة يمن ماتاري',
    nameEn: 'Yemen Mokha Matari',
    price: 680,
    change: 25,
    changePercent: 3.81,
    unit: 'كجم',
    origin: 'اليمن',
    grade: 'G1',
    lastUpdate: '2024-01-15 14:30'
  }
];

const mockMarketStats = {
  totalVolume: 125000,
  avgPrice: 460,
  topGainer: { name: 'قهوة كينيا AA', change: 4.00 },
  topLoser: { name: 'قهوة كولومبيا سوبريمو', change: -2.06 },
  marketCap: 57500000
};

export default function CoffeeExchangePage() {
  const t = useTranslations('coffeeExchange');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t('title')}
            </h1>
          </div>
          <p className="text-xl text-blue-100 mb-6">
            {t('subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <RefreshCw className="w-4 h-4" />
            <span>{t('lastUpdate')}: 2024-01-15 14:30</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalVolume')}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {mockMarketStats.totalVolume.toLocaleString()} {t('kg')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('avgPrice')}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {mockMarketStats.avgPrice} ج.م/{t('kg')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('topGainer')}</p>
                  <p className="text-lg font-bold text-green-400 mt-1">
                    {mockMarketStats.topGainer.name}
                  </p>
                  <p className="text-sm text-green-400">+{mockMarketStats.topGainer.change}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('topLoser')}</p>
                  <p className="text-lg font-bold text-red-400 mt-1">
                    {mockMarketStats.topLoser.name}
                  </p>
                  <p className="text-sm text-red-400">{mockMarketStats.topLoser.change}%</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="prices" className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-8">
            <TabsTrigger value="prices" className="data-[state=active]:bg-blue-500">
              {t('prices')}
            </TabsTrigger>
            <TabsTrigger value="chart" className="data-[state=active]:bg-blue-500">
              {t('chart')}
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500">
              {t('analysis')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prices">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  {t('currentPrices')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('coffeeType')}</th>
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('origin')}</th>
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('grade')}</th>
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('price')}</th>
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('change')}</th>
                        <th className="text-right text-slate-400 font-medium py-3 px-4">{t('lastUpdate')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCoffeePrices.map(coffee => (
                        <tr key={coffee.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-white font-medium">{coffee.name}</p>
                              <p className="text-sm text-slate-400">{coffee.nameEn}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{coffee.origin}</td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {coffee.grade}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-white font-bold">{coffee.price} ج.م/{coffee.unit}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className={`flex items-center gap-1 ${
                              coffee.change >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {coffee.change >= 0 ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                              <span className="font-medium">
                                {coffee.change >= 0 ? '+' : ''}{coffee.change} ج.م
                              </span>
                              <span className="text-sm">
                                ({coffee.change >= 0 ? '+' : ''}{coffee.changePercent}%)
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-400 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {coffee.lastUpdate}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  {t('priceChart')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-12 h-12 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t('chartComingSoon')}
                  </h3>
                  <p className="text-slate-400">
                    {t('chartDescription')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  {t('marketAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">{t('marketTrend')}</h4>
                    <p className="text-slate-300">
                      {t('marketTrendDescription')}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">{t('priceForecast')}</h4>
                    <p className="text-slate-300">
                      {t('priceForecastDescription')}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">{t('tradingTips')}</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {t('tip1')}
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {t('tip2')}
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {t('tip3')}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
