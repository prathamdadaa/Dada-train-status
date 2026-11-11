import { MapPin, Route, Timer, Gauge, RefreshCw } from 'lucide-react';

export default function LiveStats({ s }) {
  const n = s.stations[s.nextIdx];
  const stats = [
    [MapPin, 'Next station', n ? n.n : 'Journey complete'],
    [Route, 'Distance to go', n ? `${Math.max(0, n.km - s.km).toFixed(1)} km` : '0 km'],
    [Timer, 'ETA', n ? n.actual : '-'],
    [Gauge, 'Speed', `${s.speed} km/h`],
  ];
  return (
    <section className="stats">
      {stats.map(([I, l, v]) => (
        <div className="card stat" key={l}><I size={18} /><span>{l}</span><b>{v}</b></div>
      ))}
      <p className="upd"><RefreshCw size={13} /> Last updated {s.updated.toLocaleTimeString()}</p>
    </section>
  );
}
