from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

class BlogCategory(str, Enum):
    GST_UPDATES = "GST Updates"
    ITR_FILING = "ITR Filing"
    TAX_SAVING_TIPS = "Tax Saving Tips"
    COMPLIANCE_ALERTS = "Compliance Alerts"
    CORPORATE_ADVISORY = "Corporate Advisory"
    GENERAL_FINANCE = "General Finance"

class BlogStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"

class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    slug: str = Field(..., min_length=2, max_length=255)
    excerpt: str = Field(..., min_length=10, max_length=1000)
    content: str = Field(..., min_length=10)
    cover_image_url: Optional[str] = None
    category: BlogCategory
    status: BlogStatus = BlogStatus.DRAFT
    is_spotlighted: bool = False
    spotlight_rank: Optional[int] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    slug: Optional[str] = Field(None, min_length=2, max_length=255)
    excerpt: Optional[str] = Field(None, min_length=10, max_length=1000)
    content: Optional[str] = Field(None, min_length=10)
    cover_image_url: Optional[str] = None
    category: Optional[BlogCategory] = None
    status: Optional[BlogStatus] = None
    is_spotlighted: Optional[bool] = None
    spotlight_rank: Optional[int] = None

class BlogPostResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image_url: Optional[str]
    category: BlogCategory
    status: BlogStatus
    view_count: int = 0
    helpful_count: int = 0
    not_helpful_count: int = 0
    is_spotlighted: bool = False
    spotlight_rank: Optional[int] = None
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    author: str

    model_config = ConfigDict(from_attributes=True)

class BlogPostListResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: str
    cover_image_url: Optional[str]
    category: BlogCategory
    status: BlogStatus
    view_count: int = 0
    is_spotlighted: bool = False
    spotlight_rank: Optional[int] = None
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    author: str

    model_config = ConfigDict(from_attributes=True)
