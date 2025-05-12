import { useState } from 'react'

// Mock data for quotes and tags
const mockQuotes = [
  {
    text: "Programming is the art of telling a computer what to do.",
    author: "Donald Knuth",
    tag: "Programming"
  },
  {
    text: "Success is the sum of small efforts repeated day after day.",
    author: "Robert Collier",
    tag: "Success"
  }
]

const tags = ['Motivation', 'Leadership', 'Programming', 'Success']

function App() {
  // State management
  const [currentQuote, setCurrentQuote] = useState(mockQuotes[0])
  const [selectedTag, setSelectedTag] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Function to generate a new quote
  const generateQuote = () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const availableQuotes = selectedTag === 'all' 
        ? mockQuotes 
        : mockQuotes.filter(quote => quote.tag === selectedTag)
      
      if (availableQuotes.length > 0) {
        const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
        setCurrentQuote(randomQuote)
      }
      setIsLoading(false)
    }, 500)
  }

  // Function to copy quote to clipboard
  const copyQuote = () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`
    navigator.clipboard.writeText(quoteText)
    alert('Quote copied to clipboard!')
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        {/* Title */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold relative">
            <span className="absolute -top-1 left-0 w-full text-purple-200 blur-sm">
              Smarty-Quote
            </span>
            <span className="absolute -top-0.5 left-0 w-full text-purple-400 blur-[2px]">
              Smarty-Quote
            </span>
            <span className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Smarty-Quote
            </span>
          </h1>
          <p className="mt-3 text-indigo-600 font-medium tracking-wide animate-pulse">
            ✨ Wisdom at Your Fingertips ✨
          </p>
        </div>

        {/* Tag selector */}
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

        {/* Quote card */}
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

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-md mx-auto">
          <button
            onClick={generateQuote}
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
        </div>
      </div>
    </div>
  )
}

export default App
