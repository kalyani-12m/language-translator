from rest_framework import serializers
from .models import TranslationHistory


class TranslationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TranslationHistory
        fields = "__all__"