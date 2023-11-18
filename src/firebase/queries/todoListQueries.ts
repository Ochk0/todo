import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

interface Item {
    name: string;
    id: number;
    isDone: boolean;
}
export const updateTasks = async (data: Item[]) => {
    const collectionRef = doc(db, "tasks", "myTasks");

    try {
        const docRef = await updateDoc(collectionRef, {
            tasks: data
        });

        console.log("Document written with ID");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const fetchTasks = async (setTasks: React.Dispatch<React.SetStateAction<Item[]>>) => {
    try {
        // const docRef = await addDoc(collection(db, "tasks"), data);
        const docRef = doc(db, "tasks", "myTasks");
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        if (docSnap.data() != undefined)
            setTasks(docSnap.data()!.tasks as Item[])
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
