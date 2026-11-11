import { useEffect, useState } from 'react';
import { Map, List, TrainFront, AlertTriangle } from 'lucide-react';
import { getStatus, POLL_MS } from './api/trainApi';
import { TRAINS } from './data/trains';
import SearchPanel from './components/SearchPanel';
import StatusHeader from './components/StatusHeader';
import LiveStats from './components/LiveStats';
import TrackView from './components/TrackView';
import ListView from './components/ListView';

const load = () => { try { return JSON.parse(localStorage.getItem('dada-recent')) || []; } catch { return []; } };

export default function App() {
  const [day, setDay] = useState('today');
  const [train, setTrain] = useState(null);
  const [status, setStatus] = useState(null);
  const [view, setView] = useState('track');
  const [error, setError] = useState('');
  const [recent, setRecent] = useState(load);

  const pick = (t) => {
    const full = TRAINS.find((x) => x.no === t.no) || t;
    setTrain(full); setStatus(null);
    const next = [full, ...recent.filter((r) => r.no !== full.no)].slice(0, 5).map(({ no, name }) => ({ no, name }));
    setRecent(next);
    try { localStorage.setItem('dada-recent', JSON.stringify(next)); } catch {}
  };

  useEffect(() => {
    if (!train) return;
    let live = true;
    const poll = () => getStatus(train.no, day)
      .then((s) => { if (live) { setStatus(s); setError(''); } })
      .catch((e) => live && setError(e.message));
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => { live = false; clearInterval(id); };
  }, [train, day]);

  return (
    <>
      <nav className="top"><TrainFront size={22} /><b>Dada</b> Train Status Checker</nav>
      <main>
        <SearchPanel day={day} setDay={setDay} onPick={pick} recent={recent} />
        {error && <p className="card err"><AlertTriangle size={18} />{error}</p>}
        {train && !status && !error && <p className="card load">Fetching live position for {train.no}…</p>}
        {status && (
          <>
            <StatusHeader s={status} />
            <LiveStats s={status} />
            <div className="seg tog" role="group" aria-label="View">
              <button className={view === 'track' ? 'on' : ''} onClick={() => setView('track')}><Map size={15} /> Track view</button>
              <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}><List size={15} /> List view</button>
            </div>
            <section className="card">{view === 'track' ? <TrackView s={status} /> : <ListView s={status} />}</section>
          </>
        )}
        {!train && <p className="empty">Search a train to see where it is right now.</p>}
      </main>
    </>
  );
}
