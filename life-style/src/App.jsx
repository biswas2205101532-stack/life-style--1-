import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Target } from 'lucide-react'
import { load, save } from './utils/storage.js'
import { seed } from './data/seed.js'
import Dashboard from './pages/Dashboard.jsx'
import PathPage from './pages/PathPage.jsx'

export default function App() {
  const [paths, setPaths] = useState(() => load(seed))
  useEffect(() => save(paths), [paths])

  return (
    <div className="min-h-screen flex flex-col bg-app text-tx font-sans">
      <header className="bg-side border-b border-line">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-wide">
            <Target className="text-brand" size={22} /> LIFE STYLE
          </Link>
          <span className="text-sm text-mut hidden sm:block">Design Your Life. Track Your Growth.</span>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard paths={paths} setPaths={setPaths} />} />
          <Route path="/path/:id" element={<PathPage paths={paths} setPaths={setPaths} />} />
          <Route path="*" element={<Dashboard paths={paths} setPaths={setPaths} />} />
        </Routes>
      </main>
      <footer className="border-t border-line bg-side mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-mut">
          Developed by <span className="font-semibold text-tx">BISWAS</span>
        </div>
      </footer>
    </div>
  )
}
