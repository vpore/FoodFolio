import Notification from "../models/notification.js";
import sendNotification from "./sendNotification.js";

export default async () => {
  const currDate = Date.now();
  const notifications = await Notification.find({ dueAt: { $lte: currDate } });
  // await sendNotification(notifications);
  // notifications.map(async notification => {
  //   await Notification.deleteOne({_id: notification._id})
  // });
};