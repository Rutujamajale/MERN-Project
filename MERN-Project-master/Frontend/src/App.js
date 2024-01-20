import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import Products from './Components/Products';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Products/>}></Route>
          <Route path='/add' element={<AddProduct/>}></Route>
          <Route path='/update/:id' element={<UpdateProduct/>}></Route>
          <Route path='/logout' element={<h1>logout Product listing</h1>}></Route>
          <Route path='/profile' element={<h1>profile Product listing</h1>}></Route>
        </Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
