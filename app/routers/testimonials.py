from typing import List
from fastapi import APIRouter
from app.db import supabase
from app.models.testimonials import TestimonialResponse

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.get("", response_model=List[TestimonialResponse])
async def list_published_testimonials():
    response = supabase.table("testimonials").select("*").eq("is_published", True).order("display_order").execute()
    return response.data
