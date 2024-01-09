importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js'
)

firebase.initializeApp(
  JSON.parse(new URL(location).searchParams.get('firebaseConfig'))
)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
  // self.registration.showNotification(notificationTitle, notificationOptions)
})
