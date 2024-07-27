# Sales Management Dashboard

## Overview
The Shoes Management Dashboard is a comprehensive platform designed to efficiently manage shoes inventory, track sales, and analyze sales history. This full-stack project includes features such as authentication, CRUD operations, state management, real-time UI updates, and advanced filtering options. The goal is to provide tools for users to manage inventory and sales effectively.

## Live Link
Check out the live version of the project [Sales management Live link](https://sales-management-client-lake.vercel.app).

## Features

### Authentication
- **User Registration and Login**: Users must register and log in to access the dashboard using JWT (JSON Web Tokens) for secure authentication.
- **User Roles**:
  - **Buyer**:
    - Search for products.
    - View available inventory.
    - Request polish service and customized design shoes.
  - **Seller**:
    - Add new products.
    - Update existing product details.
    - View the complete list of shoes.
    - Manage sales.
    - Accept polish and customize shoes requests from buyers.

### Shoes Management
- **CRUD Operations**:
  - Add a new pair of shoes to the inventory.
  - Delete existing shoes from the inventory.
  - Update shoe details.
  - Read and view the list of shoes in the inventory.
- **Filtering System**:
  - Filter by Price, Release Date, Brand, Model, Style, Size, Color.
  - Additional filters such as material, closure type, etc.

### Sales Management
- **Sales Process**:
  - Users can search for a product to sell.
  - On clicking the "Sell" button, a form pops up with fields for quantity, buyer's name, and sale date.
  - The product is removed from the inventory if the quantity reaches zero.

### Sales History
- View sales history categorized by:
  - Weekly
  - Daily
  - Monthly
  - Yearly

### Additional Features
- **User Interface**:
  - Real-time UI updates for product updates, sales, etc.
  - RTK Query for efficient CRUD operations.
  - Re-fetching functionality for data accuracy and consistency.
- **State Management**:
  - Utilize Redux for maintaining a consistent application state.
- **Polish Service**:
  - User interface for submitting shoe polishing requests.
  - Tracking system for polishing service requests.
- **Product Verification/ID Verification**:
  - Unique ID assignment for each product.
  - Verification process for authenticity checks.
- **Bulk Delete Product Options**:
  - Interface for selecting and deleting multiple shoes simultaneously.
- **Duplicate & Edit Feature**:
  - Feature to duplicate and edit existing products for creating variants.

### Technologies Used
- **Frontend**: React, Redux, Tailwind, Daisy UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: vercel

## Setup Instructions
## How to run my code 
1. **Clone this client repository**:
   ```bash
     git clone https://github.com/fl9mdasif/sales-management-client
   ```
    **run this code**:
   ```bash
     npm run dev
   ```

2. **Clone the Server repository**:
   ```bash
     git clone https://github.com/fl9mdasif/pet-adoption-prisma-express.git
   ```
   **run the server side code**:
     ```bash
       npm run start-dev
     ```
   
