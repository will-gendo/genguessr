from fastapi import APIRouter

from api.lib.stablehorde import generate_async, generate_status
from api.schema.image import GenerationRequest, GenerationResult

router = APIRouter(
    prefix="/images",
    tags=["images"],
    responses={404: {"description": "Not found"}},
)


@router.post("/generate", response_model=GenerationResult)
async def generate(request: GenerationRequest):
    id = await generate_async(request.prompt)

    return {"id": id, "status": "waiting"}


@router.get("/result/{id}", response_model=GenerationResult)
async def result(id: str):
    data = await generate_status(id)

    # NOTE: IF more than 10 request per min are made, you will get a 429 Error: TOO MANY REQUESTS { "message": "10 per 1 minute" }

    result = {"id": id, "status": "waiting"}

    if data["faulted"]:
        result["status"] = "error"
        return result

    if data["finished"] and len(data["generations"]) == 1:
        result["status"] = "completed"

        # We're only ever sending n = 1 (one image)
        generation = data["generations"][0]

        result["image_url"] = generation["img"]
        return result

    if data["processing"]:
        result["status"] = "processing"
        return result

    if data["waiting"]:
        return result

    return result
