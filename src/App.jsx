import { Toaster } from 'react-hot-toast'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AllTasks from './pages/Tasks'
import CompletedTasks from './pages/CompletedTasks'

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </>
  )
}

export default App
