from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import TranslationHistory
from .serializers import TranslationHistorySerializer

from .services.gemini_service import translate_text


@api_view(["POST"])
def translate_view(request):
    text = request.data.get("text")

    source_language = request.data.get(
        "source_language"
    )

    target_language = request.data.get(
        "target_language"
    )

    if not text:
        return Response(
            {
                "error": "Text is required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    translated_text = translate_text(
        text,
        source_language,
        target_language
    )

    history = TranslationHistory.objects.create(
        source_text=text,
        translated_text=translated_text,
        source_language=source_language,
        target_language=target_language
    )

    return Response(
        {
            "id": history.id,
            "translated_text": translated_text
        }
    )


@api_view(["GET"])
def history_view(request):
    history = TranslationHistory.objects.order_by(
        "-created_at"
    )

    serializer = (
        TranslationHistorySerializer(
            history,
            many=True
        )
    )

    return Response(serializer.data)
@api_view(["DELETE"])
def delete_history_view(request):
    TranslationHistory.objects.all().delete()

    return Response(
        {
            "message": "History deleted successfully"
        },
        status=status.HTTP_200_OK
    )