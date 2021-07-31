import { useRouter } from "next/dist/client/router";

const getDealer = () => {
  const router = useRouter();
  const { dealer } = router.query;
  //no dealer information in url
  if (!dealer) {
    return "NO INFORMATION";
    //dealer not of type string
  } else if (typeof dealer !== "string") {
    return "INCORRECT INFORMATION";
    //dealer is correctly set
  } else {
    return dealer;
  }
};

export default getDealer;
