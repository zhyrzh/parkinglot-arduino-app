const { doc, updateDoc } = require("firebase/firestore");
const firestore = require("../database");
const locationIds = ["0V2XWFWlLqLsDzJLG6fw", "YjgQEuf5IYVRfZKLvbzb"];
const location1slotIds = ["gaFG8hqEG1Dpl2uMx2GT", "MACBSmESFcXATw61wkxS"];
const location2slotIds = ["tsXL2y9EDEh7ys4BFraa", "kYoyMywJs6WK6RbsiMZc"];

module.exports.addParkingSession = async (data) => {
  const slotNumber = data.substring(0, 6);
  const slotStatus = data.substring(7, data.length);
  const convertedSlotNumber = slotNumber.substring(
    slotNumber.length - 1,
    slotNumber.length
  );
  slotStatusModifier(convertedSlotNumber, slotStatus);
};

const slotStatusModifier = async (slotNumber, slotStatus) => {
  const indexOfLocationId = slotNumber <= 2 ? 0 : 1;
  const arrayOfSlotId = slotNumber <= 2 ? location1slotIds : location2slotIds;
  let indexOfSlotId;
  switch (slotNumber) {
    case "3":
    case "1":
      indexOfSlotId = 0;
      break;
    case "4":
    case "2":
      indexOfSlotId = 1;
      break;
  }
  modifierHelper(indexOfLocationId, arrayOfSlotId, indexOfSlotId, slotStatus);
};

const modifierHelper = async (
  locationIdIndex,
  slotIds,
  slotIdIndex,
  slotStatus
) => {
  const locationRef = await doc(
    firestore,
    `Location/${locationIds[locationIdIndex]}/Slots/${slotIds[slotIdIndex]}`
  );
  const locationSlots = await updateDoc(locationRef, {
    Status: slotStatus !== "OCCUPIED",
  });
};
