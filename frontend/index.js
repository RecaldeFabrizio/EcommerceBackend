console.log('index.js')

fetch('http://localhost:8080/api/productMongo', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: {
    //     'nombre': 'Federico'
    // }
}) // GET
    .then(respuesta => respuesta.json())
    .then(respuesta =>{ 
        console.log(respuesta.payload)
        let html = ``
        const productList = document.querySelector('#productList')
        respuesta.payload.map(products => {
            return html+= `
            <div class="card w-25">
                <div class="card-header">
                    ${products.title}
                </div>
                <div class="card-body">
                    Precio: ${products.price}
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary w-100">Details</button>
                </div>
            </div>`
        })
        productList.innerHTML = html

    })
    .catch(error => console.log(error))
