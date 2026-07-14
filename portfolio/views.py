from django.shortcuts import render


def home(request):
    """Render the portfolio landing page."""
    return render(request, "index.html")
