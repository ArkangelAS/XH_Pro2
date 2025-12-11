import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Area,
  ComposedChart
} from 'recharts';
import { calculateFee, generateChartData, BASE_PRICE } from './utils';
import { InfoCard } from './components/InfoCard';
import { CalculationResult } from './types';

// Icons
const CalculatorIcon = () => (
  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PercentIcon = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

function App() {
  const [rate, setRate] = useState<number | ''>(85);
  const [people, setPeople] = useState<number | ''>(100);

  // Safe values for calculation
  const safeRate = rate === '' ? 0 : Math.max(0, Math.min(100, Number(rate)));
  const safePeople = people === '' ? 0 : Math.max(0, Number(people));

  const result: CalculationResult = useMemo(() => 
    calculateFee(safeRate, safePeople), 
  [safeRate, safePeople]);

  const chartData = useMemo(() => 
    generateChartData(safePeople, safeRate), 
  [safePeople, safeRate]);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
              <CalculatorIcon />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            项目运营费计算器
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            基于白名单占有率和人数的累进计算模型
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs & Result */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                参数输入
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-slate-700 mb-1">
                    人数 (人)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserGroupIcon />
                    </div>
                    <input
                      type="number"
                      name="people"
                      id="people"
                      min="0"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-lg border-slate-300 rounded-lg py-3"
                      placeholder="0"
                      value={people}
                      onChange={(e) => setPeople(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-slate-700 mb-1">
                    白名单占有率 (%)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PercentIcon />
                    </div>
                    <input
                      type="number"
                      name="rate"
                      id="rate"
                      min="0"
                      max="100"
                      step="0.1"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-lg border-slate-300 rounded-lg py-3"
                      placeholder="0.0"
                      value={rate}
                      onChange={(e) => setRate(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="60" 
                    max="100" 
                    step="0.5" 
                    value={safeRate} 
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full mt-3 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>60%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Result Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
              
              <h2 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-2">
                预计运营费用总额
              </h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-extrabold tracking-tight">
                  {result.totalFee.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xl text-slate-400 font-medium">元</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>单价基数:</span>
                  <span className="font-mono text-white">{BASE_PRICE.toFixed(1)} 元</span>
                </div>
                <div className="flex justify-between">
                  <span>有效人数:</span>
                  <span className="font-mono text-white">{safePeople} 人</span>
                </div>
                <div className="flex justify-between">
                  <span>当前系数:</span>
                  <span className="font-mono text-white">
                    {safeRate >= 90 ? '4' : safeRate >= 80 ? '3' : safeRate >= 70 ? '2' : '0'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visualization & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-[400px]">
              <h3 className="text-lg font-bold text-slate-800 mb-4">趋势分析</h3>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorFee" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="rate" 
                      label={{ value: '占有率 (%)', position: 'insideBottomRight', offset: -10 }} 
                      type="number"
                      domain={['dataMin', 'dataMax']}
                      tick={{fontSize: 12, fill: '#64748b'}}
                    />
                    <YAxis 
                      label={{ value: '费用 (元)', angle: -90, position: 'insideLeft' }} 
                      tick={{fontSize: 12, fill: '#64748b'}}
                    />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(undefined, {maximumFractionDigits: 2}), '运营费用']}
                      labelFormatter={(label) => `占有率: ${label}%`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fee" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorFee)" 
                    />
                    {safeRate >= 65 && safeRate <= 105 && (
                      <ReferenceDot 
                        x={safeRate} 
                        y={result.totalFee} 
                        r={6} 
                        fill="#ef4444" 
                        stroke="#fff" 
                        strokeWidth={2}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Breakdown & Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cost Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    费用构成明细
                  </h3>
                </div>
                {result.breakdown.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {result.breakdown.map((item, idx) => (
                      <div key={idx} className="px-6 py-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          <span className="text-sm font-bold text-slate-900">
                            {item.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono bg-slate-50 rounded px-2 py-1 inline-block">
                          {item.formula}
                        </div>
                      </div>
                    ))}
                    <div className="px-6 py-3 bg-slate-50 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-600">合计</span>
                      <span className="text-base font-bold text-blue-600">
                        {result.totalFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    {safeRate < 70 ? '占有率低于 70%，无运营费用。' : '请输入有效数据'}
                  </div>
                )}
              </div>

              {/* Rules Reference */}
              <InfoCard activeTierIndex={result.activeTierIndex} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;