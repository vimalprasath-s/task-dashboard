import './SearchFilter.css'

export default function SearchFilter({
  searchText,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="search-filter">
      <input
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="none">Sort</option>
        <option value="due-asc">Due date ↑</option>
        <option value="due-desc">Due date ↓</option>
      </select>
    </div>
  )
}
