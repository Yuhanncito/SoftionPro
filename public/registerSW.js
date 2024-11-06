const PUBLICKEY = "BBeSyh4-JimNpNCTwdyyUBujq1iaIoOby-Kqk8yv_GE7JAjOf8LU8xJVT9poP3Ccch0Q8IugJsGQVUnoojAxSXo";

const Url2 = 'http://localhost:4000/api/test';
const Url = 'https://softion-api-v3.vercel.app/api/test';

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

let isRegistered = window.localStorage.getItem('isRegistered') === 'true';

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", async () => {
    if (isRegistered) {
      console.log('Service Worker ya registrado');
      return;
    }

    

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      console.log("Service Worker registrado:", registration);

      let activeWorker;

      if (registration.waiting) {
        activeWorker = registration.waiting;
      } else if (registration.installing) {
        activeWorker = await new Promise((resolve, reject) => {
          const stateChangeListener = (e) => {
            if (registration.installing?.state === "activated") {
              resolve(registration.installing);
              registration.installing.removeEventListener("statechange", stateChangeListener);
            } else if (registration.installing?.state === "redundant") {
              reject(new Error("Installation failed"));
              registration.installing.removeEventListener("statechange", stateChangeListener);
            }
          };

          registration.installing?.addEventListener("statechange", stateChangeListener);
        });
      } else {
        activeWorker = registration.active;
      }

      if (activeWorker) {
        console.log("Active Worker:", activeWorker);
        let subscription = await registration.pushManager.getSubscription();
        console.log("Current subscription:", subscription);

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLICKEY),
          });
          console.log("New subscription:", subscription);
        }

        await fetch(Url, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });

        window.localStorage.setItem('subscription', JSON.stringify(subscription));
        window.localStorage.setItem('isRegistered', 'true');
        isRegistered = true;
      }
    } catch (error) {
      console.error("Error durante el registro del Service Worker:", error);
    }

    navigator.serviceWorker.addEventListener('message', event => { 
      if (event.data && event.data.type === 'SW_ACTIVATED') 
        { 
          console.log('Service Worker activado recargado');
          alert('El Service Worker ha sido activado. Por favor, recarga la página para habilitar las notificaciones push.'); 
        } 
      });
  });
}
