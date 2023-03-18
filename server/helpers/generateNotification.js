import Notification from "../models/notification.js";

export default async(expiryDate, creator, itemId) => {
  const times = [1, 3, 7, 15];

  times.map(async time => {
    let date = new Date(expiryDate);
    let pastDate = date.getDate() - time
    date.setDate(pastDate)    
    if(date > new Date()) {
      const notification = new Notification({
        creator,
        itemId,
        expiryDate,
        dueAt: date
      });
      await notification.save();
    }
  });
};