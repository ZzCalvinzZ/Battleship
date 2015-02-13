from django.shortcuts import render
from game.models import Game, Player, Coordinate
from game.forms import GameForm
from django.http import HttpResponseRedirect, HttpResponse
import json

def index(request):
  if request.method == 'POST':
    post = (request.POST)
    form = GameForm(post)
    if form.is_valid():
      #Assign the name to the game
      game = Game(name=post['name'])
      game.save()
      #determine the unique URL for the game
      game_url = request.META['HTTP_REFERER'] + game.name + '/' + str(game.id)
      response = {
        'url': game_url,
        'game': game.name
      }
      return HttpResponse(json.dumps(response), content_type='application/json')
  else:
    form = GameForm()

  return render(request, 'index.html', {'form': form })