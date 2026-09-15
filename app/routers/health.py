from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health", status_code=200)
@router.head("/health", status_code=200)
async def health_check():
    return {
        "status": "ok",
        "app": "FinTax India Backend"
    }
