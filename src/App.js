import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Directory from './config/Directory';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';


const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);


  return (
    <BrowserRouter>
      <>

        <Navbar
          setQuery={setQuery}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />

        <Directory
          query={query}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />

        <Footer
          setPageNumber={setPageNumber}
        />

      </>
    </BrowserRouter>
  );
}

export default App;
