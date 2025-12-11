import React from 'react';
import { clsx } from 'clsx';

interface InfoCardProps {
  activeTierIndex: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({ activeTierIndex }) => {
  const tiers = [
    {
      range: '70% - 79%',
      base: 1.5,
      coef: 2,
      desc: '基数 1.5 × 系数 2',
      id: 1,
    },
    {
      range: '80% - 89%',
      base: 1.5,
      coef: 3,
      desc: '基数 1.5 × 系数 3',
      id: 2,
    },
    {
      range: '90% - 100%',
      base: 1.5,
      coef: 4,
      desc: '基数 1.5 × 系数 4',
      id: 3,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          计算规则说明
        </h3>
      </div>
      <div className="divide-y divide-slate-100">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={clsx(
              "px-6 py-4 transition-colors duration-300 flex justify-between items-center",
              activeTierIndex === tier.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "text-slate-500"
            )}
          >
            <div>
              <span className="font-bold font-mono text-lg mr-3">{tier.range}</span>
              <span className="text-xs text-slate-400 uppercase">白名单占有率</span>
            </div>
            <div className="text-right">
              <div className="font-medium">{tier.desc}</div>
              {activeTierIndex === tier.id && (
                 <span className="text-xs text-blue-600 font-semibold animate-pulse">当前适用区间</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-slate-50 text-xs text-slate-400">
         * 计算方式为累进计算 (类似阶梯税率)
      </div>
    </div>
  );
};