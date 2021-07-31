import { Box, Image, propNames } from "@chakra-ui/react";
import h337 from "heatmap.js";
import React from "react";
import getData from "../functions/getData";
import getDealer from "../functions/getDealer";

interface DealerImageProps {
  imageUrl: string;
  dealership: string;
}

//need to work on creating the heatmapInstance within this function
export class DealerImage extends React.Component<DealerImageProps> {
  constructor(props: DealerImageProps) {
    super(props);
    this.state = { loaded: false };
  }
  //possibly usable at a later date. want to create the heamtapInstance after mounting of component
  //   componentDidMount() {
  //     const dealer = getDealer();
  //     const dataPoints = getData(dealer);
  //     //set type of heatmapdata to be used in the setdata function
  //     var heatmapdata: h337.HeatmapData<h337.DataPoint<"value", "x", "y">>;
  //     //should be changed in the future. guarantees dealer will exist when it may not.
  //     var heatmapinstance = h337.create({
  //       container: document.querySelector(".heatmap")!,
  //     });
  //     heatmapdata = {
  //       max: dataPoints.length,
  //       min: 0,
  //       data: dataPoints,
  //     };
  //     console.log(heatmapdata);
  //     heatmapinstance.setData(heatmapdata);
  //   }
  render() {
    return (
      <Box w={1000} h={600} className="heatmap">
        <Image
          src={this.props.imageUrl}
          alt=""
          onLoad={() => this.setState({ loaded: true })}
        ></Image>
      </Box>
    );
  }
}
