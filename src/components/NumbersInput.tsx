import React from "react"

export function NumbersInput({ onInput }: { onInput: (value: number) => void }) {
  const [error, setError] = React.useState<string | undefined>()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.trim() === "") {
      setError("Number is required")
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
    onInput(value)
  }

  return (
    <form onSubmit={submit}>
      <label>Please enter a number:
        <input type="number" value={value} onChange={handleChange} min="0"></input>
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
