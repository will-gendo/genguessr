import random
import string

from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from api.schema import game as Game

router = APIRouter(
    prefix="/game",
    tags=["game"],
    responses={404: {"description": "Not found"}},
)


@router.get("/new", response_model=Game.NewGame)
async def new_game():
    game_id = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))

    return RedirectResponse(f"http://localhost:3000/game?id={game_id}")
