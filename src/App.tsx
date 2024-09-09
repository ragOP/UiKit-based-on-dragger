import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.scss';


import Third_SP from './pages/3_sp';
import New from './pages/4'


function App() {
 
  return (
    <Router>
      <div className="App">
        <Routes>
        
     
{/*         <Route index element={<Third_SP />} /> */}
{/*         <Route path='/eng1' element={<New />} /> */}
        
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
