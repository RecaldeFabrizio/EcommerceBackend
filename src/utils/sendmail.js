const nodemailer = require('nodemailer')
const config = require('../config/objetConfig.js')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,
        pass: config.gmail_pass_app
    }
})

exports.sendMail = async (destino, subject, html)=>{
    return await transport.sendMail({
        from: 'Ecommerce Test <fabrizio.recalde98@gmail.com>',
        to: destino,
        subject,
        html,
        
        attachments: [{
            filename:'nodejs.png',
            path: __dirname + '/1684191811250-bf0ab004ea96e1e18ec3703161643fde.jpg',
            cid:'nodejs'
        }]
    })
}
