import home from "./home";
import about from "./about";
import services from "./services";
import portfolio from "./portfolio";
import common from "./common";

// Key order matches the pre-split single-file dictionary.
const zh = {
  home,
  about,
  services,
  portfolio,
  ...common,
};

export default zh;
