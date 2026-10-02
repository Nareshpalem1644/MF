import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function NavHistoryChart({ data, height = 300 }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#64748b', fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fill: '#64748b', fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(v) => `?${v}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} 
            labelClassName="text-dark-400 text-xs font-semibold"
            itemStyle={{ color: '#22c55e', fontSize: '13px', fontWeight: 'bold' }}
            formatter={(value) => [`?${value}`, 'NAV']} 
          />
          <Line 
            type="monotone" 
            dataKey="nav" 
            stroke="#22c55e" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
