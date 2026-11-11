import { ArrowRight, CheckCircle2, Clock, Flag, Hourglass } from 'lucide-react';

const BADGE = { ontime: ['On time', CheckCircle2], arrived: ['Arrived', Flag], notstarted: ['Yet to start', Hourglass] };

export default function StatusHeader({ s }) {
  const [label, Icon] = BADGE[s.status] || [`Delayed by ${s.delay} min`, Clock];
  const first = s.stations[0], last = s.stations.at(-1);
  return (
    <header className="card head">
      <div>
        <p className="no">{s.no}{s.source === 'demo' && <span className="demo">Demo data</span>}</p>
        <h2>{s.name}</h2>
        <p className="route">{first.n} <ArrowRight size={16} /> {last.n}</p>
      </div>
      <span className={`badge ${s.status}`}><Icon size={16} />{label}</span>
    </header>
  );
}
