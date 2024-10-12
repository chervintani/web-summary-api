const axios = require('axios')
const cheerio = require('cheerio')

// Helper function to summarize website content
const getWebsiteSummary = async (url) => {
  try {
    const { data } = await axios.get(url) // Fetch the webpage HTML
    const $ = cheerio.load(data) // Load HTML into Cheerio for parsing

    // Extract the title and meta description
    const title = $('title').text()
    const description =
      $('meta[name="description"]').attr('content') ||
      'No description available'

    // Extract the first paragraph of content (if present)
    const firstParagraph = $('p').first().text() || 'No content found'

    // Return the summary as an object
    return {
      title,
      description,
      firstParagraph
    }
  } catch (error) {
    console.error('Error scraping website:', error.message)
    return null
  }
}

module.exports = getWebsiteSummary
