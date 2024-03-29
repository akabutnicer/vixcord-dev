import { useState, useEffect } from "react";

const UPDATES_URL = "https://vixcord-updates.vercel.app/updates";

export default function Updates({ periodically = false }) {
  try {
  return <h1>hello</h1>;
  }
  catch (err) {
    return <h1>{err}</h1>
  }
}
