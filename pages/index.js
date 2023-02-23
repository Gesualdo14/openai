import { useState } from "react"

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [responseText, setResponseText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const response = await fetch("/api/text-completions", {
      method: "POST",
      body: JSON.stringify({ prompt: inputText }),
    })

    const data = await response.json()

    console.log({ resposneTExt: data.choices[0].text })

    setResponseText(data.choices[0].text)
    setIsLoading(false)
  }
  console.log({ inputText })

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Escriba su texto aquí"
        />
        <button type="submit">Preguntar</button>
      </form>

      <div className="response-container">
        {isLoading && <p>Cargando...</p>}
        {!isLoading && responseText && <pre>{responseText}</pre>}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;

          align-items: center;
          margin-top: 2rem;
          max-width: 90vw;
          height: 100vh;
        }

        pre {
          white-space: pre-wrap;
        }

        form {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
          width: 20rem;
          max-width: 50vw;
          border: none;
          border-radius: 4px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          margin-right: 10px;
        }

        button {
          padding: 10px;
          border: none;
          border-radius: 4px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }

        .response-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80%;
        }
      `}</style>
    </div>
  )
}
