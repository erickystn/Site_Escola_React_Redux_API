import { Link } from 'react-router-dom';
import { Nav } from './styled';

import { FaHome, FaUser, FaDoorOpen, FaPowerOff } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authFailed, selectAuth } from '../../storage/auth/authSlice';
import history from '../../services/history';

export default function Header() {
  const { isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authFailed());
    history.push('/login');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/cadastro">
        <FaUser size={24} />
      </Link>
      {!isLoggedIn ? (
        <Link to="/login">
          <FaDoorOpen size={24} />
        </Link>
      ) : (
        <Link onClick={handleLogout} to="#">
          <FaPowerOff size={24} />
        </Link>
      )}
    </Nav>
  );
}
