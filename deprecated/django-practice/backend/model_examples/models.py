from django.db import models
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator


class Author(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    birth_date = models.DateField()

    def __str__(self) -> str:
        return self.username


class PublishedBookQueryset(models.QuerySet):
    def published_books(self):
        return self.filter(is_banned=False)


class AuthorBookQueryset(models.QuerySet):
    def get_books_of_author(self, author_id):
        return self.filter(author_id=author_id)


class PublishedBookManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_banned=False)


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")
    publication_date = models.DateField()
    page_count = models.PositiveIntegerField()
    price = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(1.00)]
    )
    is_banned = models.BooleanField(default=False)
    summary = models.TextField()

    objects = models.Manager()  # default manager
    published_books = PublishedBookManager()  # custom manager
    published_books_queryset = PublishedBookQueryset.as_manager()  # custom queryset
    published_books_queryset_v2 = models.Manager.from_queryset(PublishedBookQueryset)()

    class Meta:
        ordering = ["-publication_date"]
        unique_together = ["title", "author"]

    def __str__(self):
        return self.title

    # This doesn't gets called automatically by Django
    def clean_title(self):
        print("clean_title")
        if self.title.startswith(self.author.username):
            raise ValidationError("Title should not start with author's username")
        return self.title.strip().title()

    # This gets called automatically by Django
    def clean(self):
        print("clean")
        self.title = self.clean_title()

    def is_published_recently(self):
        return self.publication_date >= timezone.now() - datetime.timedelta(days=7)

    def mark_as_banned(self):
        self.is_banned = True
        self.save()


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    books = models.ManyToManyField(Book, related_name="tags")

    def __str__(self):
        return self.name
