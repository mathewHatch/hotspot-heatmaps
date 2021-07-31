//function to get data from backend and push information to datapoints

import { useHeatmapInfoQuery } from "../generated/graphql";

//need to clean up function, should use interface most likely and be better at error handling
const getData = (
  dealer: string
): [h337.DataPoint<"value", "x", "y">[], string] => {
  const [{ data, fetching }] = useHeatmapInfoQuery({
    variables: { domain: dealer },
  });
  var dataPoints: h337.DataPoint<"value", "x", "y">[] = [];
  var imageUrl: string = "http://localhost:1337/screenshot?url=";
  //no data
  if (!data) {
    //no heatmapInfo
  } else if (!data?.heatmapInfo) {
    //if fetching in progress
  } else if (fetching) {
    //if data is there
  } else {
    imageUrl = imageUrl + data.heatmapInfo[0].domain.url;
    dataPoints = data.heatmapInfo.map((item) => ({
      x: item.xloc,
      y: item.yloc,
      value: item.value,
    }));
  }
  return [dataPoints, imageUrl];
};

export default getData;
