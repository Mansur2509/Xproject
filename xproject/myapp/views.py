from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView, CreateView
from rest_framework.reverse import reverse_lazy


# Create your views here.
class IndexView(TemplateView):
    template_name = 'myapp/landing.html'

class DashboardView(View):
    def get(self, request):
        context = {

        }
        return render(request, 'myapp/dashboard.html', context)


class RegistrationView(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('myapp:dashboard')
    template_name = 'myapp/reg.html'