import { NavLink } from 'react-router-dom'
import './Tabs.css'

export default function Tabs() {
  return (
    <div className="tabs">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
        All Tasks
      </NavLink>

      <NavLink to="/completed" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
        Completed
      </NavLink>
    </div>
  )
}
