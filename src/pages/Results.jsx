import { useLocation } from "react-router-dom";
import List from "../components/lists/List";
import { Suspense } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";

function Results() {
  const location = useLocation();
  const data = location.state.data;

  console.log(data);
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <List list={data} /> 
    </Suspense>
  )
}

export default Results;
