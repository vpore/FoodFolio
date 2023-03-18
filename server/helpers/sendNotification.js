import nodemailer from "nodemailer";
import Item from "../models/item.js";
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW
  }
});

// send email

export default async (notifications) => {
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
  notifications.map(async notif => {
    if(!notifs[notif.creator]) notifs[notif.creator] = new Array();

    const item = await Item.findById(notif.itemId);
    if(item) {
      notifs[notif.creator].push({
        creator: notif.creator,
        itemName: item.itemName,
        expiryDate: item.expiryDate
      });
    }
  });
  console.log(notifs);

  notifs.map(async notif => {
    let items = [];
    notif.map(n => {
      items.push(n.itemName);
    })

    const user = await User.findById(notif); // key of notif
    if(user) {
      const html = `
      <p>Hi, ${user.name}</p>
      <p>${items} is expiring on some-date</p>
      `;
      const sent = await transporter.sendMail({
        from: "focus.app123@gmail.com",
        to: user.email,
        subject: "Expiration Alert",
        html
      });
    }
  })

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