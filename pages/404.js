// pages/404.js

import MaterialLayout from "@/layouts/MaterialLayout";
import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div id="observer-div">
      <div
        style={{
          minHeight: 240,
          textAlign: "center",
          paddingTop: 35,
          height: 523,
        }}
      >
        <p style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
          Ooops! Looks like you’ve got lost…
        </p>

        <img src="https://job-static.hirist.com/V2/static/media/notfound.978947b0.svg" />
        <a
          style={{
            width: 120,
            height: 34,
            borderRadius: 3,
            border: "solid 1.5px #e9630c",
            display: "block",
            color: "#e9630c",
            padding: 7,
            fontWeight: 600,
            margin: "0 auto",
            marginTop: 40,
          }}
          href="/"
        >
          {" "}
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Custom404;
