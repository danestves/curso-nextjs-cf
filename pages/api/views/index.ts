// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = (await db.collection("views").get()).docs;
  const views = snapshot.map((snap) => {
    return snap.data().value;
  });

  if (!views.length) {
    return res.status(200).json({
      total: 0,
    });
  }

  return res.status(200).json({
    total: views.reduce((a, b) => {
      return a + b;
    }),
  });
}
