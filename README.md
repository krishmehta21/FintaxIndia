# FinTax India - FastAPI Backend

A Chartered Accountant consultancy website backend API built with FastAPI, Pydantic v2, and Supabase.

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your environment variables in `.env`:
   - `SUPABASE_URL`: Your Supabase Project bare URL (e.g. `https://dlqxzjzjinqgzogbiiaa.supabase.co`, no trailing `/rest/v1/`)
   - `SUPABASE_PUBLISHABLE_KEY`: Public/anon publishable key (for client reads/writes protected by RLS)
   - `SUPABASE_SECRET_KEY`: Service role secret key (used only in backend admin operations)
   - `FRONTEND_ORIGIN`: Frontend origin allowed by CORS (e.g. `http://localhost:3000`)
   - `RESEND_API_KEY`: API key for Resend email service (optional; if not set, email notifications will be logged to stdout)
   - `ADMIN_NOTIFY_EMAIL`: Target email address to receive contact form notifications

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run local server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

## Database Migration

Run the migration script located at `supabase/migrations/20260912000000_init_schema.sql` on your Supabase SQL editor or via Supabase CLI.

---

## API Endpoints Documentation

### Health Check
- **`GET /health`**
  - **Auth**: None
  - **Description**: Returns 200 OK health status.
  - **Response**: `{"status": "ok", "app": "FinTax India Backend"}`

---

### Public Endpoints (No Auth Required)

- **`GET /services`**
  - **Description**: Retrieves all published services ordered by `display_order`.
  - **Response**: `List[ServiceResponse]`

- **`GET /services/{slug}`**
  - **Description**: Retrieves single published service details matching `{slug}`.
  - **Response**: `ServiceResponse` (404 if not found).

- **`GET /qa`**
  - **Query Params**: `?category=Income%20Tax` (optional)
  - **Description**: Retrieves published Q&A items. Filterable by category.
  - **Response**: `List[QAResponse]`

- **`POST /qa/submit`**
  - **Body**: `{ "category": "GST", "question": "What is the threshold for GST registration?", "email": "user@example.com" }`
  - **Description**: Submits a user question for review. Strictly forces `status = "pending"`.
  - **Response**: `201 Created`

- **`GET /testimonials`**
  - **Description**: Retrieves published client testimonials ordered by `display_order`.
  - **Response**: `List[TestimonialResponse]`

- **`POST /contact`**
  - **Body**: `{ "name": "John Doe", "email": "john@example.com", "phone": "+919876543210", "service_interest": "ITR Filing", "message": "Need help filing ITR." }`
  - **Description**: Submits contact form message. Stores submission in Supabase `contact_submissions` table and sends an email notification via Resend to `ADMIN_NOTIFY_EMAIL`.
  - **Response**: `201 Created`

---

### Admin Endpoints (Requires `Authorization: Bearer <Supabase_JWT>`)

All admin routes return `401 Unauthorized` without a valid Supabase JWT Bearer token.

#### Services Admin
- **`GET /admin/services`**: List all services (published and unpublished).
- **`POST /admin/services`**: Create a new service.
- **`PUT /admin/services/{id}`**: Update an existing service.
- **`DELETE /admin/services/{id}`**: Delete a service.

#### Q&A Admin
- **`GET /admin/qa`**: List all Q&A items across all statuses (`pending`, `published`, `rejected`). Optional filters `?status=pending&category=GST`.
- **`PATCH /admin/qa/{id}`**: Partial update of Q&A item (e.g. updating answer and status). Automatically sets `published_at` to the current timestamp when `status` transitions to `'published'`.

#### Testimonials Admin
- **`GET /admin/testimonials`**: List all testimonials.
- **`POST /admin/testimonials`**: Create a new testimonial.
- **`PUT /admin/testimonials/{id}`**: Update a testimonial.
- **`DELETE /admin/testimonials/{id}`**: Delete a testimonial.

#### Contact Submissions Admin
- **`GET /admin/contact-submissions`**: Read-only listing of all user contact submissions sorted by creation date.
