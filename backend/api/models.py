from django.db import models


class TranslationHistory(models.Model):
    source_text = models.TextField()
    translated_text = models.TextField()

    source_language = models.CharField(max_length=100)
    target_language = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_language} -> {self.target_language}"