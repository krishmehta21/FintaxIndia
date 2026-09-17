from typing import List, Optional
from fastapi import APIRouter, status, Query
from app.db import supabase
from app.models.qa import QASubmissionCreate, QAResponse
from app.cache import ttl_cache

router = APIRouter(prefix="/qa", tags=["Q&A"])

@router.get("", response_model=List[QAResponse])
@ttl_cache(ttl_seconds=300)
def list_published_qa(category: Optional[str] = Query(None, description="Filter Q&A by category")):
    query = supabase.table("qa_items").select("*").eq("status", "published")
    if category:
        query = query.eq("category", category)
    response = query.order("created_at", desc=True).execute()
    return response.data

@router.post("/submit", status_code=status.HTTP_201_CREATED)
def submit_question(submission: QASubmissionCreate):
    data = {
        "category": submission.category,
        "question": submission.question,
        "submitted_by_email": str(submission.email) if submission.email else None,
        "status": "pending"  # Always forced to pending
    }
    response = supabase.table("qa_items").insert(data).execute()
    return {"message": "Question submitted successfully for review", "data": response.data}
