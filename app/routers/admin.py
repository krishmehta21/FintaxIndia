from datetime import datetime, timezone
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.dependencies import get_current_admin
from app.db import supabase
from app.models.services import ServiceCreate, ServiceUpdate, ServiceResponse
from app.models.qa import QAAdminCreate, QAAdminUpdate, QAResponse
from app.models.testimonials import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from app.models.contact import ContactSubmissionResponse

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(get_current_admin)])

# --- Services Admin Endpoints ---

@router.get("/services", response_model=List[ServiceResponse])
def admin_list_services():
    response = supabase.table("services").select("*").order("display_order").execute()
    return response.data

@router.post("/services", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def admin_create_service(service_in: ServiceCreate):
    data = service_in.model_dump(mode="json")
    response = supabase.table("services").insert(data).execute()
    return response.data[0]

@router.put("/services/{service_id}", response_model=ServiceResponse)
def admin_update_service(service_id: UUID, service_in: ServiceUpdate):
    data = service_in.model_dump(mode="json", exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    response = supabase.table("services").update(data).eq("id", str(service_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Service not found")
    return response.data[0]

@router.delete("/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_service(service_id: UUID):
    response = supabase.table("services").delete().eq("id", str(service_id)).execute()
    return None


# --- Q&A Admin Endpoints ---

@router.get("/qa", response_model=List[QAResponse])
def admin_list_qa(
    status_filter: Optional[str] = Query(None, alias="status"),
    category_filter: Optional[str] = Query(None, alias="category")
):
    query = supabase.table("qa_items").select("*")
    if status_filter:
        query = query.eq("status", status_filter)
    if category_filter:
        query = query.eq("category", category_filter)
    response = query.order("created_at", desc=True).execute()
    return response.data

@router.patch("/qa/{qa_id}", response_model=QAResponse)
def admin_patch_qa(qa_id: UUID, qa_in: QAAdminUpdate):
    data = qa_in.model_dump(mode="json", exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    # Automatically set published_at when status becomes 'published'
    if data.get("status") == "published":
        data["published_at"] = datetime.now(timezone.utc).isoformat()

    response = supabase.table("qa_items").update(data).eq("id", str(qa_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Q&A item not found")
    return response.data[0]


# --- Testimonials Admin Endpoints ---

@router.get("/testimonials", response_model=List[TestimonialResponse])
def admin_list_testimonials():
    response = supabase.table("testimonials").select("*").order("display_order").execute()
    return response.data

@router.post("/testimonials", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def admin_create_testimonial(testimonial_in: TestimonialCreate):
    data = testimonial_in.model_dump(mode="json")
    response = supabase.table("testimonials").insert(data).execute()
    return response.data[0]

@router.put("/testimonials/{testimonial_id}", response_model=TestimonialResponse)
def admin_update_testimonial(testimonial_id: UUID, testimonial_in: TestimonialUpdate):
    data = testimonial_in.model_dump(mode="json", exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    response = supabase.table("testimonials").update(data).eq("id", str(testimonial_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return response.data[0]

@router.delete("/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_testimonial(testimonial_id: UUID):
    supabase.table("testimonials").delete().eq("id", str(testimonial_id)).execute()
    return None


# --- Contact Submissions Admin Endpoints (Read-only listing) ---

@router.get("/contact-submissions", response_model=List[ContactSubmissionResponse])
def admin_list_contact_submissions():
    response = supabase.table("contact_submissions").select("*").order("created_at", desc=True).execute()
    return response.data
