# 🍔 Salesforce Food Ordering & Delivery Assignment System

This project is a **Salesforce-based Food Ordering System** built using **Lightning Web Components (LWC), Apex, and Flows**.  
Users can place food orders by selecting a hotel and menu items, and the system automatically assigns the **nearest available delivery agent**.  
Delivery agents can accept or reject orders, and users can track order status in real time.

---

## 📌 Project Overview

The application contains **two main user interfaces**:

1. **User Page**
   - Select Hotel
   - View menus based on selected hotel
   - Place food orders
   - Enter delivery location manually (for testing)
   - Track order status

2. **Delivery Agent Page**
   - Receive assigned orders
   - Accept or reject orders
   - Update order status

The entire assignment process is automated using **Apex logic and Salesforce Flows**.

---

## 🏗️ Architecture Overview

- **Frontend**: Lightning Web Components (LWC)
- **Backend**: Apex Classes
- **Automation**: Record-Triggered Flows
- **Database**: Custom Salesforce Objects
- **Security**: Profiles, Permission Sets, Private Sharing

---

## 📂 Data Model

### Custom Objects

- **Hotel__c**
  - Stores hotel information

- **Menu__c**
  - Stores food menu items
  - Lookup to Hotel__c

- **Food_Order__c**
  - Stores order details
  - Status lifecycle:
    - Placed
    - Assigned
    - Accepted
    - Rejected
  - Lookup to Delivery_Agent__c

- **Order_Item__c**
  - Junction object between Food_Order__c and Menu__c

- **Delivery_Agent__c**
  - Stores delivery agent details
  - Availability and location (Latitude & Longitude)

---

## 🔄 Application Flow

1. User selects a hotel and menu items.
2. User enters delivery location manually.
3. User places the order.
4. A Food_Order__c record is created with status **Placed**.
5. A record-triggered Flow calls an Apex service.
6. Apex calculates the nearest available delivery agent.
7. Order is assigned and status updated to **Assigned**.
8. Delivery agent receives the order.
9. Agent accepts or rejects the order.
10. User tracking page updates order status in real time.

---

## ⚙️ Core Features

### User Features
- Hotel-based menu selection
- Order placement
- Manual location input
- Live order status tracking

### Delivery Agent Features
- View assigned orders
- Accept or reject orders
- Automatic reassignment on rejection

### System Features
- Automatic nearest agent assignment
- Real-time status updates
- Secure role-based access

---

## 🧩 Lightning Web Components

### User Components
- `userOrderPage`
  - Hotel and menu selection
  - Order placement

- `orderTracking`
  - Displays order status updates

### Agent Components
- `agentDashboard`
  - Displays assigned orders
  - Accept / Reject functionality

---

## 🔁 Automation

- **Record-Triggered Flow**
  - Runs after Food_Order__c creation
  - Calls Apex class for agent assignment

- **Apex Service**
  - Calculates distance using latitude & longitude
  - Assigns nearest available delivery agent

---

## 🔐 Security & Access Control

- **Profiles / Permission Sets**
  - User: Create and view own orders
  - Delivery Agent: View assigned orders and update status

- **Sharing Settings**
  - Food_Order__c set to Private
  - Access controlled through Apex logic

---

## 🚀 How to Run the Project

1. Create a Salesforce Developer Org.
2. Create all custom objects and fields.
3. Insert sample data (Hotels, Menus, Delivery Agents).
4. Deploy Apex classes and LWCs.
5. Configure record-triggered Flow.
6. Assign Lightning pages to profiles.
7. Test user order placement and agent assignment.

---

## 🧪 Testing Scenarios

- Place an order and verify agent assignment
- Reject an order and check reassignment
- Accept an order and verify status update
- Track order status from user page

---

## 📘 Use Case

This project demonstrates how Salesforce can be used to build a **real-world delivery assignment system** using modern Lightning components, automation, and backend logic.

---

## 👨‍💻 Author

**Varunshiyam**  
Salesforce Developer  
