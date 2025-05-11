export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Use a try-catch block to handle any errors during registration
      try {
        navigator.serviceWorker
          .register("/sw.js") // Changed path to /sw.js which is more standard
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((error) => {
            console.log("SW registration failed: ", error)
          })
      } catch (error) {
        console.error("Service worker registration error:", error)
      }
    })
  }
}
