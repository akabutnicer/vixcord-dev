import React, { useState, useEffect } from "react";
import {useFetcher} from "@remix-run/react";

const UPDATES_URL = "https://vixcord-updates.vercel.app/updates";

export default function Updates({ periodically = false }) {
  try {
    var [content, setContent] = useState(<div />);

   var fetch = useFetcher();
    var res = fetch.load(UPDATES_URL);
    setContent(res);
  return content;
  }
  catch (err) {
    return <h1>err</h1>
  }
}
