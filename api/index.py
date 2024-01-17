from fastapi import FastAPI

from api.routers import game, images

app = FastAPI()

app.include_router(images.router)
app.include_router(game.router)
