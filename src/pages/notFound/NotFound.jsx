import { oops } from "assets/index";
import "./notFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <img src={oops} alt="oops" />
      <Link to="/">
        <button className="btn btn-secondary fs-s">Go back to Homepage</button>
      </Link>
    </div>
  );
}

export { NotFound };
