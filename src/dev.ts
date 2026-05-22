import { exec } from "@vscode/sudo-prompt";
import path from "node:path";
import process from "node:process";
import url from "node:url";

const main = () => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const serveExe = path.resolve(__dirname, "../serve.exe");

  exec(
    serveExe,
    {
      name: "Electron",
    },
    (error, result) => {
      if (error) {
        console.error("error", error);

        return;
      }

      console.log("result", result);
    },
  );
};

main();

process.on("SIGINT", async () => {
  const res = await fetch("http://localhost:5003/exit");
  const data = await res.json();

  console.log(data);
  process.exit(0);
});
process.on("SIGTERM", async () => {
  const res = await fetch("http://localhost:5003/exit");
  const data = await res.json();

  console.log(data);
  process.exit(0);
});
