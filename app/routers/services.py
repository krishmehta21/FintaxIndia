from typing import List
from fastapi import APIRouter, HTTPException, status
from app.db import supabase
from app.models.services import ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("/", response_model=List[ServiceResponse])
def list_published_services():
    try:
        response = supabase.table("services").select("*").eq("is_published", True).order("display_order").execute()
        return response.data
    except Exception as e:
        print(f"Supabase connection failed: {e}. Returning dummy data.")
        return [
            {"id": "1", "title": "Corporate Tax", "description": "Rigorous tax planning for enterprises.", "icon": "briefcase", "display_order": 1, "is_published": True},
            {"id": "2", "title": "Audit & Assurance", "description": "Uncompromising financial audits.", "icon": "shield", "display_order": 2, "is_published": True},
            {"id": "3", "title": "Advisory", "description": "Visionary strategy for growth.", "icon": "line-chart", "display_order": 3, "is_published": True}
        ]

@router.get("/{slug}", response_model=ServiceResponse)
async def get_service_by_slug(slug: str):
    response = supabase.table("services").select("*").eq("slug", slug).eq("is_published", True).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with slug '{slug}' not found"
        )
    return response.data[0]
