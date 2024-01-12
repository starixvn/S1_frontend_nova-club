importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js'
)

const firebaseConfig = {
  apiKey: 'AIzaSyDAASGYqsKBYqgtkkC5h_RUUsDDaXoVk-8',
  authDomain: 'vui-health.firebaseapp.com',
  databaseURL:
    'https://vui-health-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'vui-health',
  storageBucket: 'vui-health.appspot.com',
  messagingSenderId: '1015314255459',
  appId: '1:1015314255459:web:e1f2778326f7306ca17256',
}

firebase.initializeApp(firebaseConfig)

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
