console.log("Chat")
const socket = io()

let user
let chatbox = document.querySelector("#chatbox")

Swal.fire({
    title: "User",
    input: "text",
    text: "Ingrese el nombre de Usuario",
    inputValidator: (value) =>{
        return !value && "Campo Obligatorio"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
})

chatbox.addEventListener("keyup", evt => {
    if(evt.key=="Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit("message",{
                user, message: chatbox.value
            })
            chatbox.value=" "
        }
    }
})

socket.on("messageLogs", data =>{
    let log = document.getElementById("messageLogs")
    let mensajes = ""
    data.forEach(({user, message}) => {
        mensajes += `<li> ${user}  dice: ${message} </li>`
    })
    log.innerHTML = mensajes 
})