import React from "react";

export default function Footer({ texts }) {
  return (
    <footer>
      {texts.footerTextPrefix}{" "}
      <a
        href="https://www.linkedin.com/in/marina-ortner-9b2816236/"
        target="_blank"
        rel="noreferrer"
      >
        Marina Ortner
      </a>{" "}
      {texts.footerTextMiddle}{" "}
      <a
        href="https://github.com/Marina-foodie"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>{" "}
      {texts.footerTextSuffix}{" "}
      <a
        href="https://app.netlify.com/teams/marina-foodie/sites"
        target="_blank"
        rel="noreferrer"
      >
        Netlify
      </a>
      .
    </footer>
  );
}
