from enum import Enum

from pydantic import BaseModel


class GenerationStatus(str, Enum):
    waiting = "waiting"
    processing = "processing"
    completed = "completed"
    error = "error"


class GenerationRequest(BaseModel):
    prompt: str


class GenerationResult(BaseModel):
    id: str
    status: GenerationStatus
    image_url: str = None
