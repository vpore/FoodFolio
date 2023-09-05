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

// send email

export default async (req, res) => {
  console.log("hello");
    const currDate = Date.now();
    const notifications = await Notification.find();
  // let notifications = [
  //   {
  //     creator: 22,
  //     a: 'abc',
  //     b: 'bcd',
  //     c: 'cde'
  //   },
  //   {
  //     creator: 33,
  //     a: 'xyz',
  //     b: 'wxy',
  //     c: 'vwx'
  //   },
  //   {
  //     creator: 22,
  //     a: 'abc',
  //     b: 'xyz',
  //     c: 'cde'
  //   },
  // ];

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
        from: "focus.app123@gmail.com",
        to: user.email,
        subject: "Expiration Alert",
        html,
      });
    }

    return new Response("Email was sent!", {
      status: 200,
    });
  }

  // notifs.map(async notif => {
  //   let items = "";
  //   notif.map(key => {
  //     items += `${key.itemName} - ${key.expiryDate}\n`;
  //   })

  //   const user = await User.findById(notif); // key of notif
  //   if(user) {
  //     const html = `
  //     <p>Hi, ${user.name}</p>
  //     <p>These are the recently expiring items.. Make sure to not waste them :)</p>
  //     <p>${items}</p>
  //     `;
  //     const sent = await transporter.sendMail({
  //       from: "focus.app123@gmail.com",
  //       to: user.email,
  //       subject: "Expiration Alert",
  //       html
  //     });
  //   }
  // })

  //   const user = await User.findById(notifications.creator);
  //   const item = await Item.findById(notifications.itemId);
  //   if (!user || !item) return;
  //   const date = item.expiryDate.getUTCDate()
  //   const month = item.expiryDate.getUTCMonth()+1
  //   const year = item.expiryDate.getUTCFullYear()
  //   const fullDate = `${date}/${month}/${year}`
  //   const html = `
  //   <p>Hi, ${user.name}</p>
  //   <p>${item.itemName} is expiring on ${fullDate}</p>
  //   `;
  //   const sent = await transporter.sendMail({
  //     from: "focus.app123@gmail.com",
  //     to: user.email,
  //     subject: "Expiration Alert",
  //     html
  //   });
};