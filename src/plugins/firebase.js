import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import FieryVue from 'fiery-vue'
import duix from 'duix'

/**
 * Settings for dev firebase instance
 * @const {object}
 */
const devSettings = {
  apiKey: 'AIzaSyAjXGlux1zLL4QfEi4an2-KkIT4F6HxtMc',
  authDomain: 'real-dev-7b60c.firebaseapp.com',
  databaseURL: 'https://real-dev-7b60c.firebaseio.com',
  projectId: 'real-dev-7b60c',
  storageBucket: 'real-dev-7b60c.appspot.com',
  messagingSenderId: '945338183181'
}

/**
 * Settings for production firebase instance
 * @const {object}
 */
const prodSettings = {
  apiKey: 'AIzaSyCAsGVxjcBRsSNlQsymRnzWQAAYqphmmVU',
  authDomain: 'real-45953.firebaseapp.com',
  databaseURL: 'https://real-45953.firebaseio.com',
  projectId: 'real-45953',
  storageBucket: 'real-45953.appspot.com',
  messagingSenderId: '231971009763'
}

const fbapp = firebase.initializeApp(process.env.DEV ? devSettings : prodSettings)
// const fbapp = firebase.initializeApp(prodSettings)

const firestore = fbapp.firestore()
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

function user (uid) {
  if (uid) {
    console.log('valid uid', uid)
    return fbapp.firestore().collection('user').doc(uid)
  } else {
    if (fbapp.auth().currentUser) {
      return fbapp.firestore().collection('user').doc(fbapp.auth().currentUser.uid)
    } else {
      return false
    }
  }
}

// Would need to come from admin -- cloud function
// function userList () {

// }

function userData () {
  return fbapp.firestore().collection('user')
}

function callCloudFunction (name, data) {
  return fbapp.functions().httpsCallable(name)(data)
}

// Set up Church List in duix
duix.set('church', [])

firestore.collection('church').onSnapshot((querySnap) => {
  duix.set('church', querySnap.docs.map(e => { return { id: e.id, ...e.data() } }))
})

function store (name) {
  return duix.get(name)
}

function subscribe (name, callback) {
  return duix.subscribe(name, callback)
}

function subscribePath (name, path, callback) {
  duix.set(name, null)
  firestore.doc(path).onSnapshot((snapshot) => {
    if (snapshot.docs) {
      duix.set(name, snapshot.docs.map(e => { return { id: e.id, ...e.data() } }))
    } else {
      duix.set(name, snapshot.data())
    }
  })
  return duix.subscribe(name, callback)
}

function addUser (data) {
  const addUserFunction = firebase.functions().httpsCallable('user-adminAddUser')
  return addUserFunction(data)
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(FieryVue)

  Vue.prototype.$firebase = {
    app: fbapp.firebase_,
    emailCred: firebase.auth.EmailAuthProvider.credential,
    auth: fbapp.auth(),
    firestore: firestore,
    functions: callCloudFunction,
    user: user,
    userData: userData,
    store: store,
    subscribe: subscribe,
    subscribePath: subscribePath,
    addUser
  }
}
