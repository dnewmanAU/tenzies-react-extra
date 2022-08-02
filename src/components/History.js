import React from "react";
import { Link } from "react-router-dom";

export default function History() {
  return (
    <>
    <Link to="/">
    <button>
        {"Back"}
    </button>
    </Link>
  <h1>History Page</h1>
  </>
  );
}
