import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsContainer from './pages/ProductsContainer';
import NavBar from './components/navbar/navbar';
import Home from './pages/Home';
import CartContainer from './pages/CartContainer';
import UsersContainer from './pages/UsersContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import Stripe from './pages/Stripe';

function App() {
  

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/payments' exact Component={Stripe}></Route>
          <Route path='/Login' exact Component={Login}/>
          <Route path='/Register' exact Component={Register}/>
          <Route path='/' exact Component={Home}/>
          <Route path='/Products' exact Component={ProductsContainer}/>
          <Route path='/Carts' exact Component={CartContainer}/>
          <Route path='/Users' exact Component={UsersContainer}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
