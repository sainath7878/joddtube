import styles from "components/filters/filters.module.css";
import { useFetch } from "hooks/useFetch";

function Filters({ filters, setFilters }) {
  const { categories } = useFetch("/api/categories");
  console.log(categories);
  return (
    <div className={styles.filters}>
      {categories &&
        categories.map(({ _id, categoryName }) => {
          return (
            <button
              className={`btn  ${
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
  );
}

export { Filters };
