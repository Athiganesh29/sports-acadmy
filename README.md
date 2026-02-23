# Sports Academy Website — Project Architecture

> Full-stack web application for a professional Sports Academy built with React.js, Tailwind CSS, Node.js, Express.js, and MongoDB.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Website Pages](#website-pages)
3. [Admin Panel Pages](#admin-panel-pages)
4. [Core Features](#core-features)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [MongoDB Schemas](#mongodb-schemas)
8. [API Endpoints](#api-endpoints)
9. [Component Structure](#component-structure)
10. [Deployment Plan](#deployment-plan)
11. [Environment Variables](#environment-variables)
12. [Getting Started](#getting-started)
13. [Future Enhancements](#future-enhancements)

---

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Frontend     | React.js 18+, Tailwind CSS 3+              |
| Backend      | Node.js 20+, Express.js 4+                 |
| Database     | MongoDB 7+ (Mongoose ODM)                  |
| Auth         | JWT (jsonwebtoken) + bcryptjs               |
| Image Store  | Cloudinary                                  |
| Deployment   | Vercel (FE) / Render (BE) / Atlas           |
| Other        | WhatsApp API, Google Maps Embed API         |

---

## Website Pages

### 1. Home Page (`/`)
- Hero banner with academy tagline and CTA button
- Highlights section (key stats: students trained, years active, sports offered)
- Featured programs carousel
- Testimonials slider
- Upcoming events preview
- Footer with quick links, social media, and WhatsApp chat button

### 2. About Academy (`/about`)
- Academy history and mission statement
- Vision, mission, and core values
- Achievements and milestones timeline
- Facilities overview with images
- Affiliated organizations and certifications

### 3. Coaches & Trainers (`/coaches`)
- Grid/card layout of all coaches
- Each card: photo, name, sport, experience, certifications
- Individual coach detail page (`/coaches/:id`)
- Coach specialization filter (by sport)

### 4. Programs — Age Groups (`/programs`)
- Programs categorized by age group:
  - Kids (5–8 yrs)
  - Juniors (9–13 yrs)
  - Teens (14–17 yrs)
  - Adults (18+ yrs)
- Each program card: sport name, age group, schedule summary, fee, CTA
- Individual program detail page (`/programs/:id`)

### 5. Training Schedule (`/schedule`)
- Weekly timetable view (filterable by sport and age group)
- Day-wise schedule with time slots, coach assigned, and venue
- Downloadable PDF schedule option

### 6. Gallery (`/gallery`)
- Photo gallery with category filters (events, training, tournaments)
- Video gallery section (embedded YouTube/Vimeo)
- Lightbox viewer for images
- Lazy-loaded media grid

### 7. Registration Page (`/register`)
- Multi-step registration form:
  - Step 1: Student details (name, age, gender, photo upload)
  - Step 2: Parent/guardian details
  - Step 3: Program and batch selection
  - Step 4: Review and submit
- Form validation (client + server)
- Success confirmation with registration ID
- Email notification to admin on new registration

### 8. Contact Page (`/contact`)
- Contact form (name, email, phone, subject, message)
- Academy address with embedded Google Map
- Phone numbers and email addresses
- Working hours
- WhatsApp direct chat button
- Social media links

### 9. Blog / News Section (`/blog`) — Optional
- Blog listing page with cards (title, excerpt, image, date)
- Individual blog post page (`/blog/:slug`)
- Categories and tags
- Admin-managed via backend API

---

## Admin Panel Pages

> All admin routes are prefixed with `/admin` and protected behind JWT authentication.
> The admin panel uses a **sidebar layout** separate from the public website.

### Admin Login (`/admin/login`)
- Email and password login form
- JWT token stored in httpOnly cookie
- "Forgot Password" link with email-based reset
- Redirect to dashboard on successful login

### Admin Dashboard (`/admin/dashboard`)
- Summary stat cards:
  - Total registrations (this month / all time)
  - Active programs count
  - Active coaches count
  - Unread contact messages
  - Total revenue (if fee tracking enabled)
- Recent registrations table (last 10)
- Quick action buttons (Add Coach, Add Program, Upload Media)
- Line chart: registrations over the last 6 months

### Manage Coaches (`/admin/coaches`)
- Paginated table of all coaches (name, sport, experience, status)
- Search by name or sport
- **Add Coach** (`/admin/coaches/new`) — form with photo upload
- **Edit Coach** (`/admin/coaches/:id/edit`) — pre-filled form
- Toggle active/inactive status
- Delete coach with confirmation modal

### Manage Programs (`/admin/programs`)
- Paginated table of all programs (name, sport, age group, fee, coach, status)
- Filter by age group or sport
- **Add Program** (`/admin/programs/new`) — form with image upload, coach dropdown
- **Edit Program** (`/admin/programs/:id/edit`) — pre-filled form
- Toggle active/inactive status
- Delete program with confirmation modal

### Manage Schedule (`/admin/schedule`)
- Full weekly schedule grid view (editable)
- **Add Schedule Entry** — modal form (program, coach, day, time, venue)
- **Edit Schedule Entry** — inline edit or modal
- Delete entry with confirmation
- Bulk actions: clear day, duplicate week

### Manage Registrations (`/admin/registrations`)
- Paginated table of all registrations (ID, student name, program, date, status)
- Filter by status (Pending / Confirmed / Cancelled)
- Search by student name or registration ID
- **View Registration** (`/admin/registrations/:id`) — full details with student photo
- Update status dropdown (Pending → Confirmed / Cancelled)
- Export registrations to CSV
- Send email notification on status change

### Manage Gallery (`/admin/gallery`)
- Grid view of all uploaded media with thumbnails
- Filter by type (photo / video) and category
- **Upload Media** — drag-and-drop zone with category and title fields
- Bulk upload support (multiple photos at once)
- Delete media with confirmation
- Reorder media (drag-and-drop sort)

### Manage Contact Messages (`/admin/messages`)
- Table of all contact form submissions (name, email, subject, date, read status)
- Unread message count badge in sidebar
- **View Message** (`/admin/messages/:id`) — full message detail, marks as read
- Reply via email directly from the panel
- Delete message with confirmation

### Manage Blog Posts (`/admin/blogs`)
- Table of all blog posts (title, author, status, date)
- Filter by published / draft
- **Add Blog Post** (`/admin/blogs/new`) — rich text editor, image upload, tags
- **Edit Blog Post** (`/admin/blogs/:id/edit`) — pre-filled editor
- Toggle publish/draft status
- Delete post with confirmation

### Manage Testimonials (`/admin/testimonials`)
- Table of all testimonials (name, role, rating, status)
- **Add Testimonial** — form with photo upload and star rating
- **Edit Testimonial** — pre-filled form
- Toggle active/inactive (controls display on public site)
- Delete with confirmation

### Admin Settings (`/admin/settings`)
- **Profile Settings** — update admin name, email, avatar
- **Change Password** — current password + new password form
- **Site Settings** — academy name, phone, email, address, social links, WhatsApp number
- **Manage Admins** — invite new admin, change roles (Super Admin / Editor)

---

## Core Features

| Feature                | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| Responsive Design      | Mobile-first approach with Tailwind breakpoints (sm, md, lg, xl)    |
| Admin Panel            | Full dashboard with sidebar layout for managing all website content  |
| JWT Authentication     | Secure admin login with httpOnly cookies, role-based access control  |
| Online Registration    | Multi-step form with validation, file upload, and email alerts      |
| WhatsApp Integration   | Floating WhatsApp button using `https://wa.me/<number>` deep link   |
| Google Maps            | Embedded Google Maps iframe on the Contact page                     |
| Contact Form           | Form submissions stored in DB and forwarded via email (Nodemailer)  |
| Photo & Video Gallery  | Cloudinary-hosted images, YouTube embeds, lightbox viewer           |
| SEO Optimized          | React Helmet for meta tags, Open Graph, semantic HTML, sitemap.xml  |
| Performance            | Lazy loading, image optimization, code splitting with React.lazy    |
| CSV Export             | Export registrations data to CSV from admin panel                   |
| Email Notifications    | Auto-email on registration, status change, and contact replies      |

---

## Frontend Architecture

```
client/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── sitemap.xml
│   ├── robots.txt
│   └── assets/
│       └── images/
│           ├── logo.png
│           ├── hero-banner.jpg
│           └── og-image.jpg
│
├── src/
│   ├── index.js                    # Entry point
│   ├── App.jsx                     # Root component with routes
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SEO.jsx             # React Helmet wrapper
│   │   │   └── Button.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── Highlights.jsx
│   │   │   ├── FeaturedPrograms.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── UpcomingEvents.jsx
│   │   │
│   │   ├── about/
│   │   │   ├── AcademyHistory.jsx
│   │   │   ├── MissionVision.jsx
│   │   │   ├── Achievements.jsx
│   │   │   └── Facilities.jsx
│   │   │
│   │   ├── coaches/
│   │   │   ├── CoachCard.jsx
│   │   │   ├── CoachList.jsx
│   │   │   └── CoachDetail.jsx
│   │   │
│   │   ├── programs/
│   │   │   ├── ProgramCard.jsx
│   │   │   ├── ProgramList.jsx
│   │   │   ├── ProgramDetail.jsx
│   │   │   └── AgeGroupFilter.jsx
│   │   │
│   │   ├── schedule/
│   │   │   ├── ScheduleTable.jsx
│   │   │   ├── ScheduleFilter.jsx
│   │   │   └── TimeSlot.jsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.jsx
│   │   │   ├── VideoGrid.jsx
│   │   │   ├── Lightbox.jsx
│   │   │   └── GalleryFilter.jsx
│   │   │
│   │   ├── registration/
│   │   │   ├── RegistrationForm.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   ├── ParentDetails.jsx
│   │   │   ├── ProgramSelection.jsx
│   │   │   ├── ReviewSubmit.jsx
│   │   │   └── SuccessMessage.jsx
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── GoogleMap.jsx
│   │   │   └── ContactInfo.jsx
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── BlogPost.jsx
│   │   │
│   │   └── admin/
│   │       ├── layout/
│   │       │   ├── AdminLayout.jsx       # Sidebar + topbar + content wrapper
│   │       │   ├── AdminSidebar.jsx      # Navigation sidebar
│   │       │   └── AdminTopbar.jsx       # Top header with profile/logout
│   │       │
│   │       ├── common/
│   │       │   ├── DataTable.jsx         # Reusable paginated table
│   │       │   ├── StatCard.jsx          # Dashboard stat card
│   │       │   ├── ConfirmModal.jsx      # Delete/action confirmation
│   │       │   ├── SearchBar.jsx         # Table search input
│   │       │   ├── StatusBadge.jsx       # Colored status pill
│   │       │   └── FileUploader.jsx      # Drag-and-drop file upload
│   │       │
│   │       ├── dashboard/
│   │       │   ├── DashboardStats.jsx
│   │       │   ├── RecentRegistrations.jsx
│   │       │   └── RegistrationChart.jsx
│   │       │
│   │       ├── coaches/
│   │       │   ├── CoachTable.jsx
│   │       │   └── CoachForm.jsx         # Add + Edit (shared)
│   │       │
│   │       ├── programs/
│   │       │   ├── ProgramTable.jsx
│   │       │   └── ProgramForm.jsx
│   │       │
│   │       ├── schedule/
│   │       │   ├── ScheduleGrid.jsx
│   │       │   └── ScheduleEntryForm.jsx
│   │       │
│   │       ├── registrations/
│   │       │   ├── RegistrationTable.jsx
│   │       │   ├── RegistrationDetail.jsx
│   │       │   └── ExportCSV.jsx
│   │       │
│   │       ├── gallery/
│   │       │   ├── GalleryGrid.jsx
│   │       │   └── MediaUploadForm.jsx
│   │       │
│   │       ├── messages/
│   │       │   ├── MessageTable.jsx
│   │       │   └── MessageDetail.jsx
│   │       │
│   │       ├── blogs/
│   │       │   ├── BlogTable.jsx
│   │       │   └── BlogEditor.jsx        # Rich text editor form
│   │       │
│   │       ├── testimonials/
│   │       │   ├── TestimonialTable.jsx
│   │       │   └── TestimonialForm.jsx
│   │       │
│   │       └── settings/
│   │           ├── ProfileSettings.jsx
│   │           ├── ChangePassword.jsx
│   │           ├── SiteSettings.jsx
│   │           └── ManageAdmins.jsx
│   │
│   ├── pages/
│   │   ├── public/                       # Public website pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── CoachesPage.jsx
│   │   │   ├── ProgramsPage.jsx
│   │   │   ├── SchedulePage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   └── admin/                        # Admin panel pages
│   │       ├── LoginPage.jsx
│   │       ├── DashboardPage.jsx
│   │       ├── CoachesPage.jsx
│   │       ├── CoachFormPage.jsx
│   │       ├── ProgramsPage.jsx
│   │       ├── ProgramFormPage.jsx
│   │       ├── SchedulePage.jsx
│   │       ├── RegistrationsPage.jsx
│   │       ├── RegistrationDetailPage.jsx
│   │       ├── GalleryPage.jsx
│   │       ├── MessagesPage.jsx
│   │       ├── MessageDetailPage.jsx
│   │       ├── BlogsPage.jsx
│   │       ├── BlogFormPage.jsx
│   │       ├── TestimonialsPage.jsx
│   │       └── SettingsPage.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx               # Admin auth state (JWT, user info)
│   │
│   ├── hooks/
│   │   ├── useFetch.js                   # Generic API fetch hook
│   │   ├── useForm.js                    # Form state management
│   │   ├── useAuth.js                    # Auth context consumer hook
│   │   └── useScrollToTop.js
│   │
│   ├── services/
│   │   ├── api.js                        # Axios instance + interceptors
│   │   └── authService.js               # Login, logout, refresh token helpers
│   │
│   ├── routes/
│   │   ├── PublicRoutes.jsx              # All public page routes
│   │   ├── AdminRoutes.jsx              # All admin page routes
│   │   └── ProtectedRoute.jsx           # Auth guard wrapper component
│   │
│   ├── utils/
│   │   ├── constants.js                  # App-wide constants
│   │   └── helpers.js                    # Utility functions
│   │
│   └── styles/
│       ├── index.css                # Tailwind directives
│       └── custom.css               # Custom overrides (minimal)
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

---

## Backend Architecture

```
server/
├── src/
│   ├── server.js                    # Express app entry point
│   │
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary config
│   │   ├── nodemailer.js            # Email transporter
│   │   └── jwt.js                   # JWT secret + options
│   │
│   ├── models/
│   │   ├── Admin.js                 # Admin user model
│   │   ├── Coach.js
│   │   ├── Program.js
│   │   ├── Schedule.js
│   │   ├── Registration.js
│   │   ├── Gallery.js
│   │   ├── Contact.js
│   │   ├── Blog.js
│   │   ├── Testimonial.js
│   │   └── SiteSetting.js           # Dynamic site configuration
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Login, logout, forgot/reset password
│   │   ├── adminRoutes.js           # Admin CRUD, profile, settings
│   │   ├── dashboardRoutes.js       # Dashboard stats + charts
│   │   ├── coachRoutes.js
│   │   ├── programRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── registrationRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── blogRoutes.js
│   │   └── testimonialRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js        # Login, logout, token refresh
│   │   ├── adminController.js       # Admin CRUD, profile
│   │   ├── dashboardController.js   # Aggregated stats
│   │   ├── coachController.js
│   │   ├── programController.js
│   │   ├── scheduleController.js
│   │   ├── registrationController.js
│   │   ├── galleryController.js
│   │   ├── contactController.js
│   │   ├── blogController.js
│   │   └── testimonialController.js
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification middleware
│   │   ├── roleGuard.js             # Role-based access (superadmin/editor)
│   │   ├── errorHandler.js          # Global error handler
│   │   ├── validate.js              # Request validation
│   │   └── upload.js                # Multer file upload config
│   │
│   └── utils/
│       ├── sendEmail.js             # Email helper
│       ├── generateRegId.js         # Registration ID generator
│       └── generateToken.js         # JWT sign + cookie helper
│
├── package.json
└── .env
```

---

## MongoDB Schemas

### Admin

```js
{
  name:            { type: String, required: true },
  email:           { type: String, required: true, unique: true },
  password:        { type: String, required: true },       // bcrypt hashed
  avatar:          { type: String },                       // Cloudinary URL
  role:            { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
  resetToken:      { type: String },                       // Password reset token
  resetTokenExpiry:{ type: Date },
  lastLogin:       { type: Date },
  isActive:        { type: Boolean, default: true },
  createdAt:       { type: Date, default: Date.now }
}
```

### SiteSetting

```js
{
  academyName:   { type: String },
  tagline:       { type: String },
  phone:         [{ type: String }],                       // Multiple phone numbers
  email:         { type: String },
  address:       { type: String },
  whatsappNumber:{ type: String },
  googleMapUrl:  { type: String },
  socialLinks: {
    facebook:    { type: String },
    instagram:   { type: String },
    youtube:     { type: String },
    twitter:     { type: String }
  },
  workingHours:  { type: String },                         // e.g., "Mon-Sat: 6AM-8PM"
  updatedAt:     { type: Date, default: Date.now }
}
```

### Coach

```js
{
  name:           { type: String, required: true },
  sport:          { type: String, required: true },
  photo:          { type: String },                    // Cloudinary URL
  experience:     { type: Number },                    // Years
  certifications: [{ type: String }],
  bio:            { type: String },
  email:          { type: String },
  phone:          { type: String },
  isActive:       { type: Boolean, default: true },
  createdAt:      { type: Date, default: Date.now }
}
```

### Program

```js
{
  name:        { type: String, required: true },
  sport:       { type: String, required: true },
  ageGroup:    { type: String, enum: ['Kids (5-8)', 'Juniors (9-13)', 'Teens (14-17)', 'Adults (18+)'] },
  description: { type: String },
  duration:    { type: String },                       // e.g., "3 months"
  fee:         { type: Number },
  coach:       { type: ObjectId, ref: 'Coach' },
  image:       { type: String },
  isActive:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now }
}
```

### Schedule

```js
{
  program:   { type: ObjectId, ref: 'Program', required: true },
  coach:     { type: ObjectId, ref: 'Coach', required: true },
  day:       { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
  startTime: { type: String },                         // "06:00 AM"
  endTime:   { type: String },                         // "07:30 AM"
  venue:     { type: String },
  isActive:  { type: Boolean, default: true }
}
```

### Registration

```js
{
  registrationId:  { type: String, unique: true },     // Auto-generated (e.g., SA-2026-0001)
  student: {
    firstName:     { type: String, required: true },
    lastName:      { type: String, required: true },
    dateOfBirth:   { type: Date, required: true },
    gender:        { type: String, enum: ['Male','Female','Other'] },
    photo:         { type: String }                    // Cloudinary URL
  },
  parent: {
    name:          { type: String, required: true },
    relationship:  { type: String },
    phone:         { type: String, required: true },
    email:         { type: String, required: true },
    address:       { type: String }
  },
  program:         { type: ObjectId, ref: 'Program', required: true },
  status:          { type: String, enum: ['Pending','Confirmed','Cancelled'], default: 'Pending' },
  createdAt:       { type: Date, default: Date.now }
}
```

### Gallery

```js
{
  title:     { type: String, required: true },
  type:      { type: String, enum: ['photo', 'video'] },
  url:       { type: String, required: true },         // Cloudinary URL or YouTube link
  thumbnail: { type: String },
  category:  { type: String, enum: ['events','training','tournaments','facilities'] },
  createdAt: { type: Date, default: Date.now }
}
```

### Contact

```js
{
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  subject:   { type: String },
  message:   { type: String, required: true },
  isRead:    { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### Blog

```js
{
  title:     { type: String, required: true },
  slug:      { type: String, unique: true },
  content:   { type: String },
  excerpt:   { type: String },
  image:     { type: String },
  author:    { type: String },
  tags:      [{ type: String }],
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### Testimonial

```js
{
  name:      { type: String, required: true },
  role:      { type: String },                         // "Parent" / "Student"
  message:   { type: String, required: true },
  photo:     { type: String },
  rating:    { type: Number, min: 1, max: 5 },
  isActive:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## API Endpoints

> Routes marked with a lock icon are **protected** — they require a valid JWT token.
> Routes marked with a shield icon require **superadmin** role.

### Authentication — `/api/auth`

| Method | Endpoint                    | Description                        |
| ------ | --------------------------- | ---------------------------------- |
| POST   | `/api/auth/login`           | Admin login, returns JWT cookie    |
| POST   | `/api/auth/logout`          | Clear JWT cookie                   |
| GET    | `/api/auth/me`              | Get current logged-in admin        |
| POST   | `/api/auth/forgot-password` | Send password reset email          |
| POST   | `/api/auth/reset-password`  | Reset password with token          |

### Admin Management — `/api/admin`

| Method | Endpoint                | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| GET    | `/api/admin/users`      | Get all admins (superadmin)          |
| POST   | `/api/admin/users`      | Create new admin (superadmin)        |
| PUT    | `/api/admin/users/:id`  | Update admin role/status (superadmin)|
| DELETE | `/api/admin/users/:id`  | Remove admin (superadmin)            |
| PUT    | `/api/admin/profile`    | Update own profile (name, avatar)    |
| PUT    | `/api/admin/password`   | Change own password                  |

### Dashboard — `/api/dashboard`

| Method | Endpoint                      | Description                              |
| ------ | ----------------------------- | ---------------------------------------- |
| GET    | `/api/dashboard/stats`        | Total registrations, coaches, programs   |
| GET    | `/api/dashboard/recent`       | Last 10 registrations                    |
| GET    | `/api/dashboard/chart`        | Monthly registration data (last 6 months)|

### Site Settings — `/api/settings`

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/settings`     | Get site settings (public)    |
| PUT    | `/api/settings`     | Update site settings (admin)  |

### Coaches — `/api/coaches`

| Method | Endpoint            | Access  | Description               |
| ------ | ------------------- | ------- | ------------------------- |
| GET    | `/api/coaches`      | Public  | Get all active coaches    |
| GET    | `/api/coaches/:id`  | Public  | Get coach by ID           |
| POST   | `/api/coaches`      | Admin   | Create a new coach        |
| PUT    | `/api/coaches/:id`  | Admin   | Update coach              |
| DELETE | `/api/coaches/:id`  | Admin   | Delete coach              |

### Programs — `/api/programs`

| Method | Endpoint                      | Access  | Description                    |
| ------ | ----------------------------- | ------- | ------------------------------ |
| GET    | `/api/programs`               | Public  | Get all active programs        |
| GET    | `/api/programs/:id`           | Public  | Get program by ID              |
| GET    | `/api/programs?ageGroup=Kids` | Public  | Filter programs by age group   |
| POST   | `/api/programs`               | Admin   | Create a new program           |
| PUT    | `/api/programs/:id`           | Admin   | Update program                 |
| DELETE | `/api/programs/:id`           | Admin   | Delete program                 |

### Schedule — `/api/schedules`

| Method | Endpoint                        | Access  | Description                |
| ------ | ------------------------------- | ------- | -------------------------- |
| GET    | `/api/schedules`                | Public  | Get full schedule          |
| GET    | `/api/schedules?day=Monday`     | Public  | Filter by day              |
| GET    | `/api/schedules?program=:id`    | Public  | Filter by program          |
| POST   | `/api/schedules`                | Admin   | Create schedule entry      |
| PUT    | `/api/schedules/:id`            | Admin   | Update schedule entry      |
| DELETE | `/api/schedules/:id`            | Admin   | Delete schedule entry      |

### Registration — `/api/registrations`

| Method | Endpoint                          | Access  | Description                  |
| ------ | --------------------------------- | ------- | ---------------------------- |
| POST   | `/api/registrations`              | Public  | Submit new registration      |
| GET    | `/api/registrations`              | Admin   | Get all registrations        |
| GET    | `/api/registrations/:id`          | Admin   | Get registration by ID       |
| PUT    | `/api/registrations/:id`          | Admin   | Update status                |
| GET    | `/api/registrations/export/csv`   | Admin   | Export registrations to CSV  |

### Gallery — `/api/gallery`

| Method | Endpoint                      | Access  | Description               |
| ------ | ----------------------------- | ------- | ------------------------- |
| GET    | `/api/gallery`                | Public  | Get all media             |
| GET    | `/api/gallery?type=photo`     | Public  | Filter by type            |
| GET    | `/api/gallery?category=events`| Public  | Filter by category        |
| POST   | `/api/gallery`                | Admin   | Upload media              |
| POST   | `/api/gallery/bulk`           | Admin   | Bulk upload photos        |
| PUT    | `/api/gallery/:id`            | Admin   | Update media details      |
| DELETE | `/api/gallery/:id`            | Admin   | Delete media              |

### Contact — `/api/contact`

| Method | Endpoint                  | Access  | Description                      |
| ------ | ------------------------- | ------- | -------------------------------- |
| POST   | `/api/contact`            | Public  | Submit contact form              |
| GET    | `/api/contact`            | Admin   | Get all messages                 |
| GET    | `/api/contact/:id`        | Admin   | Get message detail (marks read)  |
| POST   | `/api/contact/:id/reply`  | Admin   | Reply to message via email       |
| DELETE | `/api/contact/:id`        | Admin   | Delete message                   |

### Blog — `/api/blogs`

| Method | Endpoint              | Access  | Description                    |
| ------ | --------------------- | ------- | ------------------------------ |
| GET    | `/api/blogs`          | Public  | Get all published blogs        |
| GET    | `/api/blogs/:slug`    | Public  | Get blog by slug               |
| GET    | `/api/blogs/all`      | Admin   | Get all blogs (incl. drafts)   |
| POST   | `/api/blogs`          | Admin   | Create blog post               |
| PUT    | `/api/blogs/:id`      | Admin   | Update blog post               |
| DELETE | `/api/blogs/:id`      | Admin   | Delete blog post               |

### Testimonials — `/api/testimonials`

| Method | Endpoint                  | Access  | Description               |
| ------ | ------------------------- | ------- | ------------------------- |
| GET    | `/api/testimonials`       | Public  | Get active testimonials   |
| POST   | `/api/testimonials`       | Admin   | Add testimonial           |
| PUT    | `/api/testimonials/:id`   | Admin   | Update testimonial        |
| DELETE | `/api/testimonials/:id`   | Admin   | Delete testimonial        |

---

## Component Structure

```
App.jsx
│
├── AuthContext.Provider                       # Wraps entire app
│
├──── PUBLIC ROUTES (PublicRoutes.jsx) ────────────────────────
│
│   ├── Navbar
│   ├── Routes
│   │   ├── / ─────────────── HomePage
│   │   │                       ├── HeroBanner
│   │   │                       ├── Highlights
│   │   │                       ├── FeaturedPrograms
│   │   │                       ├── Testimonials
│   │   │                       └── UpcomingEvents
│   │   │
│   │   ├── /about ────────── AboutPage
│   │   │                       ├── AcademyHistory
│   │   │                       ├── MissionVision
│   │   │                       ├── Achievements
│   │   │                       └── Facilities
│   │   │
│   │   ├── /coaches ──────── CoachesPage
│   │   │   │                   ├── CoachList
│   │   │   │                   └── CoachCard (×N)
│   │   │   └── /coaches/:id ── CoachDetail
│   │   │
│   │   ├── /programs ─────── ProgramsPage
│   │   │   │                   ├── AgeGroupFilter
│   │   │   │                   ├── ProgramList
│   │   │   │                   └── ProgramCard (×N)
│   │   │   └── /programs/:id ── ProgramDetail
│   │   │
│   │   ├── /schedule ─────── SchedulePage
│   │   │                       ├── ScheduleFilter
│   │   │                       ├── ScheduleTable
│   │   │                       └── TimeSlot (×N)
│   │   │
│   │   ├── /gallery ──────── GalleryPage
│   │   │                       ├── GalleryFilter
│   │   │                       ├── PhotoGrid
│   │   │                       ├── VideoGrid
│   │   │                       └── Lightbox
│   │   │
│   │   ├── /register ─────── RegisterPage
│   │   │                       └── RegistrationForm
│   │   │                           ├── StudentDetails
│   │   │                           ├── ParentDetails
│   │   │                           ├── ProgramSelection
│   │   │                           ├── ReviewSubmit
│   │   │                           └── SuccessMessage
│   │   │
│   │   ├── /contact ──────── ContactPage
│   │   │                       ├── ContactForm
│   │   │                       ├── ContactInfo
│   │   │                       └── GoogleMap
│   │   │
│   │   ├── /blog ─────────── BlogPage
│   │   │   │                   └── BlogCard (×N)
│   │   │   └── /blog/:slug ── BlogPost
│   │   │
│   │   └── * ─────────────── NotFoundPage
│   │
│   ├── WhatsAppButton (floating)
│   ├── ScrollToTop
│   └── Footer
│
├──── ADMIN ROUTES (AdminRoutes.jsx) ─────────────────────────
│
│   ├── /admin/login ─────── LoginPage (no sidebar)
│   │
│   └── ProtectedRoute                        # JWT auth guard
│       └── AdminLayout
│           ├── AdminSidebar
│           ├── AdminTopbar
│           └── Content Area
│               │
│               ├── /admin/dashboard ────── DashboardPage
│               │                             ├── DashboardStats
│               │                             │   └── StatCard (×4)
│               │                             ├── RecentRegistrations
│               │                             └── RegistrationChart
│               │
│               ├── /admin/coaches ─────── CoachesPage
│               │   │                        └── CoachTable
│               │   ├── /admin/coaches/new ── CoachFormPage
│               │   │                          └── CoachForm
│               │   └── /admin/coaches/:id/edit ── CoachFormPage
│               │                                    └── CoachForm
│               │
│               ├── /admin/programs ────── ProgramsPage
│               │   │                        └── ProgramTable
│               │   ├── /admin/programs/new ── ProgramFormPage
│               │   │                           └── ProgramForm
│               │   └── /admin/programs/:id/edit ── ProgramFormPage
│               │                                     └── ProgramForm
│               │
│               ├── /admin/schedule ────── SchedulePage
│               │                            ├── ScheduleGrid
│               │                            └── ScheduleEntryForm (modal)
│               │
│               ├── /admin/registrations ── RegistrationsPage
│               │   │                         ├── RegistrationTable
│               │   │                         └── ExportCSV
│               │   └── /admin/registrations/:id ── RegistrationDetailPage
│               │                                     └── RegistrationDetail
│               │
│               ├── /admin/gallery ─────── GalleryPage
│               │                            ├── GalleryGrid
│               │                            └── MediaUploadForm
│               │
│               ├── /admin/messages ────── MessagesPage
│               │   │                        └── MessageTable
│               │   └── /admin/messages/:id ── MessageDetailPage
│               │                                └── MessageDetail
│               │
│               ├── /admin/blogs ──────── BlogsPage
│               │   │                       └── BlogTable
│               │   ├── /admin/blogs/new ── BlogFormPage
│               │   │                         └── BlogEditor
│               │   └── /admin/blogs/:id/edit ── BlogFormPage
│               │                                  └── BlogEditor
│               │
│               ├── /admin/testimonials ── TestimonialsPage
│               │                            ├── TestimonialTable
│               │                            └── TestimonialForm (modal)
│               │
│               └── /admin/settings ───── SettingsPage
│                                            ├── ProfileSettings
│                                            ├── ChangePassword
│                                            ├── SiteSettings
│                                            └── ManageAdmins
```

---

## Deployment Plan

```
┌──────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT OVERVIEW                     │
├──────────────────┬──────────────────┬────────────────────────┤
│    FRONTEND      │     BACKEND      │       DATABASE         │
│                  │                  │                        │
│   Vercel         │   Render         │   MongoDB Atlas        │
│                  │                  │                        │
│ • React build    │ • Node.js app    │ • Cloud-hosted cluster │
│ • Auto deploy    │ • Auto deploy    │ • Auto backups         │
│   from GitHub    │   from GitHub    │ • IP whitelisting      │
│ • CDN + SSL      │ • SSL included   │ • Free tier (M0)       │
│ • Custom domain  │ • Custom domain  │   or dedicated (M10+)  │
│                  │                  │                        │
│ Build command:   │ Start command:   │ Connection:            │
│ npm run build    │ node src/        │ mongodb+srv://         │
│                  │   server.js      │   <credentials>@       │
│ Output: /build   │                  │   cluster.mongodb.net  │
│                  │ Port: 5000       │                        │
└──────────────────┴──────────────────┴────────────────────────┘

Media Storage: Cloudinary (free tier — 25GB storage, 25GB bandwidth/month)
```

### Deployment Steps

**Frontend (Vercel)**
1. Push `client/` to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Add environment variables (`REACT_APP_API_URL`, `REACT_APP_GOOGLE_MAPS_KEY`)
6. Deploy — auto-deploys on every push to `main`

**Backend (Render)**
1. Push `server/` to GitHub
2. Create a new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `node src/server.js`
5. Add environment variables (see below)
6. Deploy — auto-deploys on every push to `main`

**Database (MongoDB Atlas)**
1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create database user with read/write access
3. Whitelist Render's outbound IPs (or allow all with `0.0.0.0/0`)
4. Copy connection string to backend `.env`

---

## Environment Variables

### Client (`client/.env`)

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
REACT_APP_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### Server (`server/.env`)

```env
PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sports-academy

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@sportsacademy.com

# Frontend URL (for CORS and email links)
CLIENT_URL=https://yourdomain.com

# Default Super Admin (seeded on first run)
SUPERADMIN_NAME=Super Admin
SUPERADMIN_EMAIL=admin@sportsacademy.com
SUPERADMIN_PASSWORD=change_me_immediately
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sports-academy.git
cd sports-academy

# Setup backend first (seeds the admin user)
cd server
npm install
cp .env.example .env        # Fill in values (DB, JWT, Cloudinary, Email)
npm run seed                 # Creates default super admin from .env credentials
npm run dev                  # Runs on http://localhost:5000

# Setup frontend (in a new terminal)
cd client
npm install
cp .env.example .env        # Fill in values (API URL, Maps key)
npm start                    # Runs on http://localhost:3000
```

> After seeding, log in at `http://localhost:3000/admin/login` with the
> `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD` from your `.env` file.
> **Change the password immediately** from Admin Settings.

### Scripts

| Location  | Command          | Description                          |
| --------- | ---------------- | ------------------------------------ |
| `client/` | `npm start`      | Start dev server                     |
| `client/` | `npm run build`  | Production build                     |
| `server/` | `npm run dev`    | Start with nodemon (dev)             |
| `server/` | `npm start`      | Start production server              |
| `server/` | `npm run seed`   | Seed default super admin to database |

---

## Future Enhancements

> Admin Panel and JWT Authentication are already included in Phase 1 (this build).

| Phase   | Feature                                | Description                                              |
| ------- | -------------------------------------- | -------------------------------------------------------- |
| Phase 2 | Online Payment                         | Razorpay/Stripe integration for fee collection            |
| Phase 2 | Fee Management                         | Track payments per student from admin panel               |
| Phase 2 | Email Templates                        | Customizable email templates for notifications            |
| Phase 3 | Student / Parent Portal                | Login area to view schedule, attendance, fee history      |
| Phase 3 | Attendance Tracking                    | Coach-managed attendance per batch from admin panel       |
| Phase 3 | Push Notifications                     | Notify students about schedule changes and events         |
| Phase 3 | Audit Log                              | Track all admin actions (who changed what, when)          |
| Phase 4 | Mobile App (React Native)              | Cross-platform mobile app for students and parents        |
| Phase 4 | Performance Analytics                  | Track and display student performance metrics             |
| Phase 4 | Multi-language Support (i18n)          | Tamil, Hindi, English language switch                     |
| Phase 5 | Live Class / Video Integration         | Zoom or custom video integration for remote coaching      |
| Phase 5 | AI-based Recommendations               | Suggest programs based on student age and interests       |

---

## License

This project is proprietary. All rights reserved.

---

> **Built with purpose. Designed for champions.**
