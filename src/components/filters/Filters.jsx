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
        onClick={() =>
          setFilters({
            ...filters,
            all: true,
            valorant: false,
            gta: false,
            csgo: false,
            bgmi: false,
          })
        }
      >
        All
      </button>
      <button
        className={`btn  ${
          filters.valorant ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={() =>
          setFilters({
            ...filters,
            valorant: true,
            all: false,
            gta: false,
            csgo: false,
            bgmi: false,
          })
        }
      >
        Valorant
      </button>
      <button
        className={`btn  ${
          filters.gta ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={() =>
          setFilters({
            ...filters,
            gta: true,
            valorant: false,
            all: false,
            csgo: false,
            bgmi: false,
          })
        }
      >
        GTA V
      </button>
      <button
        className={`btn  ${
          filters.csgo ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            csgo: true,
            all: false,
            valorant: false,
            gta: false,
            bgmi: false,
          }))
        }
      >
        CS GO
      </button>
      <button
        className={`btn  ${
          filters.bgmi ? "btn-secondary" : `${styles.btnSecondaryOutline}`
        } ${styles.btn}`}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            bgmi: true,
            all: false,
            valorant: false,
            gta: false,
            csgo: false,
          }))
        }
      >
        BGMI
      </button>
    </div>
  );
}

export { Filters };
