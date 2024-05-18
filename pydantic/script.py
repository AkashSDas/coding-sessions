from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AliasChoices, Field
import os

os.environ["PRODUCTION_USERNAME"] = "james"
os.environ["PRODUCTION_USER_AGE"] = "32"
os.environ["PRODUCTION_URL1"] = "http://localhost:3000"


class Settings(BaseSettings):

    service_name: str = Field(default="service")
    username: str
    age: int = Field(..., alias="user_age")
    url: str = Field(validation_alias=AliasChoices("url1", "url2"))

    # if it fails to find the file then it will use the values from local env
    model_config = SettingsConfigDict(
        env_prefix="production_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # ignore or allow or forbid
    )


print(Settings().model_dump())
