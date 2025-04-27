import profile from '@shared/assets/profile.svg'
import { ProfileProps } from './types';

export const Profile = ({handleClick}: ProfileProps) => {

  return (
    <img
    src={profile}
    alt="Profile"
    className="header__profile"
    onClick={handleClick} />
  );
};