import { motion } from 'framer-motion';
import { TrainFront } from 'lucide-react';

const ROW = 92;
const glide = { ease: 'linear', duration: 2.8 };

export default function TrackView({ s }) {
  return (
    <div className="track" style={{ height: s.stations.length * ROW }}>
      <div className="rail" style={{ top: ROW / 2, bottom: ROW / 2 }} />
      <motion.div className="rail fill" style={{ top: ROW / 2 }} animate={{ height: s.pos * ROW }} transition={glide} />
      {s.stations.map((st, i) => (
        <div key={st.c} className={`stn ${st.passed ? 'passed' : ''}`} style={{ top: i * ROW, height: ROW }}>
          <i className="dot" />
          <div className="info"><b>{st.n}</b><small>{st.c} · {st.km} km · Platform {st.p}</small></div>
          <div className="times">
            <small>Sched {st.sched}</small>
            <b className={s.delay > 5 ? 'late' : 'ok'}>{st.passed ? 'Actual' : 'Exp'} {st.actual}</b>
          </div>
        </div>
      ))}
      {s.status !== 'notstarted' && (
        <motion.div className="loco" initial={false} animate={{ top: s.pos * ROW + ROW / 2 }} transition={glide}>
          <span className="radar" /><span className="radar r2" />
          <span className="engine"><TrainFront size={20} /></span>
        </motion.div>
      )}
    </div>
  );
}
