export function TimerControls({ paused, onHalt, onResume }: { paused: boolean, onHalt: () => void, onResume: () => void }) {
  if (paused) {
    return (
      <button onClick={onResume}>Resume</button>
    )
  } else {
    return (
      <button onClick={onHalt}>Halt</button>
    )
  }
}
