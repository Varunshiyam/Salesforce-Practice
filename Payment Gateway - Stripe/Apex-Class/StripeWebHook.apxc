@RestResource(urlMapping='/stripe/webhook')
global without sharing class StripeWebhook {

    @HttpPost
    global static void handleWebhook() {

        try {
            // 1️⃣ Read webhook payload
            String payload = RestContext.request.requestBody.toString();
            System.debug('Stripe Webhook Payload: ' + payload);

            // 2️⃣ Deserialize JSON
            Map<String, Object> event =
                (Map<String, Object>) JSON.deserializeUntyped(payload);

            // 3️⃣ Only handle successful checkout
            if ((String) event.get('type') != 'checkout.session.completed') {
                return;
            }

            // 4️⃣ Extract session object
            Map<String, Object> session =
                (Map<String, Object>)
                ((Map<String, Object>) event.get('data')).get('object');

            String orderId = (String) session.get('client_reference_id');
            String paymentIntentId = (String) session.get('payment_intent');
            Long amountTotal = (Long) session.get('amount_total');

            if (orderId == null) {
                System.debug('❌ client_reference_id is NULL');
                return;
            }

            // 5️⃣ Create Payment__c
            Payment__c payment = new Payment__c();
            payment.Order__c = orderId;
            payment.Payment_Status__c = 'Success';
            payment.Id_Trans__c = paymentIntentId;
            payment.Amount__c = amountTotal / 100;

            // Avoid STRING_TOO_LONG
            payment.Gateway_Response__c =
                payload.length() > 255 ? payload.substring(0, 255) : payload;

            insert payment;

            // 6️⃣ Update Order__c
            update new Order__c(
                Id = orderId,
                Status__c = 'Paid'
            );

            System.debug('✅ Payment created & Order updated');

        } catch (Exception e) {
            System.debug('❌ Webhook Error: ' + e.getMessage());
            throw e; // Stripe will retry if error occurs
        }
    }
}