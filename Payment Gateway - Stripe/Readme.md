# 💳 Salesforce – Stripe Payment Gateway Integration

This project demonstrates a complete **Stripe Payment Gateway integration with Salesforce** using **Apex**, **Lightning Web Components (LWC)**, and **Stripe Webhooks**.  
<br>
The solution enables secure online payments for Salesforce custom orders and automatically updates Salesforce records after successful transactions.

---

## 📌 Project Overview

The goal of this project is to:

- Allow users to make payments for Salesforce `Order__c` records
- Redirect users to Stripe Checkout for secure payment
- Receive payment confirmation via Stripe Webhooks
- Automatically create `Payment__c` records in Salesforce
- Update the related `Order__c` status after successful payment

This implementation follows **Salesforce and Stripe best practices** for security, scalability, and maintainability.

---

## 🛠️ Technologies Used

- **Salesforce Apex**
- **Lightning Web Components (LWC)**
- **Stripe Checkout**
- **Stripe Webhooks**
- **Salesforce Sites**
- **HTTP Callouts**
- **JSON Serialization / Deserialization**

---

<!--What I learned here-->

## ⚠️ Common Issues Handled

| Issue | Resolution |
|-----|-----|
Webhook returns 200 but no records created | Fixed by passing `client_reference_id` |
STRING_TOO_LONG errors | Payload safely truncated |
Guest user DML failures | Correct permissions applied |
Order lookup confusion | Corrected object labels and API usage |


## ⚠️ Challenges Faced & Key Learnings (VERY IMPORTANT)

This project involved multiple real-world challenges that significantly improved my understanding of Salesforce integrations.

### 🔴 1. Named Credentials & External Credentials Confusion

**Problem**
- Initially struggled to understand why the Principal was not selectable
- Unsure how authentication headers were generated

**Learning**
- Salesforce auto-binds the Principal if only one exists
- External Credentials provide a secure, reusable authentication layer
- Named Credentials eliminate the need for Remote Site Settings

**Best Practice**
- Always use Named Credentials instead of hardcoding API keys
- Separate authentication (External Credential) from endpoint configuration

---

### 🔴 2. Webhook Returning 200 OK but No Data Changes

**Problem**
- Stripe showed `200 OK`
- No `Payment__c` created
- No `Order__c` update

**Root Cause**
- `client_reference_id` was missing in the checkout session
- Apex exited silently because Order Id was `null`

**Learning**
- Webhooks can succeed technically but fail logically
- Correlation identifiers are critical in asynchronous systems

**Best Practice**
- Always pass internal record IDs using `client_reference_id`

---

### 🔴 3. Guest User Permission Issues

**Problem**
- Webhook executed but DML did not persist
- No errors initially visible

**Learning**
- Salesforce Sites run as Guest Users
- Guest Users require explicit object permissions

**Best Practice**
- Grant minimum required permissions:
- Create on Payment__c
- Read/Edit on Order__c

---

### 🔴 4. STRING_TOO_LONG Errors from Stripe Payload

**Problem**
- Stripe webhook payload exceeded Salesforce Text field limits
- Insert failed with `STRING_TOO_LONG`

**Learning**
- Stripe payloads are very large
- Salesforce Text fields are limited to 255 characters

**Best Practice**
- Use Long Text Area for gateway responses OR
- Truncate payload safely before insert

---

### 🔴 5. Object Naming & Lookup Confusion (Order vs Orders)

**Problem**
- Lookup field label mismatch caused confusion
- API names and labels behaved differently

**Learning**
- Salesforce automatically pluralizes object labels
- API names remain authoritative in Apex

**Best Practice**
- Always rely on API names (`Order__c`) in code
- Validate lookup relationships carefully

---



















## 🧩 Data Model

### Custom Objects

#### 🔹 Order__c
| Field | Type |
|-----|-----|
| Name | Text |
| Amount__c | Currency |
| Status__c | Picklist (Pending, Paid) |

#### 🔹 Payment__c
| Field | Type |
|-----|-----|
| Order__c | Lookup → Order__c |
| Payment_Status__c | Picklist |
| Amount__c | Currency |
| Id_Trans__c | Text (Stripe Payment Intent ID) |
| Gateway_Response__c | Text (Stores Stripe response – truncated) |

---

## 🏗️ Architecture Flow

1. User clicks **Pay** button on `Order__c` record
2. LWC calls Apex (`StripePaymentService`)
3. Apex creates a **Stripe Checkout Session**
4. User completes payment on Stripe
5. Stripe sends **Webhook event** to Salesforce
6. Salesforce processes webhook:
   - Creates `Payment__c`
   - Updates `Order__c` status to **Paid**

---

## 🔐 Security & Best Practices

- Stripe Secret Key is **never exposed to the UI**
- Webhook runs via **Salesforce Site (Guest User)**
- Apex Webhook class runs `without sharing`
- Order Id is passed securely using `client_reference_id`
- Stripe payload size is handled safely to avoid DML errors
- Webhook endpoint responds with proper HTTP status codes

---

## 📁 Apex Classes

### 1️⃣ StripePaymentService.cls

**Purpose**
- Creates Stripe Checkout Session
- Redirects user to Stripe payment page
- Passes Salesforce `Order__c` Id to Stripe

**Key Best Practice**
- Uses `client_reference_id` to map Stripe payment back to Salesforce Order

---

### 2️⃣ StripeWebhook.cls

**Purpose**
- Receives Stripe webhook events
- Validates event type
- Creates `Payment__c` record
- Updates `Order__c` status

**Key Best Practice**
- Runs as `without sharing`
- Designed for Guest User execution
- Handles large payloads safely

---

## 🌐 Salesforce Site Configuration

- Public Salesforce Site created for webhook access
- Apex Class access granted:
  - `StripeWebhook`
- Guest User permissions:
  - Create on `Payment__c`
  - Read/Edit on `Order__c`

---

## 🔁 Stripe Webhook Configuration

- Event Type: `checkout.session.completed`
- Endpoint URL:
