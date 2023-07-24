import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import { auth, db } from '@/lib/firebase/config'

/**
 * Googleログイン
 * @returns boolean
 */
export const signInFromGoogle = async (): Promise<boolean> => {
  const provider = new GoogleAuthProvider()
  let isSuccess = false
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const docRef = doc(db, 'users', user.uid)

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        user_id: user.uid,
        username: user.displayName,
        login_at: serverTimestamp(),
      })
    } else {
      await setDoc(docRef, {
        user_id: user.uid,
        username: user.displayName,
        login_at: serverTimestamp(),
        created_at: serverTimestamp(),
      })
    }
    isSuccess = true
  } catch (error) {
    console.error(error)
    isSuccess = false
  }
  return isSuccess
}

/**
 * ログアウト
 * @returns boolean
 */
export const signOut = async (): Promise<boolean> => {
  let isSuccess = false
  try {
    await auth.signOut()
    isSuccess = true
  } catch (error) {
    console.error(error)
    isSuccess = false
  }
  return isSuccess
}
