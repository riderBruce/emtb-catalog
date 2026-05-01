import { NavLink } from "react-router-dom";
import { TbBike } from "react-icons/tb";
import { FaBolt } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="">
      <div className="container">
        <ul className="nav nav-tabs py-2">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <FaBolt size={14} />
              <TbBike size={22} />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/bikes/add" className="nav-link">
              Add Bike
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/weather" className="nav-link">
              Weather
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
