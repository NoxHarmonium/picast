import Head from "next/head";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

const startStreamLink = async (
  link: string,
  authCode: string
): Promise<void> => {
  await fetch("/api/streamlink", {
    method: "POST",
    body: JSON.stringify({
      link,
      authCode,
    }),
  });
};

export default function Home() {
  const [link, setLink] = useState("");
  const [authCode, setAuthCode] = useState("");

  const onLinkUpdate: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLink(event.target?.value ?? "");
  };

  const onAuthCodeUpdate: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAuthCode(event.target?.value ?? "");
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    void startStreamLink(link, authCode);
    event.preventDefault();
  };

  return (
    <div className="container py-5">
      <Head>
        <title>PiCast</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <main>
        <div className="container">
          <h1>Welcome to PiCast</h1>

          <p>Paste your stream link below:</p>

          <form>
            <div className="mb-3">
              <label htmlFor="link-input" className="form-label">
                Stream Link:
              </label>
              <input
                className="form-control"
                id="link-input"
                aria-describedby="linkHelp"
                value={link}
                onChange={onLinkUpdate}
              ></input>
              <div id="linkHelp" className="form-text">
                Copy from the URL bar in the browser (or copy shared link)
              </div>
              <label htmlFor="link-input" className="form-label">
                Auth Token (Optional):
              </label>
              <input
                className="form-control"
                id="link-input"
                aria-describedby="authHelp"
                value={authCode}
                onChange={onAuthCodeUpdate}
              ></input>
              <div id="authHelp" className="form-text">
                See authentication section of
                https://streamlink.github.io/cli/plugins/twitch.html
              </div>
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossOrigin="anonymous"
      ></script>
      <footer></footer>
    </div>
  );
}
