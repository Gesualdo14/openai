import axios from "axios"

export default async function handler(req, res) {
  const prompt = JSON.parse(req.body).prompt // El prompt es la frase o palabra que deseas completar
  const maxTokens = 500 // La cantidad máxima de palabras que deseas completar
  const apiUrl = "https://api.openai.com/v1/completions"

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  console.log({ prompt })

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: maxTokens,
        temperature: 0,
      },
      {
        headers: headers,
      }
    )

    console.log({ data: response.data })

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
