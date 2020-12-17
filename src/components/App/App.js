import About from '../About/About';
import Footer from '../Footer/Footer';
import NoResult from '../NoResult/NoResult';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

function App() {
  return (
    <>
      

      <NoResult/>
      <Preloader/>
      <SearchForm/>
      <About/>
      <Footer/>
    </>
  );
}

export default App;
