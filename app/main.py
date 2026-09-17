from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from app.config import settings
from app.routers import health, services, qa, testimonials, contact, admin

app = FastAPI(
    title="FinTax India API",
    description="Chartered Accountant consultancy backend API powered by FastAPI and Supabase.",
    version="1.0.0"
)

# CORS configuration
origins = [
    origin.strip().rstrip('/') 
    for origin in settings.FRONTEND_ORIGIN.split(",") 
    if origin.strip()
]

app.add_middleware(GZipMiddleware, minimum_size=1000)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if settings.FRONTEND_ORIGIN != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(services.router)
app.include_router(qa.router)
app.include_router(testimonials.router)
app.include_router(contact.router)
app.include_router(admin.router)
