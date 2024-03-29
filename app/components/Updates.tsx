import { useState, useEffect } from "react";

const UPDATES_URL = "https://vixcord-updates.vercel.app/updates";

export default function Updates({ periodically = false }) {
  try {
    var [content, setContent] = useState(<div />);

    console.log(window);
  return content;
  }
  catch (err) {
    return <h1>{err}</h1>
  }
}
