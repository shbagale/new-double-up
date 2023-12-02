import CalendarPage from "./Pages/CalendarPage"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from "./Components/Header"
import Friends from "./Components/Friends"
import SessionPage from "./Pages/SessionPage";
import { Routes, Route } from 'react-router-dom';


function App() {
  return(
    <div>
      <Header />
      <Friends />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path='/' element={<CalendarPage />} />
          <Route path='/session' element={<SessionPage />} />
        </Routes>
      </LocalizationProvider>
    </div>
  )
}

export default App;