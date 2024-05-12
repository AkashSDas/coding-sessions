from django.urls import path
from .views import (
    get_all_model_examples,
    create_author,
    get_books_of_author,
    get_tags_of_book,
    get_tags,
    get_books_v2,
)

urlpatterns = [
    path("everything/", get_all_model_examples),
    path("create-author/", create_author),
    path("books-of-author/<int:author_id>/", get_books_of_author),
    path("tags-of-book/<int:book_id>/", get_tags_of_book),
    path("tags/", get_tags),
    path("books/", get_books_v2),
]
