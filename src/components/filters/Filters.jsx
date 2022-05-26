import styles from "components/filters/filters.module.css";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import { LATEST, OLDEST } from "constants/constants";

function Filters({ filters, setFilters, setSortBy }) {
  const { categories } = useFetch("/api/categories");

  const [showSortContainer, setShowSortContainer] = useState(false);

  return (
    <>
      <div className={styles.filters}>
        {categories &&
          categories.map(({ _id, categoryName }) => {
            return (
              <button
                className={`btn fs-s ${
                  filters === categoryName
                    ? "btn-secondary"
                    : `${styles.btnSecondaryOutline}`
                } ${styles.btn}`}
                key={_id}
                onClick={() => setFilters(categoryName)}
              >
                {categoryName}
              </button>
            );
          })}
      </div>
      <div className={styles.sort}>
        {categories && (
          <div>
            <button
              onClick={() => setShowSortContainer((prev) => !prev)}
              className={`btn btn-secondary fs-s 
                } ${styles.btn}`}
            >
              SORT
            </button>
          </div>
        )}
        {showSortContainer && (
          <div className={styles.sortContainer}>
            <p
              className={styles.sortListItem}
              onClick={() => setSortBy(() => LATEST)}
            >
              LATEST
            </p>
            <p
              className={styles.sortListItem}
              onClick={() => setSortBy(() => OLDEST)}
            >
              OLDEST
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export { Filters };
