export const makePath = (name) => {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36)
  const titles = ['Basics', 'Core concepts', 'Practice', 'Project & review']
  return {
    id, name,
    weeks: titles.map((w, i) => ({
      title: `Week ${i + 1}: ${w}`,
      tasks: [1, 2, 3].map((n) => ({ id: `${id}-${i}-${n}`, text: `${name} ${w.toLowerCase()} – task ${n}`, done: false })),
    })),
  }
}
