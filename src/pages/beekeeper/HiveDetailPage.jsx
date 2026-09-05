import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../api'
import SensorChart from '../../components/domain/SensorChart'
import HealthScoreGauge from '../../components/domain/HealthScoreGauge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import { ArrowLeft, Wifi, Activity, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function HiveDetailPage() {
  const { hiveId } = useParams()
  const [hive, setHive] = useState(null)
  const [readings, setReadings] = useState(null)
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getHiveReadings(hiveId, 7),
      api.getHiveHealth(hiveId),
    ]).then(([r, h]) => {
      setReadings(r)
      setHealth(h)
      setLoading(false)
    })
  }, [hiveId])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-6">
      <Link to="/beekeeper" className="inline-flex items-center gap-1 text-sm text-honey-600 hover:text-honey-700">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-charcoal-800">{hiveId}</h1>
          <p className="text-sm text-charcoal-400">Jawhar, Palghar</p>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-success" />
          <span className="text-xs text-charcoal-400">Sensor online · last ping 2 min ago</span>
        </div>
      </div>

      {/* Sensor Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <SensorChart data={readings?.temperature} dataKey="v" color="#F59E0B" label="Temperature" unit="°C" />
        </Card>
        <Card>
          <SensorChart data={readings?.humidity} dataKey="v" color="#3B82F6" label="Humidity" unit="%" />
        </Card>
        <Card>
          <SensorChart data={readings?.weight} dataKey="v" color="#78716C" label="Hive Weight" unit=" kg" />
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Health Score */}
        <Card>
          <h3 className="section-label mb-4">Colony Health Score</h3>
          <div className="flex items-center gap-8">
            <HealthScoreGauge score={health?.score || 0} label={health?.label || ''} />
            <div className="flex-1 space-y-2">
              {health?.diseases?.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-charcoal-600">{d.name}</span>
                  <Badge variant={d.probability > 50 ? 'danger' : d.probability > 20 ? 'warning' : 'success'}>
                    {d.probability}%
                  </Badge>
                </div>
              ))}
              {health?.diseases?.length === 0 && (
                <p className="text-sm text-success font-medium">No diseases detected</p>
              )}
            </div>
          </div>
        </Card>

        {/* Prediction */}
        <Card>
          <h3 className="section-label mb-4">Productivity Prediction</h3>
          <div className="bg-honey-50 rounded-xl p-4 mb-4 border border-honey-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-honey-500" />
              <span className="text-sm font-semibold text-charcoal-800">Expected Harvest</span>
            </div>
            <p className="text-2xl font-bold text-honey-600 font-heading">
              ~{health?.forecast?.kg || 0} kg in {health?.forecast?.weeks || 0} weeks
            </p>
            <p className="text-xs text-charcoal-400 mt-1">Confidence: {health?.forecast?.confidence || 0}%</p>
          </div>
          <h4 className="text-xs font-semibold text-charcoal-500 mb-2">Past Yields</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={health?.pastYields || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D6D3D1" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#78716C' }} />
                <YAxis tick={{ fontSize: 10, fill: '#78716C' }} unit=" kg" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v.toFixed(1)} kg`, 'Yield']} />
                <Bar dataKey="kg" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
