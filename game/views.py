from django.shortcuts import render
from game.models import Player, Coordinate
from game.forms import GameForm

def index(request):

  form = GameForm()

  return render(request, 'index.html', {'form': form })