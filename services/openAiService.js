import OpenAI from 'openai'

class OpenAiService {
  constructor(apiKey) {
    this.openai = new OpenAI.OpenAI({ apiKey })
  }

  async getSummary(content) {
    try {
      const prompt = `Summarize the following website summary:\n\n${content}`
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error with OpenAI API:', error.message)
      return 'Error generating summary'
    }
  }
}

export default OpenAiService
