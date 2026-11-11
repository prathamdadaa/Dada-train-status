export default function ListView({ s }) {
  return (
    <div className="tablewrap">
      <table>
        <thead><tr><th>Station</th><th>Km</th><th>Plat.</th><th>Scheduled</th><th>Actual / Exp.</th></tr></thead>
        <tbody>
          {s.stations.map((st) => (
            <tr key={st.c} className={st.current ? 'cur' : st.passed ? 'passed' : ''}>
              <td><b>{st.n}</b> <small>{st.c}</small></td><td>{st.km}</td><td>{st.p}</td>
              <td>{st.sched}</td><td>{st.actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
