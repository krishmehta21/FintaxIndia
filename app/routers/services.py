from typing import List
from fastapi import APIRouter, HTTPException, status
from app.db import supabase
from app.models.services import ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceResponse])
async def list_published_services():
    response = supabase.table("services").select("*").eq("is_published", True).order("display_order").execute()
    return response.data

@router.get("/{slug}", response_model=ServiceResponse)
async def get_service_by_slug(slug: str):
    response = supabase.table("services").select("*").eq("slug", slug).eq("is_published", True).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with slug '{slug}' not found"
        )
    return response.data[0]
