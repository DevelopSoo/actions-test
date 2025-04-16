export async function initMsw() {
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled"
  )
    return;
  if (typeof window === "undefined") {
    const { server } = await import("../mocks/server");
    server.listen();
  } else {
    const { worker } = await import("../mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
