var nodemailer=require('nodemailer')

exports.sendMail=(url)=> {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'deepupadukone6@gmail.com',
               pass: 'Deepu@2497'
           }
       });
       const mailOptions = {
        from: 'deepupadukone6@gmail.com', // sender address
        to: 'ilovehitman45sharma@gmail.com',// list of receivers
        subject: 'Subject of your email', // Subject line
        text: url// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
