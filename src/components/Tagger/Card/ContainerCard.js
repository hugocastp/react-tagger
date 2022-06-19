import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const ContainerCard = ({ results }) => {
  let display;
  
  if (results) {
    display = results.filter(y => (y.tag === undefined || y.tag === "")).map((x, index) => {
      let { _id, content } = x;
      return (
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `${_id}`,
          }}
          state={{ list: results, index: index }}
          key={_id}
          className="col-lg-3 col-md-6 col-sm-6 col-10 mb-4 position-relative text-dark"
        >
          <div
            className={`${styles.card} d-flex flex-column justify-content-center`}
          >
            <div className="fs-6 fw-normal"> </div>
            <h2> Text {index}</h2>
            <p>{content.substring(0, 200)}...</p>
            <div className={`${styles.content}`}>
              <div className="">
                <div className="fs-6 fw-normal"> </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  } else {
    display = "No images found :/";
  }

  return <>{display}</>;
};

export default ContainerCard;
