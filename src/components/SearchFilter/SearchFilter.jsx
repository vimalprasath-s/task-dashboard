import './SearchFilter.css'

export default function SearchFilter({
  searchText,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  showStatusFilter = true,
}) {
  return (
    <div className="search-filter">
      <input
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {showStatusFilter && (
        <select id="status-sort" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}

      <select id="due-date-sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="none">Sort: Due Date</option>
        <option value="due-asc">Earliest</option>
        <option value="due-desc">Farthest</option>
      </select>
    </div>
  )
}
