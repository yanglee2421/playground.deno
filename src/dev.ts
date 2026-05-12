import "./serve/index.ts";

const dev = async () => {
  const BASE_URL = "127.0.0.1";
  //   const BASE_URL = "47.103.157.15";
  const headers = new Headers();
  headers.set("Content-Type", "application/json;charset=utf-8");

  const url = new URL("/hmis/work", `http://${BASE_URL}:5003`);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      dh: "",
      zh: "12312312",
    }),
    headers,
  });
  const data = await res.json();

  console.log(data);
};

dev();
