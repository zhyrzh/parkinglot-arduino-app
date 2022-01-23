const dayjs = require("dayjs");
const {
  doc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  getDoc,
  addDoc,
  serverTimestamp,
} = require("firebase/firestore");
const firestore = require("../database");
const DATE_NOW = dayjs().format("MMM-DD-YYYY HH:mm");
const slotIds = [
  "aCYJF19T3YiT5XOE9uoc",
  "bIoVueG93nTWIFhDx9gc",
  "jS46q51Zy1irEGAs55k2",
  "tJZ4lN5t27ZEqrIyVLvr",
];

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
  const normalizedSlotNumber = +slotNumber;
  const slotId = slotIds[normalizedSlotNumber - 1];

  modifierHelper(slotId, slotStatus);
};

const modifierHelper = async (slotId, slotStatus) => {
  if (slotStatus === "OCCUPIED") {
    occupiedHandler(slotStatus === "OCCUPIED", slotId);
  }
  if (slotStatus !== "OCCUPIED") {
    occupiedHandler(slotStatus === "OCCUPIED", slotId);
  }
};

async function occupiedHandler(isOccupied, slotId) {
  const locationRef = doc(firestore, `Slots/${slotId}`);
  const transactionSessionIn = await getDoc(locationRef);
  const toBeRecordedSessionIn = transactionSessionIn.data().sessionIn;
  if (!isOccupied && toBeRecordedSessionIn) {
    addTransaction(toBeRecordedSessionIn, slotId);
  }
  const sessionIn = generateDate(false) + "--" + generateDate();
  await updateDoc(locationRef, {
    hasOccuringTransaction: isOccupied,
    Status: isOccupied,
    sessionIn: isOccupied ? sessionIn.toString() : null,
  });
}

async function addTransaction(sessionIn, slotId) {
  const dateOnly = generateDate(false);
  const sessionOut = generateDate();
  const transactionRef = doc(
    firestore,
    `Slots/${slotId}/Transactions/${sessionIn}`
  );
  await setDoc(transactionRef, {
    sessionIn: sessionIn.slice(sessionIn.length - 5),
    sessionOut: sessionOut,
    sessionCost: getTotalHours(
      sessionIn.slice(sessionIn.length - 5),
      sessionOut
    ),
  });
}

function generateDate(timeOnly = true) {
  const NOW = dayjs().format("MMM-DD-YYYY");
  const TIME_ONLY = dayjs().format("HH:mm");
  return timeOnly ? TIME_ONLY : NOW;
}

function getTotalHours(sessionIn, sessionOut) {
  const ft = dayjs(`2000-01-01 ${sessionIn}`);
  const tt = dayjs(`2000-01-01 ${sessionOut}`);
  const mins = tt.diff(ft, "minutes", true);
  const totalHours = mins / 60;
  const totalMins = dayjs().minute(mins).$m;
  return totalHours;
}
