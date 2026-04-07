Live : https://food-hub-frontend-a4.vercel.app/

## 🥗 FoodHub: Multi-Tenant Culinary Ecosystem

FoodHub is a sophisticated, full-stack food delivery and kitchen management platform designed to bridge the gap between local culinary masters (Providers) and hungry enthusiasts (Customers).

Built with a **Security-First** mindset, it features a custom **RBAC (Role-Based Access Control)** architecture and a high-performance *"Cyber-Industrial"* glassmorphism UI.


## 📌 Project Summary

FoodHub is not just a food ordering app; it's a complete business management suite.

### 👥 Customers
- Discover local kitchens  
- Manage a persistent cart *(localized to a single provider for logistical integrity)*  
- Track order history  

### 🍳 Providers
- Get a dedicated **"Kitchen Studio"**  
- Manage their digital storefront  
- Control menu inventory  
- Handle live order processing  

### 🛠️ Admins
- Manage user status *(Active/Banned)*  
- Oversee global order logs  
- Define the **"Cuisine Inventory"** *(Categories)*

  
## 📂 Project Structure

```
├── hooks/ (200 tokens)
    ├── use-in-view.ts
    └── use-mobile.ts (200 tokens)
├── components/ (22600 tokens)
    ├── dashboard/ (1400 tokens)
    │   ├── NavItems.tsx
    │   └── AppSidebar.tsx (1400 tokens)
    ├── ui/ (9600 tokens)
    │   ├── skeleton.tsx
    │   ├── label.tsx (200 tokens)
    │   ├── separator.tsx (200 tokens)
    │   ├── textarea.tsx (200 tokens)
    │   ├── progress.tsx (200 tokens)
    │   ├── input.tsx (300 tokens)
    │   ├── scroll-area.tsx (400 tokens)
    │   ├── badge.tsx (400 tokens)
    │   ├── tooltip.tsx (500 tokens)
    │   ├── card.tsx (500 tokens)
    │   ├── button.tsx (600 tokens)
    │   ├── table.tsx (700 tokens)
    │   ├── avatar.tsx (800 tokens)
    │   ├── tabs.tsx (900 tokens)
    │   ├── sheet.tsx (1000 tokens)
    │   ├── dialog.tsx (1100 tokens)
    │   └── select.tsx (1500 tokens)
    ├── meals/ (1400 tokens)
    │   ├── AddToCartButton.tsx (200 tokens)
    │   └── CartSidebar.tsx (1200 tokens)
    ├── shared/ (2100 tokens)
    │   ├── Logo.tsx (200 tokens)
    │   ├── Loader.tsx (300 tokens)
    │   ├── ProviderCard.tsx (500 tokens)
    │   └── Footer.tsx (1100 tokens)
    ├── Home/ (4100 tokens)
    │   ├── FeaturedProviders.tsx (200 tokens)
    │   ├── FeaturedMeals.tsx (500 tokens)
    │   ├── Hero.tsx (1000 tokens)
    │   ├── ProviderCarousel.tsx (1200 tokens)
    │   └── Features.tsx (1200 tokens)
    └── admin/ (4000 tokens)
    │   ├── EditCategoryForm.tsx (1000 tokens)
    │   ├── OrderHistoryTable.tsx (1400 tokens)
    │   └── CategoryList.tsx (1600 tokens)
├── app/ (17300 tokens)
    ├── favicon.ico
    ├── (DashboardLayout)/ (7400 tokens)
    │   ├── @admin/ (2900 tokens)
    │   │   ├── default.tsx
    │   │   └── admin-dashboard/ (2800 tokens)
    │   │   │   ├── loading.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── users/ (300 tokens)
    │   │   │       └── page.tsx (300 tokens)
    │   │   │   ├── orders/ (300 tokens)
    │   │   │       └── page.tsx (300 tokens)
    │   │   │   ├── category-list/ (400 tokens)
    │   │   │       └── page.tsx (400 tokens)
    │   │   │   └── post-categories/ (1600 tokens)
    │   │   │       └── page.tsx (1600 tokens)
    │   ├── @customer/ (2100 tokens)
    │   │   ├── default.tsx
    │   │   └── dashboard/ (2000 tokens)
    │   │   │   ├── page.tsx
    │   │   │   └── my-cart/ (1900 tokens)
    │   │   │       └── page.tsx (1900 tokens)
    │   ├── @provider/ (1900 tokens)
    │   │   ├── default.tsx
    │   │   └── provider-dashboard/ (1800 tokens)
    │   │   │   ├── page.tsx
    │   │   │   └── kitchen-profile/ (1700 tokens)
    │   │   │       └── page.tsx (1700 tokens)
    │   └── layout.tsx (500 tokens)
    ├── loading.tsx
    ├── (AuthLayout)/ (3700 tokens)
    │   ├── sign-in/ (1400 tokens)
    │   │   ├── page.tsx
    │   │   └── SignInForm.tsx (1300 tokens)
    │   ├── sign-up/ (1900 tokens)
    │   │   ├── page.tsx (200 tokens)
    │   │   └── SignUpForm.tsx (1700 tokens)
    │   └── layout.tsx (400 tokens)
    ├── (CommonLayout)/ (3700 tokens)
    │   ├── page.tsx (200 tokens)
    │   ├── layout.tsx (200 tokens)
    │   ├── loading.tsx (300 tokens)
    │   ├── providers/ (1600 tokens)
    │   │   ├── page.tsx (400 tokens)
    │   │   └── [id]/ (1200 tokens)
    │   │   │   └── page.tsx (1200 tokens)
    │   └── meals/ (1400 tokens)
    │   │   └── [id]/ (1400 tokens)
    │   │       └── page.tsx (1400 tokens)
    ├── layout.tsx (200 tokens)
    ├── types/ (500 tokens)
    │   └── provider.ts (500 tokens)
    ├── not-found.tsx (600 tokens)
    └── globals.css (1000 tokens)
├── assets/ (200 tokens)
    └── Image/ (200 tokens)
    │   ├── hero.jpg
    │   └── choose_us.jpg
├── postcss.config.mjs
├── public/ (800 tokens)
    ├── vercel.svg
    ├── window.svg
    ├── file.svg
    ├── globe.svg (200 tokens)
    └── next.svg (300 tokens)
├── lib/ (200 tokens)
    ├── utils.ts
    └── auth-client.ts
├── eslint.config.mjs
├── components.json (200 tokens)
├── .gitignore (200 tokens)
├── helpers/ (800 tokens)
    ├── imageUpload.ts (200 tokens)
    └── cart.helper.ts (600 tokens)
├── next.config.ts (200 tokens)
├── tsconfig.json (200 tokens)
├── env.ts (300 tokens)
├── package.json (300 tokens)
├── actions/ (3600 tokens)
    ├── meal.action.ts (300 tokens)
    ├── provider.action.ts (300 tokens)
    ├── admin.action.ts (300 tokens)
    ├── auth.action.ts (500 tokens)
    ├── category.action.ts (900 tokens)
    └── order.action.ts (1300 tokens)
├── proxy.ts (400 tokens)
├── README.md (400 tokens)
└── service/ (1700 tokens)
    ├── provider.service.ts (400 tokens)
    ├── meal.service.ts (500 tokens)
    └── user.service.ts (800 tokens)
```

## 🛠 Tech Stack

| Layer              | Technology                                                                 |
|--------------------|----------------------------------------------------------------------------|
| **Framework**       | Next.js 15.1 *(App Router)*                                                |
| **Language**        | TypeScript *(Strict Mode)*                                                 |
| **Styling**         | Tailwind CSS 4 + Lucide Icons + Sonner *(Toasts)*                          |
| **Authentication**  | Better-Auth *(Session-based via Secure Cookies)*                           |
| **Form Handling**   | TanStack Form + Zod Validation                                             |
| **State Management**| LocalStorage *(Cart)* + Next.js Server Actions *(UI Sync)*                 |
| **Image Hosting**   | ImgBB API via Custom Upload Helper                                         |
| **Backend**         | Node.js API *(Render-hosted)*                                              |


## 🔐 Architecture & Security Model

### 🔑 RBAC (Role-Based Access Control) Flow

The application implements a strict security matrix using a **Custom Proxy Pattern** (`proxy.ts`).

#### 🛡️ Session Validation
- Every protected request is intercepted  
- `userService.getSession()` validates the `auth_session` token against the backend  

#### 🔀 Parallel Route Guarding
- The **(DashboardLayout)** uses Next.js Parallel Routes  
- Checks user role and renders only the authorized slot:
  - `@admin`
  - `@customer`
  - `@provider`

#### ⚙️ Action Security
- Server Actions *(e.g., `updateUserStatusAction`)* re-verify the session cookie  
- Ensures validation before executing any database mutations

  ## 🔄 Lifecycle & Role Functionality

### 1. 👤 The User Flow (Customer)

#### 🔍 Discovery
- Browses the landing page using `FeaturedProviders` and `FeaturedMeals`

#### 🛒 Cart Integrity
- `cart.helper.ts` enforces a **Single-Provider Cart**
- If a user adds a meal from *"Kitchen A"*, they cannot add from *"Kitchen B"* until the cart is cleared  
- Prevents logistical errors

#### 💳 Checkout
- Users provide a delivery address in the **"Order Manifest"** (`my-cart/page.tsx`)
- Triggers the `createOrderAction`

---

### 2. 🏪 The Storefront Flow (Provider)

#### 🧾 Identity
- Configure **"Kitchen Studio"** (`kitchen-profile`)
- Upload brand banners  
- Set operational addresses  

#### ⚙️ Management
- Use **"Menu Management"** console  
- Add or edit meals  
- All images handled via `imageUpload.ts`  

#### 🚚 Fulfillment
- Monitor **"Live Orders"**  
- Update order statuses  
- Changes reflect in customer order history in real-time  

---

### 3. 🛠️ The Oversight Flow (Admin)

#### 👥 User Directory
- Full visibility of all users  
- Toggle user status *(Active / Blocked)*  

#### 🍽️ Cuisine Inventory
- Create, edit, or delete **Categories** *(admin-only access)*  

#### 📊 Order Flux
- Global view of all transactions  
- Used for monitoring revenue and system efficiency


  ## ⚠️ Error Handling & Edge Cases

The application is engineered to handle **"Graceful Degradations"**:

### 🚫 404 Route Protection
- Custom `not-found.tsx`  
- Includes a **"Return to Base"** protocol for broken manifests  

### 🔐 Auth Guards
- `proxy.ts` prevents **Flash of Unauthorized Content (FOUC)**  
- Session validation happens at the edge/middleware level  

### ✅ Form Validation
- Real-time validation using **TanStack Form**  
- Prevents malformed data from reaching the actions layer  

---

## 🚀 Performance Optimization

### ⚡ Component Level Loading
- Uses `loading.tsx` and custom `Loader.tsx`  
- Provides instant visual feedback during async transitions  

### 🔀 Parallel Data Fetching
- Dashboard slots (`@admin`, `@customer`, etc.) fetch data independently  
- Prevents one slow API from blocking the full dashboard render  

### 🖼️ Asset Management
- Images hosted via **ImgBB**  
- Optimized using Next.js `next/image`  
- Uses specific `remotePatterns` for security and caching


## 🚀 Future Roadmap & Scalability

The **FoodHub ecosystem** is designed for continuous evolution. The following features are planned for upcoming sprints:

### 1. 💳 Integrated Payment Gateway
- **SSL Commerz / Stripe Integration**: Move from "Cash on Delivery" to a fully automated digital payment flow  
- **Refund API**: Automated balance reversal for cancelled orders via the Admin panel  

### 2. 📍 Real-Time Geolocation & Tracking
- **Live Map Registry**: Use Google Maps API to show Customers the exact location of their "Kitchen Partner"  
- **Distance-Based Delivery Fees**: Dynamic calculation of delivery charges based on distance between Provider and Customer  

### 3. 📊 Advanced Analytics Dashboard
- **Provider Insights**: Graphical representation of "Top Selling Meals" and "Revenue Trends" using Recharts or Chart.js  
- **Admin Heatmaps**: Visualizing high-demand zones in Dhaka to onboard targeted Providers  

### 4. 💬 Instant Communication (Chat)
- **Support Tickets**: Direct socket-based (Socket.io) chat system between Customers and Providers for order-specific queries  
- **Automated Notifications**: WhatsApp/SMS alerts for order status updates (Dispatched, Out for Delivery)  

### 5. 📱 PWA & Native Expansion
- **Progressive Web App (PWA)**: Enable "Install to Home Screen" for mobile users with offline caching  
- **React Native Port**: Leverage existing `service/` and `actions/` logic to build native Android/iOS apps

  

  ## 🚀 Installation & Deployment

### 📥 Clone the Repository
```bash
git clone https://github.com/MOBASSHIR07/FoodHub_Frontend_A4.git
cd FoodHub_Frontend_A4
```
### 📦 Install Dependencies

```bash
npm install
```
### ⚙️ Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Core Environment
NODE_ENV=development

# Backend
BACKEND_URL=https://foodhub-backend-a4-2.onrender.com

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000

# Third-party Services
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```

### ▶️ Run Development Server

```bash
npm run dev

```

