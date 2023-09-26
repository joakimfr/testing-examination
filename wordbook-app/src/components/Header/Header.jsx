import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'


function Header () {

return (
  <div>
    <header className='header'>
      <h1 className='header__title'>Dictionary</h1>
      <FontAwesomeIcon data-testid='book-icon' className='header__icon' icon={faBookOpen} />
    </header>
  </div>
)
}

export default Header