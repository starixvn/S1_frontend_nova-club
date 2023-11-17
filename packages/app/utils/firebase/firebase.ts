import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: 'AIzaSyA1MQd3RU-arPPduv65qcn5G8vOkLAZxkM',
  authDomain: 'nova-club-staging.firebaseapp.com',
  databaseURL:
    'https://nova-club-staging-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'nova-club-staging',
  storageBucket: 'nova-club-staging.appspot.com',
  messagingSenderId: '401100497770',
  appId: '1:401100497770:web:e9f510d8800020b34e7b13',
}

const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
