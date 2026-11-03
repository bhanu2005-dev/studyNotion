const nodemailer=require('nodemailer');
require("dotenv").config();
const mailSender=async(email,title,body)=>{
  try{
    // Brevo API
if (process.env.BREVO_API_KEY) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "StudyNotion",
        email: "YOUR_VERIFIED_SENDER_EMAIL",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: title,
      htmlContent: body,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Brevo email failed");
  }

  console.log("Brevo email sent:", result.messageId);
  return result;
}
    // Railway: Resend API
//if (process.env.RESEND_API_KEY) {
  //const response = await fetch("https://api.resend.com/emails", {
    //method: "POST",
   // headers: {
    //  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
     // "Content-Type": "application/json",
   // },
    //body: JSON.stringify({
     // from: "StudyNotion <onboarding@resend.dev>",
     //// to: [email],
     // subject: title,
     // html: body,
   // }),
 // });

  //const result = await response.json();

 // if (!response.ok) {
   // throw new Error(result.message || "Resend email failed");
 // }

 // console.log("Resend email sent:", result.id);
 // return result;
//}
    //Create Transporter
    let transporter=nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      },
    });

    //Send mail
    let info=await transporter.sendMail({
      from:"StudyNotion",
      to:`${email}`,
      subject:`${title}`,
      html:`${body}`
    });

    console.log(info);
    return info;
  }
  catch(err){
    console.log("Mail Error:",err);
    throw err;
  }
}


module.exports=mailSender;