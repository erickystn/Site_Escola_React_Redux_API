import { Link } from 'react-router-dom';
import { Nav } from './styled';

import { FaHome, FaUser, FaDoorOpen } from 'react-icons/fa';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/cadastro">
        <FaUser size={24} />
      </Link>
      <Link to="/login">
        <FaDoorOpen size={24} />
      </Link>
    </Nav>
  );
}
