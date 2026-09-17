import time
from functools import wraps

def ttl_cache(ttl_seconds: int = 60):
    cache = {}
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            key = str(args) + str(kwargs)
            if key in cache:
                result, timestamp = cache[key]
                if time.time() - timestamp < ttl_seconds:
                    return result
            result = func(*args, **kwargs)
            cache[key] = (result, time.time())
            return result
        return wrapper
    return decorator
