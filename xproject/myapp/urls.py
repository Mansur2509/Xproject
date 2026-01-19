from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path
from .views import IndexView, DashboardView, RegistrationView

app_name = 'myapp'

urlpatterns = [
    path('home/', IndexView.as_view(), name='index'),
    path('login/', LoginView.as_view(template_name='myapp/login.html', redirect_authenticated_user=True), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('reg/', RegistrationView.as_view(), name='reg'),
]