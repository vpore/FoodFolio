import Notification from "../models/notification.js";
import sendNotification from "./sendNotification.js";

export default async () => {
  // const currDate = Date.now();
  // const notifications = await Notification.find({ dueAt: { $lte: currDate } });
  // await sendNotification(notifications);
  // notifications.map(async notification => {
  //   await Notification.deleteOne({_id: notification._id})
  // });
  const notifications = {
    _id: { $oid: "64e8ce46129f6803249066f7" },
    creator: "63a5850474198a56b1fff623",
    itemId: "64e8ce45129f6803249066f3",
    expiryDate: { $date: { $numberLong: "1693440000000" } },
    dueAt: { $date: { $numberLong: "1693353600000" } },
    createdAt: { $date: { $numberLong: "1692978758041" } },
    updatedAt: { $date: { $numberLong: "1692978758041" } },
    __v: { $numberInt: "0" },
  };
  await sendNotification(notifications);
};