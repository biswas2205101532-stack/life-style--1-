import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Plus } from 'lucide-react'

export default function PathPage({ paths, setPaths }) {
  const { id } = useParams()
  const nav = useNavigate()
  const [drafts, setDrafts] = useState({})
  const path = paths.find((p) => p.id === id)

  if (!path) return (
    <div>
      <p className="mb-3">Path not found.</p>
      <Link to="/" className="text-brand">Back to dashboard</Link>
    </div>
  )

  const update = (fn) => setPaths(paths.map((p) => (p.id === id ? fn(p) : p)))
  const toggle = (wi, tid) => update((p) => ({ ...p, weeks: p.weeks.map((w, i) => i !== wi ? w : { ...w, tasks: w.tasks.map((t) => t.id === tid ? { ...t, done: !t.done } : t) }) }))
  const remove = (wi, tid) => update((p) => ({ ...p, weeks: p.weeks.map((w, i) => i !== wi ? w : { ...w, tasks: w.tasks.filter((t) => t.id !== tid) }) }))
  const add = (wi) => {
    const text = (drafts[wi] || '').trim()
    if (!text) return
    update((p) => ({ ...p, weeks: p.weeks.map((w, i) => i !== wi ? w : { ...w, tasks: [...w.tasks, { id: Date.now() + '-' + i, text, done: false }] }) }))
    setDrafts({ ...drafts, [wi]: '' })
  }
  const del = () => {
    if (confirm(`Delete "${path.name}" path?`)) { setPaths(paths.filter((p) => p.id !== id)); nav('/') }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-mut hover:text-tx"><ArrowLeft size={16} /> Back</Link>
        <button onClick={del} className="text-sm text-mut hover:text-brand flex items-center gap-1"><Trash2 size={14} /> Delete path</button>
      </div>
      <h1 className="text-2xl font-extrabold">{path.name} roadmap</h1>
      {path.weeks.map((w, wi) => (
        <section key={wi} className="bg-card border border-line rounded-xl p-4">
          <h3 className="font-semibold mb-3">{w.title}</h3>
          <ul className="space-y-2">
            {w.tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                <input type="checkbox" checked={t.done} onChange={() => toggle(wi, t.id)} className="accent-brand" />
                <span className={`flex-1 ${t.done ? 'line-through text-mut' : ''}`}>{t.text}</span>
                <button onClick={() => remove(wi, t.id)} className="text-mut hover:text-brand"><Trash2 size={14} /></button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3">
            <input value={drafts[wi] || ''} onChange={(e) => setDrafts({ ...drafts, [wi]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && add(wi)} placeholder="Add task"
              className="flex-1 bg-app border border-line rounded-lg px-3 py-1.5 text-sm outline-none focus:border-brand" />
            <button onClick={() => add(wi)} className="bg-brand text-white rounded-lg px-3"><Plus size={16} /></button>
          </div>
        </section>
      ))}
    </div>
  )
}
