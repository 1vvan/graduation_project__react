import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import HotelsList from './components/HotelsList/HotelsList';
import ToursList from './components/ToursList/ToursList';
import AdminPanel from './components/AdminPanel/AdminPanel';
import LoginAdmin from './components/AdminPanel/LoginAdmin/LoginAdmin';

function App() {
  const isAdmin = localStorage.getItem('isAdmin');
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/hotels' element={<HotelsList />} />
          <Route path='/tours' element={<ToursList />} />
          <Route path='/admin' element={<LoginAdmin />} />
          <Route path={isAdmin ? '/admin/panel' : '/admin'} element={<AdminPanel />} />
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
