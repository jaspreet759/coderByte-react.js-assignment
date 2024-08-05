import axios from "axios";

const api = axios.create({
  baseURL: "https://test.create.diagnal.com/",
  timeout: 10000,
});

export const fetchListingData = async (page) => {
     
  try {
    const response = await api.get(`/data/${page}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

