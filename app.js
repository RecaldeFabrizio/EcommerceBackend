/* const cluster = require('cluster')
const {cpus}  = require('os')   
const { logger } = require('./src/config/logger') */
const { initServer } = require("./src/server")

/* console.log(cluster.isPrimary)
const numeroDeProcesadores = cpus().length
console.log('cantidad de hilos de ejecución de mi procesador: ', numeroDeProcesadores)
console.log(cpus()) */

/* if (cluster.isPrimary) {
    logger.info('Proceso primario, generando processo trabajador')
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()        
    }
    cluster.on('message', worker => {
        logger.info(`El worker ${worker.process.id} dice ${worker.message}`)
    })
 } else {
     logger.info('al no ser un proceso forkeado, no cuento como primario por lo tanto isPrimari en false, soy un worker') */
initServer()
/* } */
