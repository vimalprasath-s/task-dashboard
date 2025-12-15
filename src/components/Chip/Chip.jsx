import './Chip.css'

export default function Chip({ counts }) {
  return (
    <div className="chips-container">
      <span className="chip pending">Pending · {counts.pending}</span>
      <span className="chip in-progress">In Progress · {counts.inProgress}</span>
      <span className="chip completed">Completed · {counts.completed}</span>
    </div>
  )
}
