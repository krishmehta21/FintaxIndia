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
    limit: int = Query(6, ge=1, le=50)
):
    try:
        query = supabase.table("blog_posts").select("id, title, slug, excerpt, cover_image_url, category, status, view_count, published_at, created_at, updated_at, author")
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

@router.get('/featured/top', response_model=List[BlogPostListResponse])
@ttl_cache(ttl_seconds=300)
def get_featured_blog_posts():
    try:
        response = supabase.table('blog_posts').select('id, title, slug, excerpt, cover_image_url, category, status, view_count, published_at, created_at, updated_at, author').eq('status', 'published').order('view_count', desc=True).limit(3).execute()
        return response.data
    except Exception as e:
        print(f'Supabase connection failed: {e}')
        raise HTTPException(status_code=500, detail='Internal server error')

from pydantic import BaseModel
class VoteRequest(BaseModel):
    is_helpful: bool

@router.post('/{slug}/view')
def increment_view_count(slug: str):
    try:
        # Instead of RLS or complex server logic for now, we rely on the frontend to debounce.
        # But to increment without knowing the current value, we must fetch and increment, or use RPC.
        # Since we don't want to create an RPC just for this, we fetch then update.
        # (A slight race condition is fine for a view counter on a low traffic site)
        post = supabase.table('blog_posts').select('id, view_count').eq('slug', slug).execute()
        if not post.data:
            raise HTTPException(status_code=404, detail='Not found')
        current = post.data[0].get('view_count', 0)
        supabase.table('blog_posts').update({'view_count': current + 1}).eq('slug', slug).execute()
        return {'success': True}
    except HTTPException:
        raise
    except Exception as e:
        print(f'View increment failed: {e}')
        raise HTTPException(status_code=500, detail='Internal server error')

@router.post('/{slug}/vote')
def vote_helpful(slug: str, vote: VoteRequest):
    try:
        post = supabase.table('blog_posts').select('id, helpful_count, not_helpful_count').eq('slug', slug).execute()
        if not post.data:
            raise HTTPException(status_code=404, detail='Not found')
        
        if vote.is_helpful:
            current = post.data[0].get('helpful_count', 0)
            supabase.table('blog_posts').update({'helpful_count': current + 1}).eq('slug', slug).execute()
        else:
            current = post.data[0].get('not_helpful_count', 0)
            supabase.table('blog_posts').update({'not_helpful_count': current + 1}).eq('slug', slug).execute()
            
        return {'success': True}
    except HTTPException:
        raise
    except Exception as e:
        print(f'Vote failed: {e}')
        raise HTTPException(status_code=500, detail='Internal server error')

