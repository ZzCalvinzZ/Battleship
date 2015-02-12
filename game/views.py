from django.shortcuts import render
from game.models import Game, Player, Coordinate
from game.forms import GameForm

def index(request):

  if request.method == 'POST':
    post = (request.POST)
    form = GameForm(post)
    if form.is_valid():
      #Create the game and render the page that gives the URL
      game = Game(name=post='name')
      game.save()
      print 
  else:
    form = GameForm()

  return render(request, 'index.html', {'form': form })