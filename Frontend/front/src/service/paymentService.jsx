import { getHeaders } from "../utils/http"
import AxiosClient from "./axiosClient"
//import {REACT_APP_BASE_URL,REACT_APP_PAYMENT_ENDPOINT}  from "./config"

export default class PaymentService {
  constructor() {
    this.client = new AxiosClient()
  }

  createPaymentIntent = ({productId,callbackSuccess,callbackError}) =>{
    const requestInfo = {url:`${'http://localhost:8080'}${'/api/payments'}/payment-intents?id=${productId}`,callbackSuccess,callbackError}
    this.client.makePostRequest(requestInfo)
  }

  pay = ({body,callbackSuccess,callbackError}) =>{
        const requestInfo = {url:`${'http://localhost:8080'}${'/api/payments'}/checkout`,body,config:getHeaders(),callbackSuccess,callbackError}
        this.client.makePostRequest(requestInfo)
  }
}


