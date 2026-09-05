export function StatusBar() {
  return (
    <div className="status-bar">
      <p className="status-bar__time">9:41</p>
      <div className="status-bar__end">
        <span className="status-bar__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="status-bar__battery">100%</span>
      </div>
    </div>
  );
}
