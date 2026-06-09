import {
  MAP_HEIGHT,
  MAP_WIDTH,
  landforms,
  project,
  routeGeometries,
} from '../lib/route-maps'

function toPath(points: Array<[number, number]>, close: boolean): string {
  const d = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join('')
  return close ? `${d}Z` : d
}

const land = landforms.map((shape) => toPath(shape.map(project), true))

export function RouteMap({
  routeId,
  label,
  className,
}: {
  routeId: string
  label: string
  className?: string
}) {
  const geometry = routeGeometries[routeId]
  if (!geometry) return null
  const points = geometry.waypoints.map(project)
  const [startX, startY] = points[0]
  const [endX, endY] = points[points.length - 1]
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="img"
      aria-label={label}
      className={className}
    >
      {land.map((d, i) => (
        <path key={i} d={d} className="fill-sn-mist" />
      ))}
      <path
        d={toPath(points, geometry.loop)}
        pathLength={1}
        className="sn-route fill-none stroke-sn-green"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={startX} cy={startY} r={2.4} className="fill-sn-green" />
      {!geometry.loop && (
        <circle
          cx={endX}
          cy={endY}
          r={2.4}
          className="fill-sn-paper stroke-sn-green"
          strokeWidth={1.4}
        />
      )}
    </svg>
  )
}
