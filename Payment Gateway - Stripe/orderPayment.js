import { LightningElement, api } from 'lwc';
import createCheckoutSession from
'@salesforce/apex/StripePaymentService.createCheckoutSession';

export default class OrderPayment extends LightningElement {

    @api recordId;

    handlePayment() {
        createCheckoutSession({ orderId: this.recordId })
            .then(url => {
                window.location.href = url;
            })
            .catch(error => {
                console.error(error);
                alert('Unable to initiate payment');
            });
    }
}