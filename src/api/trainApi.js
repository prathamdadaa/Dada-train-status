import { TRAINS } from '../data/trains';

const ENV = import.meta.env;
const BASE = `https://${ENV.VITE_RAPIDAPI_HOST || 'irctc1.p.rapidapi.com'}`;
const USE_MOCK = ENV.VITE_USE_MOCK !== 'false' || !ENV.VITE_RAPIDAPI_KEY;
export const POLL_MS = Number(ENV.VITE_POLL_MS) || 3000;

export const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(Math.round(m) % 60).padStart(2, '0')}`;
export const searchTrains = (q) => {
  q = q.trim().toLowerCase();
  return q ? TRAINS.filter((t) => t.no.includes(q) || t.name.toLowerCase().includes(q)).slice(0, 6) : [];
};

// ---- Simulator: acts like a push feed; every poll moves the train ~40x real speed.
const sims = {};
const START = { yesterday: 0.85, today: 0.3, tomorrow: 0 };

function build(t, km, speed, delay, source) {
  const total = t.stations.at(-1).km;
  const next = t.stations.findIndex((s) => s.km > km);
  const prev = next === -1 ? t.stations.length - 1 : Math.max(next - 1, 0);
  const frac = next === -1 ? 0 : (km - t.stations[prev].km) / (t.stations[next].km - t.stations[prev].km);
  const d = Math.round(delay);
  return {
    source, no: t.no, name: t.name, km, speed, delay: d, pos: prev + frac,
    status: km <= 0 ? 'notstarted' : km >= total ? 'arrived' : d <= 5 ? 'ontime' : 'delayed',
    updated: new Date(),
    nextIdx: next,
    stations: t.stations.map((s, i) => ({
      ...s, passed: km >= s.km && km > 0, current: i === prev && km > 0 && km < total,
      sched: fmt(s.t), actual: fmt(s.t + d),
    })),
  };
}

function simulate(t, day) {
  const key = t.no + day, total = t.stations.at(-1).km;
  const s = (sims[key] ||= { km: total * START[day], delay: t.delay });
  let speed = 0;
  if (s.km > 0 || day !== 'tomorrow') {
    if (s.km < total) { speed = 70 + Math.random() * 40; s.km = Math.min(total, s.km + (speed * 3 * 40) / 3600); }
    s.delay = Math.max(0, s.delay + (Math.random() - 0.55));
  }
  return build(t, s.km, Math.round(speed), s.delay, 'demo');
}

// ---- Live API. Adjust normalize() to the JSON schema of your provider/plan.
function normalize(json, t) {
  const d = json.data;
  if (!d || !Array.isArray(d.upcoming_stations)) throw new Error('Unexpected API response');
  return build(t, Number(d.distance_from_source ?? d.current_km ?? 0), Number(d.speed ?? 0), Number(d.delay ?? 0), 'live');
}

export async function getStatus(no, day) {
  const t = TRAINS.find((x) => x.no === no);
  if (!t) throw new Error('Train not found in the local catalogue');
  if (!USE_MOCK) {
    try {
      const startDay = { yesterday: 1, today: 0, tomorrow: -1 }[day];
      const r = await fetch(`${BASE}/api/v1/liveTrainStatus?trainNo=${no}&startDay=${startDay}`, {
        headers: { 'x-rapidapi-key': ENV.VITE_RAPIDAPI_KEY, 'x-rapidapi-host': ENV.VITE_RAPIDAPI_HOST },
      });
      if (!r.ok) throw new Error(r.status);
      return normalize(await r.json(), t);
    } catch (e) { console.warn('Live API failed, using demo data:', e); }
  }
  return simulate(t, day);
}
