// const BASE_URL= process.env.REACT_APP_BASE_URL
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:4000/api/v1";

export const categories={
  CATEGORIES_API:BASE_URL + "/course/showAllCategories", 
}