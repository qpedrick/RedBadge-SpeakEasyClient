import './App.css';
import Auth from './components/Auth/Auth';
import Splash from './components/Splash/Splash';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  function protect() {
    return ((localStorage.getItem('role') === null) ?
    <Auth /> : <h1>Protected</h1>)
  }

  return (
    <>
      <Splash/>
      <Auth/>
      {protect()}
    </>
  );
}

export default App;
