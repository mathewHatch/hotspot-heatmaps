import { Box, Image, propNames } from "@chakra-ui/react";
import React from "react";
interface WebsiteImageProps {
  imageUrl: string;
  websiteTitle: string;
}

//need to work on creating the heatmapInstance within this function
export class WebsiteImage extends React.Component<WebsiteImageProps> {
  constructor(props: WebsiteImageProps) {
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
      //
      <Box w={1280} h={720} className="heatmap">
        <Image
          src={this.props.imageUrl}
          alt=""
          onLoad={() => this.setState({ loaded: true })}
        ></Image>
      </Box>
    );
  }
}
