module.exports.addParkingSession = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      data,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
