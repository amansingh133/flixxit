import { Link } from "react-router-dom";

const MenuItem = ({ option }) => {
  return (
    <div className="menuItem-container">
      <h5 className="menu-name">{option.name}</h5>
      <Link to={option.path} className="menu-link">
        {option.button}
      </Link>
    </div>
  );
};

export default MenuItem;
