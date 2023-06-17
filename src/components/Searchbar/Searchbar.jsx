import PropTypes from 'prop-types';
import css from './Searchbar.module.css'



export const Searchbar = ({myonSubmit}) => (
  <>
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={myonSubmit}>
        <button type="submit" className={css.SearchFormButton}>
        <span className={css.ButtonLabel}>Search</span>
        </button>
        <input
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        />
      </form>
    </header>
  </>
)

Searchbar.propTypes = { 
  myonSubmit: PropTypes.func.isRequired
}