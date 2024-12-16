import * as firebaseauth from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = firebaseauth.getAuth();

// Función para verificar el estado del usuario
export const checkUserState = (onLoggedIn, onLoggedOut) => {
  firebaseauth.onAuthStateChanged(auth, (user) => {
    if (user) {
      onLoggedIn(user);
    } else {
      onLoggedOut();
    }
  });
};

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const userCredential = await firebaseauth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    alert("Inicio de sesión exitoso.");
    return userCredential;
  } catch (error) {
    alert("Error en el inicio de sesión: " + error.message);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await firebaseauth.signOut(auth);
    alert("Has cerrado sesión.");
  } catch (error) {
    alert("Error al cerrar sesión: " + error.message);
    throw error;
  }
};