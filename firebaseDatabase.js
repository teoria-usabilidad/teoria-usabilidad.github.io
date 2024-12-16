import * as firebaseDatabase from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import app from "./script.js";

let database = firebaseDatabase.getDatabase(app.app);
let ref = firebaseDatabase.ref(database, "numeroClicks");

// Función para aumentar el contador
export async function increaseClicks(numeroClicks) { 

  // Actualiza el valor en la base de datos
  await firebaseDatabase.set(ref, numeroClicks); 
}

// funcion para obtener el contador

export async function getClicks() {
  console.log("getclicks called");
  let snapshot = await firebaseDatabase.get(ref);
  const data = snapshot.val();
  console.log(snapshot.val());
  return data;
}
