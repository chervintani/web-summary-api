import Summary from '../models/Summary.js'
import ScrapingService from '../services/scrapingService.js'
import OpenAiService from '../services/openAiService.js'
import dotenv from 'dotenv'

dotenv.config()
const openAiService = new OpenAiService(process.env.OPENAI_API_KEY)

const processSummaryJob = async (url) => {
  console.log('Processing job...')

  // Step 1: Scrape the website
  const websiteContent = await ScrapingService.scrapeWebsiteContent(url)
  if (!websiteContent) {
    console.log('Failed to scrape website')
    await Summary.findOneAndUpdate(
      { url },
      {
        status: 'failed',
        errorMessage: 'Failed to scrape content from the URL'
      }
    )
    return
  }

  // Combine title, description, and main content
  const content = `${websiteContent.title}\n\n${websiteContent.description}\n\n${websiteContent.mainContent}`

  // Step 2: Get the summary from OpenAI
  const summary = await openAiService.getSummary(content)
  await Summary.findOneAndUpdate({ url }, { status: 'completed', summary })
  console.log('Done processing job...')
}

export const createSummary = async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ message: 'Please provide a URL.' })
  }

  try {
    const existingSummary = await Summary.findOne({ url })
    if (existingSummary) {
      return res.status(409).json({
        message: `${url} already processed with an id ${existingSummary.id}`
      })
    }

    const summaryData = await Summary.create({ url, status: 'pending' })
    res.json(summaryData.toJSON())

    processSummaryJob(url)
  } catch (error) {
    console.error('Error creating summary:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getSummaryById = async (req, res) => {
  const id = req.params.id

  try {
    const summary = await Summary.findById(id)
    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' })
    }
    res.json(summary.toJSON())
  } catch (error) {
    console.error('Error getting summary:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
