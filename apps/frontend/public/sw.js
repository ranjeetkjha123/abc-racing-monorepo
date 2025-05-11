// Service Worker for ABC Racing
const CACHE_NAME = "abc-racing-v1"
const OFFLINE_URL = "/offline"

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  // Add critical CSS, JS, and images here
]

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - network-first strategy with offline fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and browser extensions
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.includes("extension") ||
    // Skip cross-origin requests
    !event.request.url.startsWith(self.location.origin)
  ) {
    return
  }

  // For HTML pages - network first, then cache, then offline page
  if (event.request.headers.get("Accept") && event.request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest version
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request).then((cachedResponse) => {
            // Return cached response or offline page
            return cachedResponse || caches.match(OFFLINE_URL)
          })
        }),
    )
    return
  }

  // For other assets - stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response immediately
      if (cachedResponse) {
        // Fetch new version in background
        fetch(event.request)
          .then((response) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone())
            })
          })
          .catch(() => {
            // Silently fail if update fails
          })
        return cachedResponse
      }

      // If not in cache, fetch from network
      return fetch(event.request)
        .then((response) => {
          // Cache the response
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          // For images, return a placeholder
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match("/placeholder.svg")
          }
          // For other assets, just fail
          return new Response("Not available offline", {
            status: 503,
            statusText: "Service Unavailable",
          })
        })
    }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-forms") {
    event.waitUntil(syncForms())
  }
})

// Push notification handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-72x72.png",
      vibrate: [100, 50, 100],
      data: {
        url: data.url,
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})

// Helper function to sync stored form data
async function syncForms() {
  try {
    const db = await openDatabase()
    const forms = await db.getAll("outbox")

    return Promise.all(
      forms.map(async (form) => {
        try {
          const response = await fetch(form.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form.data),
          })

          if (response.ok) {
            await db.delete("outbox", form.id)
          }
        } catch (error) {
          // Will retry on next sync
          console.error("Failed to sync form:", error)
        }
      }),
    )
  } catch (error) {
    console.error("Error in syncForms:", error)
  }
}

// IndexedDB helper for offline storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("abc-racing-db", 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("outbox")) {
        db.createObjectStore("outbox", { keyPath: "id", autoIncrement: true })
      }
      if (!db.objectStoreNames.contains("favorites")) {
        db.createObjectStore("favorites", { keyPath: "id" })
      }
    }

    request.onsuccess = (event) => {
      const db = event.target.result
      resolve({
        getAll: (store) => {
          return new Promise((resolve) => {
            const transaction = db.transaction(store, "readonly")
            const objectStore = transaction.objectStore(store)
            const request = objectStore.getAll()
            request.onsuccess = () => resolve(request.result)
          })
        },
        add: (store, data) => {
          return new Promise((resolve) => {
            const transaction = db.transaction(store, "readwrite")
            const objectStore = transaction.objectStore(store)
            const request = objectStore.add(data)
            request.onsuccess = () => resolve(request.result)
          })
        },
        delete: (store, id) => {
          return new Promise((resolve) => {
            const transaction = db.transaction(store, "readwrite")
            const objectStore = transaction.objectStore(store)
            const request = objectStore.delete(id)
            request.onsuccess = () => resolve()
          })
        },
      })
    }

    request.onerror = () => reject(request.error)
  })
}
