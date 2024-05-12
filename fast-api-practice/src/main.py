from fastapi import FastAPI
from enum import Enum

# ==============================================
# Basics
# ==============================================


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "FastAPI Coding Session"}


# ==============================================
# Path parameters
# ==============================================

users = [
    {"name": "John Doe", "age": 25},
    {"name": "Jane Doe", "age": 24},
    {"name": "John Smith", "age": 30},
    {"name": "Jane Smith", "age": 29},
    {"name": "John Johnson", "age": 35},
    {"name": "Jane Johnson", "age": 34},
    {"name": "John Brown", "age": 40},
    {"name": "Jane Brown", "age": 39},
    {"name": "John White", "age": 45},
    {"name": "Jane White", "age": 44},
]


@app.get("/users/me")
async def read_user_me():
    return {"user": "the current user"}


@app.get("/users/{user_id}")
async def read_user(user_id: int):
    if user_id >= len(users):
        return {"error": "User not found"}
    return {"user": users[user_id]}


class Role(str, Enum):
    admin = "admin"
    user = "user"
    guest = "guest"


@app.get("/users/{user_id}/role/{role}")
async def read_user_role(user_id: int, role: Role):
    return {"user_id": user_id, "role": role}


@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}


# ==============================================
# Query parameters
# ==============================================


@app.get("/products")
async def read_products(
    q: str, skip: int = 0, limit: int = 10, is_featured: bool = False
):
    return {"skip": skip, "limit": limit, "is_featured": is_featured}
