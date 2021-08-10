import React, { useEffect } from "react";
import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { WebsiteImage } from "../components/WebsiteImage";
import h337 from "heatmap.js";
import getData from "../functions/getData";
import getWebsite from "../functions/getWebsite";

interface heatmapProps {}
const heatmapsInfo: {
  createdAt: string;
  url: string;
  value: number;
  xloc: number;
  yloc: number;
  title: string;
}[] = [];

export const Heatmap: React.FC<heatmapProps> = () => {
  const websiteTitle = getWebsite();
  const [dataPoints, imageUrl] = getData(websiteTitle);
  useEffect(() => {
    //set type of heatmapdata to be used in the setdata function
    var heatmapdata: h337.HeatmapData<h337.DataPoint<"value", "x", "y">>;
    //should be changed in the future. guarantees dealer will exist when it may not.
    var heatmapinstance = h337.create({
      container: document.querySelector(".heatmap")!,
    });
    heatmapdata = {
      max: dataPoints.length,
      min: 0,
      data: dataPoints,
    };
    heatmapinstance.setData(heatmapdata);
  });

  return (
    <Wrapper>
      <div className={"heatmap"}>
        <WebsiteImage imageUrl={imageUrl} websiteTitle={websiteTitle} />
        {/* Need to find a better way to generate the heatmap.
        Currently using the canvas to preload the div before the image
        comes in. */}
        <canvas height={1} width={1}></canvas>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Dealer Website for {websiteTitle}
        </div>
      </div>
    </Wrapper>
  );
};

// export default Heatmaps;
export default withUrqlClient((_ssrExchange, ctx) => ({
  url: "http://localhost:1337/graphql",
}))(Heatmap);
