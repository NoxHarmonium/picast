import { spawn } from "child_process";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // TODO: Validation/safe parsing
  const { link, authCode } = JSON.parse(req.body);

  if (typeof link !== "string") {
    res.status(400).json({
      detail: "Link attribute is required",
    });
    return;
  }

  const authArgs =
    typeof authCode === "string" && authCode.trim().length > 0
      ? [`--twitch-api-header=Authorization=OAuth ${authCode}`]
      : [];

  const args = [
    "--player",
    "mpv",
    ...authArgs,
    "--twitch-disable-ads",
    link,
    "480p",
  ];

  const process = spawn("streamlink", args);

  process.stdout.setEncoding("utf8");
  process.stdout.on("data", function (data) {
    var str = data.toString();
    var lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
  });

  process.on("close", function (code) {
    console.log("process exit code " + code);
  });

  return res.status(200).json({});
}
