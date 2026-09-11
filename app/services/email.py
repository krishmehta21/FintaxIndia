import logging
import resend
from app.config import settings

logger = logging.getLogger("uvicorn.error")

def send_contact_notification_email(submission: dict) -> bool:
    name = submission.get("name", "N/A")
    email = submission.get("email", "N/A")
    phone = submission.get("phone") or "Not provided"
    service_interest = submission.get("service_interest") or "General Inquiry"
    message = submission.get("message", "N/A")

    subject = f"New Contact Submission from {name} - FinTax India"
    html_content = f"""
    <h2>New Inquiry Received on FinTax India</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone:</strong> {phone}</p>
    <p><strong>Service Interest:</strong> {service_interest}</p>
    <br/>
    <p><strong>Message:</strong></p>
    <blockquote style="background: #f9f9f9; padding: 12px; border-left: 4px solid #10b981;">
        {message}
    </blockquote>
    """

    if not settings.RESEND_API_KEY:
        logger.info(f"[STUB EMAIL] RESEND_API_KEY not configured. Would send email to '{settings.ADMIN_NOTIFY_EMAIL}':\nSubject: {subject}\n{html_content}")
        return True

    try:
        resend.api_key = settings.RESEND_API_KEY
        params = {
            "from": "FinTax India <onboarding@resend.dev>",
            "to": [settings.ADMIN_NOTIFY_EMAIL],
            "subject": subject,
            "html": html_content,
        }
        email_res = resend.Emails.send(params)
        logger.info(f"Successfully sent Resend notification email to {settings.ADMIN_NOTIFY_EMAIL}: {email_res}")
        return True
    except Exception as e:
        logger.error(f"Failed to send Resend email notification: {str(e)}")
        return False
