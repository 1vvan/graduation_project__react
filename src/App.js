import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import HotelsList from './components/HotelsList/HotelsList';
import ToursList from './components/ToursList/ToursList';
import Company from './components/Company/Company';
import AdminPanel from './components/AdminPanel/AdminPanel';
import LoginAdmin from './components/AdminPanel/LoginAdmin/LoginAdmin';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotels' element={<HotelsList />} />
          <Route path='/tours' element={<ToursList />} />
          <Route path='/company' element={<Company />} />
          <Route path='/admin' element={<LoginAdmin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path={isAuthenticated ? '/admin/panel' : '/admin'} element={<AdminPanel />} />
          <Route path='*' element={
            <div className='no-page'>
              <span>Страница не найдена !</span>
          </div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
