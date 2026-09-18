import home from "./home";
import about from "./about";
import services from "./services";
import common from "./common";

// Key order matches the pre-split single-file dictionary.
const zh = {
  home,
  about,
  services,
  ...common,
};

export default zh;
