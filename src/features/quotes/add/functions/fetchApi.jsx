import { liveKey } from "../../../../credentials";

export const fetchApi = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${liveKey}`
  );
  const data = await response.json();

  if (data.totalItems === 0) {
    return [];
  } else {
    return data.items;
  }
};
