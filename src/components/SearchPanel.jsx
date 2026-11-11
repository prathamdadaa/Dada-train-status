import { useState } from 'react';
import { Search, History, Train } from 'lucide-react';
import { searchTrains } from '../api/trainApi';

const DAYS = [['yesterday', 'Yesterday'], ['today', 'Today'], ['tomorrow', 'Tomorrow']];

export default function SearchPanel({ day, setDay, onPick, recent }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const hits = searchTrains(q);
  const pick = (t) => { setQ(''); setOpen(false); onPick(t); };
  return (
    <section className="card search">
      <h1>Where is my train?</h1>
      <div className="combo">
        <Search size={18} />
        <input value={q} placeholder="Train number or name, e.g. 12301" aria-label="Search train"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onKeyDown={(e) => e.key === 'Enter' && hits[0] && pick(hits[0])} />
        {open && q && (
          <ul className="suggest">
            {hits.length ? hits.map((t) => (
              <li key={t.no}><button onClick={() => pick(t)}><Train size={16} /><b>{t.no}</b> {t.name}</button></li>
            )) : <li className="none">No train matches "{q}". Try 12301, 12019 or 12951.</li>}
          </ul>
        )}
      </div>
      <div className="seg" role="group" aria-label="Journey date">
        {DAYS.map(([k, l]) => <button key={k} className={day === k ? 'on' : ''} onClick={() => setDay(k)}>{l}</button>)}
      </div>
      {recent.length > 0 && (
        <div className="recent"><History size={15} />
          {recent.map((t) => <button key={t.no} className="chip" onClick={() => onPick(t)}>{t.no} {t.name.split(' ')[0]}</button>)}
        </div>
      )}
    </section>
  );
}
