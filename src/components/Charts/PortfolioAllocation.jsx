import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ec4899']

export default function PortfolioAllocation({ holdings }) {
  const data = holdings.map(h => ({ name: h.name, value: h.invested }))

  return (
    <div className="h-72 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#fff', fontSize: '13px' }}
            formatter={(value) => [`?${value.toLocaleString('en-IN')}`, 'Invested']} 
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs font-bold text-dark-300">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
