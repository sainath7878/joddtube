import styles from "./landingPage.module.css";
import { VideoCard, Filters } from "components/index";
import { useScrollToTop, useFetch } from "hooks/index";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import { getFilteredData } from "utils/filteredData";

function LandingPage() {
  useScrollToTop();
  const { videos } = useFetch("api/videos");

  const [filters, setFilters] = useState("All");

  const filteredData = getFilteredData(videos, filters);

  return (
    <>
      <div className={styles.filterContainer}>
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className={styles.allVideos}>
        {filteredData ? (
          filteredData.map(
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
        ) : (
          <div className="loader">
            <RotatingLines width="100" strokeColor="#a40ae0" />
          </div>
        )}
      </div>
    </>
  );
}

export { LandingPage };
