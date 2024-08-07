import React from 'react'

import './App.css'
import { useNumbersAppStore, numbersApp as app } from './AppStore'

import { NumbersInput } from './components/NumbersInput'
import { IntervalInput } from './components/IntervalInput'
import { TimerControls } from './components/TimerControls'

function App() {
  const appStore = useNumbersAppStore()

  const [log, setLog] = React.useState<Array<string>>([])

  React.useEffect(() => {
    return app.subscribe((ev) => {
      switch (ev.type) {
        case 'input':
          logInput(ev.value);
          return;
        case 'frequencies':
          logFrequencies(ev.frequencies);
          return;
        case 'special':
          logSpecial();
          return;
      }
    });

    function appendLog(message: string): void {
      setLog(logs => [...logs, message].slice(-20))
    }

    function logInput(n: number): void {
      appendLog(`${n}`);
    }

    function logFrequencies(frequencies: Array<[number, number]>): void {
      appendLog(frequencies.map(([n, freq]) => `${n}:${freq}`).join(', '))
    }

    function logSpecial(): void {
      appendLog('FIB')
    }

  }, []);

  if (!appStore.isInitialized) {
    return (
      <div className="App">
        <IntervalInput onIntervalChosen={(interval) => app.startLogging(interval * 1000)}/>
      </div>
    );
  }

  return (
    <div className="App">
      <NumbersInput onInput={(value): void => app.input(value)}/>
      <TimerControls paused={appStore.isPaused} onHalt={() => app.haltLogging()} onResume={() => app.resumeLogging()}/>
      <pre>{log.map(line => `>> ${line}`).join('\n')}</pre>
    </div>
  );
}



export default App
