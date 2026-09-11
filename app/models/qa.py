from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, ConfigDict, Field

class QAStatus(str, Enum):
    PENDING = "pending"
    PUBLISHED = "published"
    REJECTED = "rejected"

class QASubmissionCreate(BaseModel):
    category: str = Field(..., min_length=2, max_length=100)
    question: str = Field(..., min_length=5, max_length=1000)
    email: Optional[EmailStr] = None

class QAAdminCreate(BaseModel):
    category: str = Field(..., min_length=2, max_length=100)
    question: str = Field(..., min_length=5, max_length=1000)
    answer: str = Field(..., min_length=2, max_length=5000)
    slug: str = Field(..., min_length=2, max_length=255)
    status: QAStatus = QAStatus.PUBLISHED
    submitted_by_email: Optional[EmailStr] = None

class QAAdminUpdate(BaseModel):
    category: Optional[str] = Field(None, min_length=2, max_length=100)
    question: Optional[str] = Field(None, min_length=5, max_length=1000)
    answer: Optional[str] = Field(None, min_length=2, max_length=5000)
    slug: Optional[str] = Field(None, min_length=2, max_length=255)
    status: Optional[QAStatus] = None
    submitted_by_email: Optional[EmailStr] = None

class QAResponse(BaseModel):
    id: UUID
    category: str
    question: str
    answer: Optional[str] = None
    slug: Optional[str] = None
    status: QAStatus
    submitted_by_email: Optional[str] = None
    created_at: datetime
    published_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
