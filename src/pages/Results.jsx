import { useLocation } from "react-router-dom";


function Results() {
  const location = useLocation();
  const data = location.state;

  console.log(data);

  return (
    <div>Results</div>
  )
}

export default Results;