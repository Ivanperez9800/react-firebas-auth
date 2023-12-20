import { db } from "../Firebase/Firebase.config";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    query,
    where,
    getDoc,
    updateDoc
}
    from "firebase/firestore";

const taskCollection = collection(db, "Tareas");

export const insertarTarea = async (tareas) => {
    try {
        const docRef = await addDoc(taskCollection, tareas);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}


export const mostrarTareas = async (uid) => {
    const queryCondition = where("user", "==", uid);
    const q = query(taskCollection, queryCondition);

    try {
        const querySnapshot = await getDocs(q);

        const tareas = [];

        querySnapshot.forEach((doc) => {
            // Aquí puedes agregar cada tarea a tu arreglo "tareas"
            tareas.push({
                id: doc.id,
                data: doc.data()
            });
            // console.log(doc.id, " => ", doc.data());
        });

        return tareas;

    } catch (e) {
        console.log("Error al obtener tareas:", e.message);
      
    }
}

export const deleteTask = async (id) =>{
    
    const queryCondition = where("id", "==", id);

    const q = query(taskCollection, queryCondition);

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            await deleteDoc(doc(taskCollection, firstDoc.id));
            // console.log("Documento borrado:", firstDoc.id);

        } else {
            console.log("No se encontraron documentos coincidentes.");
        }
        // await deleteDoc(doc(productoCollection), id);
    } catch (error) {
        console.error(error);
    }

}