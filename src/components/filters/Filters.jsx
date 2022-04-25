import styles from "components/filters/filters.module.css";
import { useState } from "react";

function Filters() {
  const [filters, setFilters] = useState({
    all: true,
    valorant: false,
    gta: false,
    csgo: false,
    bgmi: false,
  });
  return (
    <div className={styles.filters}>
      <button
        className={`btn  ${
          filters.all ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={(prev) => setFilters({ ...prev, all: true })}
      >
        All
      </button>
      <button
        className={`btn  ${
          filters.valorant ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={(prev) => setFilters({ ...prev, all: false, valorant: true })}
      >
        Valorant
      </button>
      <button
        className={`btn  ${
          filters.gta ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={(prev) => setFilters({ ...prev, all: false, gta: true })}
      >
        GTA V
      </button>
      <button
        className={`btn  ${
          filters.csgo ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={(prev) => setFilters({ ...prev, all: false, csgo: true })}
      >
        CS GO
      </button>
      <button
        className={`btn  ${
          filters.bgmi ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={(prev) => setFilters({ ...prev, all: false, bgmi: true })}
      >
        BGMI
      </button>
    </div>
  );
}

export { Filters };
