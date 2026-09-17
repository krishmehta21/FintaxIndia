from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.db import supabase
from app.models.blog import BlogPostResponse, BlogPostListResponse
from app.cache import ttl_cache

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("/", response_model=List[BlogPostListResponse])
@ttl_cache(ttl_seconds=300)
def list_published_blog_posts(
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50)
):
    try:
        query = supabase.table("blog_posts").select("id, title, slug, excerpt, cover_image_url, category, status, published_at, created_at, updated_at, author")
        query = query.eq("status", "published")
        if category:
            query = query.eq("category", category)
            
        # Pagination
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit - 1
        query = query.range(start_idx, end_idx)
        
        # Sort by published_at DESC
        response = query.order("published_at", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Supabase connection failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{slug}", response_model=BlogPostResponse)
@ttl_cache(ttl_seconds=300)
def get_published_blog_post(slug: str):
    try:
        response = supabase.table("blog_posts").select("*").eq("slug", slug).eq("status", "published").execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Blog post not found or not published")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        print(f"Supabase connection failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
