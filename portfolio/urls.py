from django.urls import path

from . import views

app_name = "portfolio"

urlpatterns = [
    path("", views.home, name="home"),
    path("uiux_gallery.html", views.uiux_gallery, name="uiux_gallery"),
    path("uiux-gallery/", views.uiux_gallery, name="uiux_gallery_clean"),
]
