# FastAPI

## 1. Getting started

Simplest FastAPI app:

```python
# ./src/main.py

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root(): # <-- this is called "path operation function"
    return {"message": "Hello World"}
```

```bash
cd ./src
uvicorn main:app --reload
#       file:module
```

Out of the box FastAPI provides 2 api docs:

- `/docs` - Swagger UI
- `/redoc` - ReDoc

Starlette: FastAPI is a class that inherits directly from Starlette. Starlette is a lightweight asynchronous web framework designed to provide the basic building blocks for web applications and frameworks. It serves as the foundation for more complex frameworks like FastAPI. Starlette focuses on handling low-level HTTP protocol operations, routing, and middleware management.

HTTP methods:

```python
# You can also use the other operations:
@app.get() 
@app.post()
@app.put()
@app.delete()

# And the more exotic ones:
@app.options()
@app.head()
@app.patch()
@app.trace()
```

## 2. Path Parameters

```python
# Based on the type assigned to the parameter, FastAPI will validate the incoming request and convert the parameter to the correct type. In this case, the user_id parameter is expected to be an integer. By default it comes as a string
@app.get("/users/{user_id}")
async def read_user(user_id: int):
    if user_id >= len(users):
        return {"error": "User not found"}
    return {"user": users[user_id]}
```

If the data conversion fails then you'll get an error like this:

```json
{
    "detail": [
        {
            "type": "int_parsing",
            "loc": ["path", "user_id"],
            "msg": "Input should be a valid integer, unable to parse string as an integer",
            "input": "3sdf"
        }
    ]
}
```

Pydantic: All the data validation is performed under the hood by Pydantic, so you get all the benefits from it. And you know you are in good hands. You can use the same type declarations with str, float, bool and many other complex data types.

Order matters: The order of the path operation functions matters. The first one that matches the request will be the one that is executed. If you have two path operation functions with the same path, FastAPI will execute the first one that it finds.

```python

@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}

@app.get("/users/{user_id}")
async def read_user(user_id: int):
    return {"user_id": user_id}
```

Here, if you make a request to /users/me, FastAPI will execute the read_user_me function. If you make a request to /users/123, FastAPI will execute the read_user function.

Enums: You can also use Enums to define the possible values for a parameter. This will make the API documentation more explicit and will help the client to know what values are expected.

```python
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    user = "user"
    guest = "guest"


@app.get("/users/{user_id}/role/{role}")
async def read_user_role(user_id: int, role: Role):
    return {"user_id": user_id, "role": role}

# You can return enum members from your path operation, even nested in a JSON body (e.g. a dict). 
# They will be converted to their corresponding values (strings in this case) before returning them to the client.
```

Invalid enum values: If you pass an invalid value, FastAPI will return an error like this:

```json
{
    "detail": [
        {
            "type": "enum",
            "loc": ["path", "role"],
            "msg": "Input should be 'admin', 'user' or 'guest'",
            "input": "adminas",
            "ctx": { "expected": "'admin', 'user' or 'guest'" }
        }
    ]
}
```

Path parameters containing paths: If you need to receive a path as a parameter, you can declare it as a str. FastAPI will take care of the URL encoding and decoding for you.

```python
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}

# This will match any path after /files/ and will include the slashes in the parameter.
# Example: /files/images/image1.png will match this path operation and the file_path parameter will be images/image1.png.
# For slash ahead of the path use double slashes: /files//images/image1.png will match this path operation and the file_path parameter will be /images/image1.png.
```

## 3. Query Parameters

When you declare other function parameters that are not part of the path parameters, they are automatically interpreted as "query" parameters.

```python
from typing import Optional

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

As they are part of the URL, they are "naturally" strings; But when you declare them with Python types (in the example above, as int), they are converted to that type and validated against it. All the same process that applied for path parameters also applies for query parameters:

- Editor support (obviously)
- Data "parsing"
- Data validation
- Automatic documentation

FastAPI is smart enough to know the difference between query parameters and path parameters. If you declare a parameter in the path, FastAPI will know it's a path parameter. If you declare a parameter in the function arguments, FastAPI will know it's a query parameter.

You can declare multiple path parameters and query parameters at the same time, FastAPI knows which is which. And you don't have to declare them in any specific order. They will be detected by name.

You can also declare `bool` types, and they will be converted:

```python
@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10, is_active: bool = True):
    return {"skip": skip, "limit": limit, "is_active": is_active}

# Url examples:
# /items/?skip=0&limit=10&is_active=True
# /items/?skip=0&limit=10&is_active=False
# /items/?skip=0&limit=10&is_active=1
# /items/?skip=0&limit=10&is_active=0
# /items/?skip=0&limit=10&is_active=true
# /items/?skip=0&limit=10&is_active=false 
# /items/?skip=0&limit=10&is_active=on # <- This will be converted to True
# /items/?skip=0&limit=10&is_active=off # <- This will be converted to False
# /items/?skip=0&limit=10&is_active=yes # <- This will be converted to True
# /items/?skip=0&limit=10&is_active=no # <- This will be converted to False
# /items/?skip=0&limit=10&is_active=lol # <- This will give you an error
```

Required query parameters: When you declare a default value for non-path parameters (for now, we have only seen query parameters), then it is not required. If you don't want to add a specific value but just make it optional, set the default as None; But when you want to make a query parameter required, you can just not declare any default value.
