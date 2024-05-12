from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Author, Book, Tag
import datetime


@api_view(["GET"])
def get_all_model_examples(request):
    authors = Author.objects.all()
    books = Book.objects.all()

    fetched_authors = [
        {"username": author.username, "email": author.email} for author in authors
    ]

    fetched_books = [
        {
            "title": book.title,
            "author": book.author.username,
            "publication_date": book.publication_date,
            "page_count": book.page_count,
            "price": book.price,
            "is_banned": book.is_banned,
            "summary": book.summary,
        }
        for book in books
    ]

    print(f"Fetched authors: {fetched_authors} {authors}")
    print(f"Fetched books: {fetched_books} {books}")

    return Response(
        {"authors": fetched_authors, "books": fetched_books},
        status=200,
    )


@api_view(["POST"])
def create_author(request):
    username = request.data.get("username")
    email = request.data.get("email")
    birth_date = request.data.get("birth_date")

    username_taken = Author.objects.filter(username=username).exists()
    email_taken = Author.objects.filter(email=email).exists()
    if username_taken or email_taken:
        return Response({"error": "Username or email already taken"}, status=400)

    birth_date = datetime.datetime.strptime(birth_date, "%Y-%m-%d").date()
    if birth_date >= datetime.date.today():
        return Response({"error": "Birth date should be in the past"}, status=400)
        # raise ValidationError("Birth date should be in the past")

    author = Author(username=username, email=email, birth_date=birth_date)
    author.save()

    return Response(
        {"username": author.username, "email": author.email},
        status=201,
    )


@api_view(["GET"])
def get_books_of_author(request, author_id):
    author = Author.objects.get(pk=author_id)
    books = [
        {
            "title": book.title,
            "publication_date": book.publication_date,
            "page_count": book.page_count,
            "price": book.price,
            "is_banned": book.is_banned,
            "summary": book.summary,
        }
        for book in author.books.all()
    ]
    return Response(
        {"author": author.username, "books": books},
        status=200,
    )

    # author = Author.objects.get(pk=author_id)
    # books = Book.objects.filter(
    #     author=author, is_banned=False, publication_date__lte=datetime.date.today()
    # ).order_by("-publication_date")[:2]

    # fetched_books = [
    #     {
    #         "title": book.title,
    #         "publication_date": book.publication_date,
    #         "page_count": book.page_count,
    #         "price": book.price,
    #         "is_banned": book.is_banned,
    #         "summary": book.summary,
    #     }
    #     for book in books
    # ]

    # return Response(
    #     {"author": author.username, "books": fetched_books},
    #     status=200,
    # )


@api_view(["GET"])
def get_tags_of_book(request, book_id: int):
    try:
        book = Book.objects.get(pk=book_id)
        # tags = [tag.name for tag in book.tags.all()]
        tags = Tag.objects.filter(books=book)
        tags = [tag.name for tag in tags]
        return Response({"book": book.title, "tags": tags}, status=200)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=404)


@api_view(["GET"])
def get_tags(request):
    tags = Tag.objects.prefetch_related("books").all()
    tags = [
        {
            "name": tag.name,
            "books": [book.title for book in tag.books.all()],
        }
        for tag in tags
    ]
    return Response({"tags": tags}, status=200)


@api_view(["GET"])
def get_books_v2(request):
    # books = Book.objects.all()
    books = Book.published_books_queryset.published_books()
    # books = Book.published_books_queryset_v2.published_books()

    fetched_books = [
        {
            "title": book.title,
            "author": book.author.username,
            "publication_date": book.publication_date,
            "page_count": book.page_count,
            "price": book.price,
            "is_banned": book.is_banned,
            "summary": book.summary,
        }
        for book in books
    ]

    return Response({"books": fetched_books}, status=200)
