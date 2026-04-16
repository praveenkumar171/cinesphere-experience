export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Workers are not supported in this browser");
    return;
  }

  try {
    await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
    console.log("Service Worker registered successfully");
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};
