from supabase import create_client, Client
from app.config import settings

def get_supabase_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_PUBLISHABLE_KEY)

def get_supabase_admin_client() -> Client:
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SECRET_KEY)

supabase: Client = get_supabase_client()
