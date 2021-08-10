import React, { useState } from "react";
import { stringifyVariables } from "urql";
import { withUrqlClient } from "next-urql";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { Wrapper } from "../components/Wrapper";
import { useDomainsQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

export interface Item {
  label: string;
  value: string;
}

interface heatmapsProps {}

let domainsArr: { value: string; label: string }[] = [];
export const Heatmaps: React.FC<heatmapsProps> = () => {
  const [{ data, fetching }] = useDomainsQuery();
  const router = useRouter();
  if (fetching) {
    console.log("IM FETCHING");
  } else if (!data?.domains) {
    console.log("IM NOT HERE");
  } else {
    domainsArr = data?.domains.map((item) => ({
      value: stringifyVariables(item._id),
      label: item.title,
    }));
  }

  const [pickerItems, setPickerItems] = useState(() => domainsArr);
  const [selectedItems, setSelectedItems] = useState<Item[]>(() => []);
  const startup = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };
  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
      router.push({
        pathname: "/heatmap-generation",
        query: { website: selectedItems[0].label },
      });
    }
  };

  return (
    <Wrapper>
      <CUIAutoComplete
        label="Choose dealership websites to generate heatmaps for."
        placeholder="Type a dealer"
        onCreateItem={startup}
        disableCreateItem={true}
        items={domainsArr}
        selectedItems={selectedItems}
        onSelectedItemsChange={(changes) =>
          handleSelectedItemsChange(changes.selectedItems)
        }
      />
    </Wrapper>
  );
};

// export default Heatmaps;
export default withUrqlClient((_ssrExchange, ctx) => ({
  url: "http://localhost:1337/graphql",
}))(Heatmaps);
