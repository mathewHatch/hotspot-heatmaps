import { useRouter } from "next/dist/client/router";

const getWebsite = () => {
  const router = useRouter();
  const { website } = router.query;
  //no website information in url
  if (!website) {
    return "NO INFORMATION";
    //website not of type string
  } else if (typeof website !== "string") {
    return "INCORRECT INFORMATION";
    //website is correctly set
  } else {
    return website;
  }
};

export default getWebsite;
