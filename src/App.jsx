import { useState } from 'react'
import { generateQuote } from './utils/api'

const tags = ['Motivation', 'Leadership', 'Programming', 'Success']

function App() {
  const [currentQuote, setCurrentQuote] = useState({
    text: "Click 'Generate Quote' to get your first AI-generated quote!",
    author: "Smarty-Quote",
    tag: "Motivation"
  })
  const [selectedTag, setSelectedTag] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const handleGenerateQuote = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const category = selectedTag === 'all' 
        ? tags[Math.floor(Math.random() * tags.length)]
        : selectedTag;
        
      const newQuote = await generateQuote(category)
      setCurrentQuote(newQuote)
    } catch (err) {
      setError('Failed to generate quote. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyQuote = () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`
    navigator.clipboard.writeText(quoteText)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const shareOnX = () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}\n#${currentQuote.tag} #SmartyQuote`
    const encodedText = encodeURIComponent(quoteText)
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank')
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mb-4 animate-fade-in">
            Smarty-Quote
          </h1>
          <p className="text-lg text-indigo-800 font-medium tracking-wide">
            ✨ Wisdom at Your Fingertips ✨
          </p>
        </div>

        <div className="w-full max-w-md mx-auto mb-8">
          <label htmlFor="tag-select" className="block text-indigo-900 text-lg mb-2 font-medium">
            Select category:
          </label>
          <select
            id="tag-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-800 border-2 border-indigo-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg font-medium shadow-md"
          >
            <option value="all">All categories</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8 transform transition-all duration-300 hover:scale-105">
          <div className="border-l-4 border-indigo-400 pl-6">
            <blockquote className="text-xl md:text-2xl mb-4 text-gray-700 font-medium leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <p className="text-right text-gray-800 font-bold text-lg">
              - {currentQuote.author}
            </p>
            <p className="text-right text-indigo-600 text-sm mt-2">
              #{currentQuote.tag}
            </p>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-md mx-auto">
          <button
            onClick={handleGenerateQuote}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md"
          >
            {isLoading ? 'Generating...' : 'Generate Quote'}
          </button>
          <button
            onClick={copyQuote}
            className="bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg shadow-md"
          >
            Copy Quote
          </button>
          <button
            onClick={shareOnX}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Share
          </button>
        </div>

        {showToast && (
          <div className="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Quote copied to clipboard!</span>
          </div>
        )}

        <footer className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Created by Gino Nacchio</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.github.com/ginona" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ginonacchio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
