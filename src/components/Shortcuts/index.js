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
  const { links } = useSelector((state) => state.settings);

  const iconName = {
    twitter: faTwitter,
    facebook: faFacebookF,
    linkedin: faLinkedinIn,
    github: faGithub,
  };

  const addLinkToFooter = () => {
    return Object.keys(links).map(
      (key, i) =>
        links[key].length > 0 && (
          <li key={i}>
            {
              <a
                href={`https://www.${key}.com/${
                  key === "linkedIn" ? "in/" + links[key] : links[key]
                }`}
                target="_blank"
              >
                <FontAwesomeIcon icon={iconName[key]} />
              </a>
            }
          </li>
        )
    );
  };

  return (
    <footer>
      <nav>{addLinkToFooter()}</nav>
    </footer>
  );
}

export default Shortcuts;
