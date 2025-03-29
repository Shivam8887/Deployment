import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './Pages/Homepage';
import { Login } from './Pages/Login';
import { BlogsPage } from './Pages/BlogsPage';
import { Signup } from './Pages/Sigup';
import Footer from './Components/footer';
import Headers from './Components/header';

function App() {
  return (
    <div>
    
      <Headers />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage/>} />
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/blogs' element={<BlogsPage></BlogsPage>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
