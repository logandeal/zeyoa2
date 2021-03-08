import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { auth, db } from "config/firebase";

export const useNotes = () => {
  const [note, setNote] = useState("");
  const auth = useAuth();
  const onSaveNote = async () => {
    try {
      await db.collection("notes").doc(auth.user.uid).set({ note });
    } catch (error) {
      console.log(error);
    }
  };

  /*
  const onSaveNote = () => {
    console.log(`note:${note}`);
    db.collection("notes")
      .doc(auth.user.uid)
      .set({ note })

      .catch((error) => {
        console.log(error);
        //return { error };
      });
  };
  */

  const uid = auth.user ? auth.user.uid : "";

  useEffect(() => {
    if (!uid) {
      return;
    }
    async function loadNote() {
      const noteData = await db.collection("notes").doc(auth.user.uid).get();
      setNote(noteData.data().note);
    }
    loadNote();
    /*
    db.collection("notes")
      .doc(auth.user.uid)
      .get()
      .then((noteData) => {
        if (noteData.data()) {
          setNote(noteData.data().note);
        }
      })
    */
  }, [uid]);

  return { note, setNote, onSaveNote };
};

// Provider hook that creates an auth object and handles its state
// const useAuthProvider = () => {
//   const [user, setUser] = useState(null);

//   const getUserAdditionalData = (user: firebase.User) => {
//     return db
//       .collection("users")
//       .doc(user.uid)
//       .get()
//       .then((userData) => {
//         if (userData.data()) {
//           setUser(userData.data());
//         }
//       });
//   };

//   const handleAuthStateChanged = (user: firebase.User) => {
//     setUser(user);
//     if (user) {
//       getUserAdditionalData(user);
//     }
//   };

//   useEffect(() => {
//     const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
//     return () => unsub();
//   }, []);

//   const submitNote = (user, noteText) => {
//     return db
//       .collection("notes")
//       .doc(user.uid)
//       .set(user)
//       .then(() => {
//         setUser(user);
//         return user;
//       })
//       .catch((error) => {
//         return { error };
//       });
//   };

//   return {
//     user,
//   };
// };
