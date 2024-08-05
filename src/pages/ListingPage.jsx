import { useEffect, useState } from "react";
import { fetchListingData } from "../api/api";
import { Box, styled, Skeleton } from "@mui/material";
import Navbar from "../components/Navbar";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSearchContext } from "../contexts/SearchContext";
import LazyImage from "../components/LazyImage";

const ListingPage = () => {
  const [data, setData] = useState(null);
  const [Fdata, setFData] = useState([]);
  const { searchTerm, setTitle } = useSearchContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchListingData("page1");
        setData(data);
        setTitle(data?.page?.title || "Title");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [setTitle]);

  useEffect(() => {
    if (data?.page?.["content-items"]?.content) {
      const filteredItems = data.page["content-items"].content.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFData(filteredItems);
    }
  }, [data, searchTerm]);

  if (loading) {
    return (
      <Box className="hide-scrollbars">
        <Navbar />
        <CustomerBox>
          {[...Array(9)].map((_, index) => (
            <CustomerCard key={index}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton width="60%" />
            </CustomerCard>
          ))}
        </CustomerBox>
      </Box>
    );
  }

  return (
    <Box className="hide-scrollbars">
      <Navbar />
      {Fdata.length === 0 && <NoDataMessage>No Data Found 🙀</NoDataMessage>}
      <CustomerBox>
        {Fdata.map((item, index) => {
          const imageName = item["poster-image"];
          const imageUrl = `https://test.create.diagnal.com/images/${imageName}`;
          return (
            <CustomerCard key={index}>
              <LazyImage
                src={imageUrl}
                alt={item.name}
                effect="blur"
                style={{ maxWidth: "100%", height: "25%" }}
              />
              <p style={{ margin: "10px 0" }}>{item.name}</p>
            </CustomerCard>
          );
        })}
      </CustomerBox>
    </Box>
  );
};

export default ListingPage;

const CustomerBox = styled(Box)({
  width: "100vw",
  height: "calc(100vh - 64px)",
  backgroundColor: "black",
  color: "white",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  padding: "10px",
  overflow: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const CustomerCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "black",
  color: "white",
  padding: "10px",
});

const NoDataMessage = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  height: "100vh",
  width: "100%",
  color: "white",
  backgroundColor: "black",
  fontSize: "24px",
  textAlign: "center",
});
