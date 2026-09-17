from fastapi import APIRouter, status
from app.db import supabase
from app.models.contact import ContactSubmissionCreate
from app.services.email import send_contact_notification_email

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", status_code=status.HTTP_201_CREATED)
def submit_contact_form(contact_in: ContactSubmissionCreate):
    data = contact_in.model_dump(mode="json")
    response = supabase.table("contact_submissions").insert(data).execute()
    
    # Trigger Resend email notification (stubs logged if RESEND_API_KEY is not set)
    send_contact_notification_email(data)

    return {
        "message": "Contact submission received successfully",
        "data": response.data
    }
