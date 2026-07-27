from django.shortcuts import render


def home(request):
    """Render the portfolio landing page."""
    return render(request, "index.html")


def uiux_gallery(request):
    """Render the UI/UX gallery page."""
    return render(request, "uiux_gallery.html")
