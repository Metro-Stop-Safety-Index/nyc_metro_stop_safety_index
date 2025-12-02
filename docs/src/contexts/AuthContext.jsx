/**
 * Authentication Context
 * Manages global authentication state using Firebase Auth
 */

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase.js';

const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  // Sign in anonymously (guest access)
  const signInAsGuest = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'Email already in use',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/network-request-failed': 'Network error. Please try again',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/operation-not-allowed': 'Operation not allowed. Please contact support',
      'auth/invalid-credential': 'Invalid credentials. Please check your email and password'
    };

    return errorMessages[errorCode] || 'An error occurred. Please try again';
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAnonymous: currentUser?.isAnonymous || false,
    loading,
    signup,
    login,
    signInAsGuest,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
