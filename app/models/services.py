from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

class ServiceBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    slug: str = Field(..., min_length=2, max_length=255)
    short_description: str = Field(..., min_length=5, max_length=500)
    full_description: str = Field(..., min_length=10, max_length=10000)
    icon_name: str = Field(default="briefcase", max_length=100)
    display_order: int = Field(default=0, ge=0)
    is_published: bool = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    slug: Optional[str] = Field(None, min_length=2, max_length=255)
    short_description: Optional[str] = Field(None, min_length=5, max_length=500)
    full_description: Optional[str] = Field(None, min_length=10, max_length=10000)
    icon_name: Optional[str] = Field(None, max_length=100)
    display_order: Optional[int] = Field(None, ge=0)
    is_published: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
