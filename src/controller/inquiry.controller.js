// import nodemailer from 'nodemailer'


//  export const inquiryFunction = async (req, res) => {
//     const { name, email, message } = req.body;


//     try {

//         const transporter = nodemailer.createTransport({
//             host: "smtp.hostinger.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }

//         })

//         const mailOptions = {
//             from: `"${name}" <${process.env.EMAIL_USER}>`,
//             replyTo: email,
//             to: process.env.EMAIL_USER,
//             // subject: `[Rescue Click] New Message - ${name}`,
//             html: `
//             <h2> New Enquiry Received </h2>
//             <p> <strong>Name: </strong> ${name}</p>
//              <p> <strong>Email: </strong> ${email}</p>
//              <p> <strong>Message: </strong> ${message}</p>

//         `,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({success: true, message:"Email sent successfully."});
//             } catch (error) {
//                 console.log("Email", error);
//                 res.status(500).json({success:false,message:"Failed to send email"});


//     }
// }




import nodemailer from "nodemailer";

export const inquiryFunction = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `[Rescue Click] New Inquiry from ${name}`,
            html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
        };

        await transporter.verify();
        console.log("SMTP connection successful");

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email"
        });
    }
};
