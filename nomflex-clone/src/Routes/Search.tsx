import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { getDetail } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const {data, isLoading} = useQuery(["search", keyword], () => getDetail(keyword));
  console.log(data)
  return null;
}
export default Search;