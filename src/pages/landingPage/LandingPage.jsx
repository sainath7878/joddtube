import styles from "./landingPage.module.css";
import { VideoCard, Filters } from "components/index";
import { videos } from "backend/db/videos";

function LandingPage() {
  return (
    <>
      <div className={styles.filterContainer}>
        <Filters />
      </div>
      <div className={styles.allVideos}>
        {videos.map(
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
        )}
      </div>
    </>
  );
}

export { LandingPage };
