import { Box, Skeleton } from "@mui/material";
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ src, alt, style }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <Box ref={ref}>
      {inView ? (
        <LazyLoadImage
          src={src}
          alt={alt}
          effect="blur"
          style={style}
        />
      ) : (
        <Skeleton variant="rectangular" width={100} height={118} />
      )}
    </Box>
  );
};

export default LazyImage;
