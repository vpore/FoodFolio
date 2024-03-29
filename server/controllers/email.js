import nodemailer from "nodemailer";
import Item from "../models/item.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW,
  },
});

export const email = async (req, res) => {

  try {
    const currDate = Date.now();
    const notifications = await Notification.find({ dueAt: { $lte: currDate } });

    
    let notifs = {};
    for (const key in notifications) {
      let notif = notifications[key];
      if (!notifs[notif.creator]) notifs[notif.creator] = new Array();

      const item = await Item.findById(notif.itemId);
      if (item) {
        notifs[notif.creator].push({
          itemName: item.itemName,
          expiryDate: item.expiryDate,
        });
      }
    }

    for (const key in notifs) {
      let items = "",
        item,
        date;

      for (const notif in notifs[key]) {
        item = notifs[key][notif];
        date = String(item.expiryDate).substr(0, 15);
        items += `<p>${item.itemName} - ${date}</p>`;
      }

      const user = await User.findById(key); // key of notif
      if (user) {
        const html = `
        <p>Hi, ${user.name}</p>
        <p>These are the recently expiring items.. Make sure to not waste them :)</p>
        ${items}
        `;
        const sent = await transporter.sendMail({
          from: "kitchen.app@gmail.com",
          to: user.email,
          subject: "Expiration Alert",
          html,
        });
      }
    }
    
    notifications.map(async notification => {
      await Notification.deleteOne({ _id: notification._id })
    });
    return res.status(200).json({ message: "Email sent!" });
  }
  
  catch (error) {
    return res.status(404).json({ error: error.message });
  }

};