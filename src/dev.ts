import "./serve/index.ts";

// const BASE_URL = "127.0.0.1";
const BASE_URL = "47.103.157.15";

export const dev = async () => {
  const url = new URL("/hmis/work", `http://${BASE_URL}:5003`);

  const headers = new Headers();
  headers.set("Content-Type", "application/json;charset=utf-8");

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

export const heartbeat = async () => {
  const url = new URL("/hmis/heartbeat", `http://${BASE_URL}:5003`);

  const res = await fetch(url, {
    method: "POST",
  });

  const data = await res.json();

  console.log(data);
};
