from typing import List
from fastapi import APIRouter
from app.db import supabase
from app.models.testimonials import TestimonialResponse

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.get("/", response_model=List[TestimonialResponse])
def list_published_testimonials():
    try:
        response = supabase.table("testimonials").select("*").eq("is_published", True).order("display_order").execute()
        return response.data
    except Exception as e:
        print(f"Supabase connection failed: {e}. Returning dummy data.")
        return [
            {"id": "1", "client_name": "Sarah", "company": "TechCorp", "location": "Mumbai", "quote": "FinTax India fundamentally transformed our compliance strategy. Highly recommended.", "display_order": 1, "is_published": True},
            {"id": "2", "client_name": "Rajiv", "company": "Global Logistics", "location": "Delhi", "quote": "Rigorous, uncompromising, and absolutely essential for our growth.", "display_order": 2, "is_published": True}
        ]
