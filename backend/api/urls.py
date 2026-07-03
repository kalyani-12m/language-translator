from django.urls import path

from .views import (
    translate_view,
    history_view,
    delete_history_view,
)

urlpatterns = [
    path(
        "translate/",
        translate_view
    ),

    path(
        "history/",
        history_view
    ),
    path(
    "history/delete/",
    delete_history_view,
    name="delete-history"
),
]
