from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

class TestimonialBase(BaseModel):
    quote: str = Field(..., min_length=10, max_length=1500)
    attribution_label: str = Field(..., min_length=2, max_length=255)
    is_published: bool = True
    display_order: int = Field(default=0, ge=0)

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    quote: Optional[str] = Field(None, min_length=10, max_length=1500)
    attribution_label: Optional[str] = Field(None, min_length=2, max_length=255)
    is_published: Optional[bool] = None
    display_order: Optional[int] = Field(None, ge=0)

class TestimonialResponse(TestimonialBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
