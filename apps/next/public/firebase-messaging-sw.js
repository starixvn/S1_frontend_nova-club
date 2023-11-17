importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js'
)

const firebaseConfig = {
  apiKey: 'AIzaSyA1MQd3RU-arPPduv65qcn5G8vOkLAZxkM',
  authDomain: 'nova-club-staging.firebaseapp.com',
  databaseURL:
    'https://nova-club-staging-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'nova-club-staging',
  storageBucket: 'nova-club-staging.appspot.com',
  messagingSenderId: '401100497770',
  appId: '1:401100497770:web:e9f510d8800020b34e7b13',
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
