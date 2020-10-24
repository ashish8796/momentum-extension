import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import {
  fab,
  faFacebookF,
  faTwitter,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fab, faFacebookF, faTwitter, faGithub, faLinkedinIn);

function Shortcuts() {
  const { linkObj } = useSelector((state) => state.settings);
  const findIcon = (iconName) => {
    switch (iconName) {
      case "faTwitter":
        return faTwitter;
      case "faFacebook":
        return faFacebookF;
      case "faGithub":
        return faGithub;
      case "faLinkedin":
        return faLinkedinIn;

      default:
        return;
    }
  };

  const addLinkToFooter = () => {
    return Object.values(linkObj).map((link, i) => (
      <li key={i}>
        {
          <a
            href={`https://www.${link.siteName}.com/${
              link.siteName === "linkedIn"
                ? "in/" + link.userName
                : link.userName
            }`}
            target="_blank"
          >
            <FontAwesomeIcon icon={findIcon(link.iconName)} />
          </a>
        }
      </li>
    ));
  };

  return (
    <footer>
      <nav>{addLinkToFooter()}</nav>
    </footer>
  );
}

export default Shortcuts;
