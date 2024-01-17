from pydantic import BaseModel


class NewGame(BaseModel):
    id: str
