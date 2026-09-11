from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SUPABASE_URL: str = "https://your-supabase-project.supabase.co"
    SUPABASE_PUBLISHABLE_KEY: str = ""
    SUPABASE_SECRET_KEY: str = ""
    FRONTEND_ORIGIN: str = "http://localhost:3000"
    ENVIRONMENT: str = "development"
    
    # Resend email notification settings
    RESEND_API_KEY: Optional[str] = None
    ADMIN_NOTIFY_EMAIL: str = "admin@fintaxindia.com"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
