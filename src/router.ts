import { oak } from "./deps.ts";
import { ignoreErr } from "./utils/plain.ts";
import { useSSEResponse } from "./utils/sse.ts";

const router = new oak.Router();

router.post("/v1/chat/completions", async (ctx) => {
  // args
  const headers = {
    "Content-Type": ctx.request.headers.get("Content-Type") || "",
    "Authorization": ctx.request.headers.get("Authorization") || "",
    "Accept": ctx.request.headers.get("Accept") || "",
    "Accept-Encoding": ctx.request.headers.get("Accept-Encoding") || "",
    "Origin": ctx.request.headers.get("Origin") || "",
    "Referer": ctx.request.headers.get("Referer") || "",
    "User-Agent": ctx.request.headers.get("User-Agent") || "",
  };
  const body = await ctx.request.body({ type: "text" }).value;
  const bodyObj = ignoreErr(() => JSON.parse(body));
  // fetch OpenAI API
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body,
  });
  // set response
  res.headers.forEach((val, key) => {
    ctx.response.headers.set(key, val);
  });
  ctx.response.status = res.status;
  if (bodyObj?.stream !== true) {
    ctx.response.body = await res.text();
    return;
  }
  // event stream
  const target = ctx.sendEvents();
  useSSEResponse(res, {
    onmessage(field, value) {
      if (field === "data") {
        target.dispatchMessage(value);
      } else if (field === "") {
        target.dispatchComment(value);
      }
    },
    onclose() {
      target.close();
    },
  });
});

export default router;
