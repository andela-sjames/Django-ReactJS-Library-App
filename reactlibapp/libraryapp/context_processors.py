
import os

def set_environment(request):
    return {
        'environment': os.getenv('NODE_ENV') if os.getenv('NODE_ENV') else 'development'
    }
