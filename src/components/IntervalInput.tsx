import React from "react"

export function IntervalInput({ onIntervalChosen }: { onIntervalChosen: (interval: number) => void }) {
  const [error, setError] = React.useState<string | undefined>()
  const [value, setValue] = React.useState(5)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.trim() === "") {
      setError("Interval is required")
      return;
    }

    const value = Number(input);
    if (isNaN(value) || value < 1) {
      setError("Must be a positive number")
      return;
    }

    setError(undefined)
    setValue(value)
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    onIntervalChosen(value)
  }

  return (
    <form onSubmit={submit}>
      <label>
        Number of seconds between emitting numbers and their frequencies:
        <div><input type="number" value={value} onChange={handleChange} min="1"></input></div>
      </label>
      {error && <p>{error}</p>}
      <div>
        <button type="submit">Start</button>
      </div>
    </form>
  )
}
