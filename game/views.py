from django.shortcuts import render
from game.models import Game, Player, Coordinate
from game.forms import GameForm, SetFieldForm
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
      game_url = request.META['HTTP_REFERER'] + 'game/' + game.name.replace(" ", "_") + '/' + str(game.id)
      response = {
        'url': game_url,
        'game': game.name
      }
      return HttpResponse(json.dumps(response), content_type='application/json')
    else:
      errors = form.errors
      return HttpResponse(json.dumps(errors))
  else:
    form = GameForm()

  return render(request, 'index.html', {'form': form })

def set_field(request, name, game_id):
  if request.method == 'POST':
    post = (request.POST)
    form = SetFieldForm(post)
    if form.is_valid():
      print post
      response = post
      return HttpResponse(json.dumps(response), content_type='application/json')
    else:
      errors = form.errors
      return HttpResponse(json.dumps(errors))
  else:  
    try:
      game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
      return HttpResponse('Game Does Not Exist', status=404) 

    #Check how many players have currently joined
    number_of_players = Player.objects.filter(game__id=game_id).count()

    request.session['game_data'] = {
      'name': game.name,
      'game_id': game_id,
      'player': 0,
      'size': range(10),
      'won': False,
      'lost': False,
    }

    game_data = dict(request.session['game_data'])
    game_data['form'] = SetFieldForm(
      )
    if number_of_players == 0:
      game_data['player'] = 1
    elif number_of_players == 1:
      game_data['player'] = 2
    elif number_of_players >= 2:
      return HttpResponse('This game is already full', status=404)

    player = Player(game=game)

    return render(request, 'set_field.html', game_data)