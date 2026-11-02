import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { catalog } from '../data/catalog.js'
import { makePath } from '../utils/makePath.js'

const pct = (p) => {
  const all = p.weeks.flatMap((w) => w.tasks)
  return all.length ? Math.round((all.filter((x) => x.done).length / all.length) * 100) : 0
}

export default function Dashboard({ paths, setPaths }) {
  const [custom, setCustom] = useState('')
  const nav = useNavigate()

  const open = (name) => {
    const found = paths.find((p) => p.name.toLowerCase() === name.toLowerCase())
    if (found) return nav(`/path/${found.id}`)
    const p = makePath(name)
    setPaths([...paths, p])
    nav(`/path/${p.id}`)
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-3">My learning paths</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {paths.map((p) => (
            <Link key={p.id} to={`/path/${p.id}`} className="bg-card border border-line rounded-xl p-4 hover:border-brand">
              <div className="font-semibold">{p.name}</div>
              <div className="h-2 bg-line rounded mt-3"><div className="h-2 bg-brand rounded" style={{ width: pct(p) + '%' }} /></div>
              <div className="text-sm text-mut mt-1">{pct(p)}% complete</div>
            </Link>
          ))}
          {paths.length === 0 && <p className="text-mut">No paths yet. Add one below.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Add a language</h2>
        <div className="flex flex-wrap gap-2">
          {catalog.map((n) => (
            <button key={n} onClick={() => open(n)} className="px-3 py-1.5 rounded-full border border-line bg-card text-sm hover:border-brand">{n}</button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Create custom learning path</h2>
        <form onSubmit={(e) => { e.preventDefault(); if (custom.trim()) { open(custom.trim()); setCustom('') } }} className="flex gap-2">
          <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. Kotlin"
            className="flex-1 bg-card border border-line rounded-lg px-3 py-2 outline-none focus:border-brand" />
          <button className="bg-brand text-white rounded-lg px-4 flex items-center gap-1"><Plus size={16} /> Create</button>
        </form>
      </section>
    </div>
  )
}
