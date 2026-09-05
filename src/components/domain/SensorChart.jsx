import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SensorChart({ data, dataKey, color = '#F59E0B', label, unit }) {
  const formatted = data?.map((d) => ({
    ...d,
    t: new Date(d.t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  })) || []

  return (
    <div>
      <h4 className="text-sm font-semibold text-charcoal-700 mb-2">{label}</h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D6D3D1" />
            <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#78716C' }} />
            <YAxis tick={{ fontSize: 10, fill: '#78716C' }} unit={unit} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #D6D3D1' }}
              formatter={(v) => [`${v}${unit}`, label]}
            />
            <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
