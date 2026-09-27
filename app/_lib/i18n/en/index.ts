import home from "./home";
import about from "./about";
import services from "./services";
import portfolio from "./portfolio";
import artists from "./artists";
import common from "./common";

// Key order matches the pre-split single-file dictionary.
const en = {
  home,
  about,
  services,
  portfolio,
  artists,
  ...common,
};

export default en;
