import { useState, useCallback, useEffect } from "react";
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { MdClear } from 'react-icons/md';
import './searchForm.scss';


const SearchForm = ({ setQuery, isTyping, setIsTyping, pageNumber, setPageNumber }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clearValue, setClearValue] = useState(false);
  const [clearActive, setClearActive] = useState(false);
  const navigate = useNavigate();


  const getValue = useCallback((e) => {
    if (searchQuery.length == 0) {
      e.preventDefault()
    } else {
      e.preventDefault()
      navigate('/search')
      setQuery(searchQuery)
      setPageNumber(1)
    }
  }, [searchQuery, setQuery, navigate, pageNumber])


  const clearText = () => {
    setClearValue(true)

    if (clearValue) {
      setSearchQuery('')
    }
  }

  const clearButton = () => {
    if (searchQuery.length == 0) {
      setClearActive(false)
    } else {
      setClearActive(true)
    }
  }

  useEffect(() => {
    clearButton()
  }, [searchQuery,])


  return (
    <div className="search-form___container">

      <button className={isTyping ? 'back-btn--mobile'
        : 'back-btn--mobile is-typing'} onClick={() => setIsTyping(false)}>
        <IoIosArrowBack />
      </button>

      <form onSubmit={getValue} className={isTyping ? 'search-form'
        : 'search-form is-typing'}>

        <input
          type="text"
          placeholder="Search movie here"
          id="searchQuery"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete='off'
        />

        <button type="submit" className={clearActive ? 'search-form__search__btn'
          : 'search-form__search__btn search__btn--active'}>
          <BiSearch className='search-form__search__btn--icon' />
        </button>

        <button className={clearActive ? 'search-form__clear__btn clear__btn--active'
          : 'search-form__clear__btn'} type="reset" onClick={() => clearText()}>
          <MdClear />
        </button>

      </form>


      <button className={isTyping ? 'search-form__search__btn search__btn--mobile is-typing'
        : 'search-form__search__btn search__btn--mobile'}
        onClick={() => setIsTyping(true)}>
        <BiSearch className='search-form__search__btn--icon' />
      </button>

    </div>
  )
}

export default SearchForm