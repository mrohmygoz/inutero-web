import home from "./home";
import about from "./about";
import common from "./common";

// Key order matches the pre-split single-file dictionary.
const en = {
  home,
  about,
  ...common,
};

export default en;
