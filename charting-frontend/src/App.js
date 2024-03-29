import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import About from './components/about';
import Charts from './components/charts';
import Dashboard from './components/dashboard';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
   <>
    <Navigation/>
      <div>
    <Routes>
      <Route path="/" element={<Home/>} />        
      <Route path="/charts"  element={<Charts/>} />
      <Route path="/dashboard"  element={<Dashboard />}/>
      <Route path="/about"  element={<About/>}/>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </div>
    </>
   
  );
}

export default App;