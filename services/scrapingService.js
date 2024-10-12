import axios from 'axios'
import * as cheerio from 'cheerio'

class ScrapingService {
  static async scrapeWebsiteContent(url) {
    try {
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)

      const title = $('title').text()
      const description =
        $('meta[name="description"]').attr('content') ||
        'No description available'
      const mainContent = $('p')
        .map((i, el) => $(el).text())
        .get()
        .join('\n')

      return { title, description, mainContent }
    } catch (error) {
      console.error('Error scraping website:', error.message)
      return null
    }
  }
}

export default ScrapingService
