from django.urls import path
from .views import get_all_model_examples, create_author, get_books_of_author

urlpatterns = [
    path("everything/", get_all_model_examples),
    path("create-author/", create_author),
    path("books-of-author/<int:author_id>/", get_books_of_author),
]
