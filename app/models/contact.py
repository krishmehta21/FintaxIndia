from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, ConfigDict, Field

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=250)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    service_interest: Optional[str] = Field(None, max_length=250)
    message: str = Field(..., min_length=5, max_length=3000)

class ContactSubmissionResponse(ContactSubmissionCreate):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
