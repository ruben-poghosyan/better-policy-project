import './App.css';
import { Route,Routes } from 'react-router-dom';
import ScrollAwareNavbar  from './components/navigation';
import About from './pages/about';
import Charts from './pages/charts';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Students from './pages/students';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer';
function App() {
  return (
   <>
   <ScrollAwareNavbar />
    <div className='content-root' style={{paddingTop:"100px"}}>
      <div className='content'>
      <Routes>
        <Route path="/" element={<Home/>} />        
        <Route path="/charts"  element={<Charts/>} />
        <Route path='/students' element={<Students/>} />
        <Route path="/dashboard"  element={<Dashboard />}/>
        <Route path="/about"  element={<About/>}/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      </div>   
      <div className='custom-footer'><Footer></Footer></div>
    </div>
    </>
   
  );
}

export default App;