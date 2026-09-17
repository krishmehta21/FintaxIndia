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

    if data.get("status") == "published":
        data["published_at"] = datetime.now(timezone.utc).isoformat()

    response = supabase.table("qa_items").update(data).eq("id", str(qa_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Q&A item not found")
    return response.data[0]

@router.post("/qa", response_model=QAResponse, status_code=status.HTTP_201_CREATED)
def admin_create_qa(qa_in: QAAdminCreate):
    data = qa_in.model_dump(mode="json")
    if data.get("status") == "published":
        data["published_at"] = datetime.now(timezone.utc).isoformat()
    response = supabase.table("qa_items").insert(data).execute()
    return response.data[0]

@router.delete("/qa/{qa_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_qa(qa_id: UUID):
    supabase.table("qa_items").delete().eq("id", str(qa_id)).execute()
    return None


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

# --- Blog Admin Endpoints ---
from app.models.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse, BlogPostListResponse
import uuid

@router.get("/blog", response_model=List[BlogPostListResponse])
def admin_list_blog_posts():
    response = supabase.table("blog_posts").select("id, title, slug, excerpt, cover_image_url, category, status, is_spotlighted, spotlight_rank, published_at, created_at, updated_at, author").order("created_at", desc=True).execute()
    return response.data

@router.post("/blog", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def admin_create_blog_post(post_in: BlogPostCreate):
    data = post_in.model_dump(mode="json")
    
    # Handle slug collision
    slug = data["slug"]
    existing = supabase.table("blog_posts").select("id").eq("slug", slug).execute()
    if existing.data:
        data["slug"] = f"{slug}-{str(uuid.uuid4())[:8]}"
        
    if data.get("status") == "published":
        data["published_at"] = datetime.now(timezone.utc).isoformat()
        
    response = supabase.table("blog_posts").insert(data).execute()
    return response.data[0]

@router.put("/blog/{post_id}", response_model=BlogPostResponse)
def admin_update_blog_post(post_id: UUID, post_in: BlogPostUpdate):
    data = post_in.model_dump(mode="json", exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    # Fetch existing to check published_at and handle slug collision
    existing_post = supabase.table("blog_posts").select("*").eq("id", str(post_id)).execute()
    if not existing_post.data:
        raise HTTPException(status_code=404, detail="Blog post not found")
        
    if "slug" in data and data["slug"] != existing_post.data[0]["slug"]:
        slug_check = supabase.table("blog_posts").select("id").eq("slug", data["slug"]).execute()
        if slug_check.data:
            data["slug"] = f"{data["slug"]}-{str(uuid.uuid4())[:8]}"

    if data.get("status") == "published":
        # Set published_at only if it wasn"t previously published (keep original date)
        if not existing_post.data[0].get("published_at"):
            data["published_at"] = datetime.now(timezone.utc).isoformat()
    
    data["updated_at"] = datetime.now(timezone.utc).isoformat()

    response = supabase.table("blog_posts").update(data).eq("id", str(post_id)).execute()
    return response.data[0]

@router.delete("/blog/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_blog_post(post_id: UUID):
    supabase.table("blog_posts").delete().eq("id", str(post_id)).execute()
    return None

from fastapi import UploadFile, File
import mimetypes

MAX_IMAGE_SIZE = 5 * 1024 * 1024 # 5 MB
ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"]

@router.post("/blog/upload-image")
async def admin_upload_blog_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}. Only JPEG, PNG, and WebP are allowed.")
        
    contents = await file.read()
    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")
        
    file_ext = mimetypes.guess_extension(file.content_type) or ".jpg"
    file_name = f"{str(uuid.uuid4())}{file_ext}"
    
    try:
        # Upload to Supabase Storage
        # supabase-py storage API expects bytes
        res = supabase.storage.from_("blog-images").upload(
            file_name,
            contents,
            file_options={"content-type": file.content_type}
        )
        # Construct public URL
        public_url = supabase.storage.from_("blog-images").get_public_url(file_name)
        return {"url": public_url}
    except Exception as e:
        print(f"Upload failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload image")
