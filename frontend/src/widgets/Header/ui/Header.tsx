import { Logo, Notification, Profile, SearchBar } from '@shared/ui'
import { useBehavior } from '../model';

import './Header.scss';

export const Header = () => {
  const {
    isAuthenticated,
    handleProfileClick,
    search,
    handleSearchChange,
    isOnHomePage
  } = useBehavior()

  return (
    <header className="header">
      <div className='header__container'>
        <Logo />
        {!isAuthenticated && isOnHomePage && (
          <SearchBar value={search} onChange={handleSearchChange} />
        )}
        <div className='header__container__right'>
          {!isAuthenticated && <Notification />}
          <Profile handleClick={handleProfileClick}/>
        </div>
      </div>
    </header>
  )
}