import { HomePage } from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {  
  return (
    <>
      <Routes>
        <Route index path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
