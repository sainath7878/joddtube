import styles from "./landingPage.module.css";
import { VideoCard, Filters } from "components/index";
import { useScrollToTop, useFetch, useDocumentTitle } from "hooks/index";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import { getFilteredData, getSortedData } from "utils";
import { useAuth } from "context";

function LandingPage() {
  useScrollToTop();
  const { videos } = useFetch("api/videos");

  const [filters, setFilters] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const filteredData = getFilteredData(videos, filters);
  const sortedData = getSortedData(filteredData, sortBy);

  const {
    authState: { loading },
  } = useAuth();

  useDocumentTitle("Home");

  return (
    <>
      <div className={styles.filterContainer}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          setSortBy={setSortBy}
        />
      </div>
      <div className={styles.allVideos}>
        {loading ? (
          <div className="loader">
            <RotatingLines width="100" strokeColor="#a40ae0" />
          </div>
        ) : (
          sortedData &&
          sortedData.map(
            ({
              _id,
              imgSrc,
              title,
              description,
              thumbnail,
              creator,
              views,
              uploaded,
              length,
              verified,
            }) => (
              <VideoCard
                key={_id}
                _id={_id}
                imgSrc={imgSrc}
                title={title}
                description={description}
                thumbnail={thumbnail}
                creator={creator}
                views={views}
                uploaded={uploaded}
                length={length}
                verified={verified}
              />
            )
          )
        )}
      </div>
    </>
  );
}

export { LandingPage };
