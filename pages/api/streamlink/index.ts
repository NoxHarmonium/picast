import { spawn } from "child_process";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  console.log(req.body);
  const { link, authCode } = req.body;

  if (typeof link !== "string") {
    res.status(400).json({
      detail: "Link attribute is required",
    });
  }

  const authArgs =
    typeof authCode === "string" && authCode.trim().length > 0
      ? [`--twitch-api-header="Authorization=OAuth ${authCode}`]
      : [];

  const args = [
    "--player",
    "mpv",
    ...authArgs,
    "--twitch-disable-ads",
    link,
    "480p",
  ];

  await spawn("streamlink", args);

  return res.status(200).json({});
}
