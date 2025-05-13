import { useState } from 'react'
import { generateQuote } from './utils/api'

const categories = [
  {
    id: 'Motivation',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: "Get inspired and motivated"
  },
  {
    id: 'Leadership',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description: "Lead with wisdom"
  },
  {
    id: 'Programming',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: "Code with purpose"
  },
  {
    id: 'Success',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    description: "Achieve greatness"
  },
  {
    id: 'Poetic',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    description: "Express with elegance"
  },
  {
    id: 'Random',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="16" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    description: "Surprise yourself"
  }
]

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
        ? categories[Math.floor(Math.random() * categories.length)].id
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
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
              <p className="text-gray-200 font-medium text-lg">Generating your quote...</p>
            </div>
          </div>
        )}

        <div className="mb-16 text-center relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 blur-xl"></div>
          <h1 className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 mb-6 animate-fade-in tracking-tight">
            Smarty
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 bg-clip-text mx-2">
              Quote
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <p className="text-lg text-purple-300 font-medium tracking-wider">
              ✨ Wisdom at Your Fingertips ✨
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">Choose Your Inspiration</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedTag(category.id)}
                className={`p-5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedTag === category.id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`transition-colors duration-300 ${
                    selectedTag === category.id ? 'text-white' : 'text-purple-400'
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{category.id}</h3>
                  <p className={`text-sm ${
                    selectedTag === category.id ? 'text-purple-200' : 'text-gray-400'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.01] cursor-pointer">
              <div className="absolute top-4 right-4 text-purple-400/50">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <blockquote className="text-2xl md:text-3xl font-serif text-gray-200 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {currentQuote.author}
                  </p>
                  <p className="text-sm font-medium text-purple-400">
                    #{currentQuote.tag}
                  </p>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
          <button
            onClick={handleGenerateQuote}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md"
          >
            Generate Quote
          </button>
          <button
            onClick={copyQuote}
            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg shadow-md"
          >
            Copy Quote
          </button>
          <button
            onClick={shareOnX}
            className="flex-1 bg-gradient-to-r from-gray-800 to-black text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Share
          </button>
        </div>

        {showToast && (
          <div className="fixed bottom-8 right-8 bg-gray-800 text-gray-200 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Quote copied to clipboard!</span>
          </div>
        )}

        <footer className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Created by Gino Nacchio</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.github.com/ginona" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors duration-300 flex items-center gap-2"
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
              className="text-gray-400 hover:text-gray-200 transition-colors duration-300 flex items-center gap-2"
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
