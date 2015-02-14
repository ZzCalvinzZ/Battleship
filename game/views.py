from django.shortcuts import render
from django.core.urlresolvers import reverse
from game.models import Game, Player, Coordinate
from game.forms import GameForm, SetFieldForm
from django.http import HttpResponseRedirect, HttpResponse
from django.db.models import Q
import json
import parser
import ast

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
      game_data = request.session['game_data']

      #get the game and player models from the database
      try:
        game = Game.objects.get(id=game_id)
      except Game.DoesNotExist:
        return HttpResponse('Game Does Not Exist', status=404) 
      player = Player.objects.get(id=game_data['player_id'])

      #save the players name to the database
      player.name = post['player_name']
      game_data['player_name'] = post['player_name']
      player.save()

      #populate coordinates
      for i in range(10):
        for j in range(10):
          coord = Coordinate(x=i, y=j, player=player)
          coord.save()

      #convert querydict data to dictionary
      ships = ast.literal_eval(post['ship_data'])
      #update coordinates for aircraft
      for aircraft in ships['aircraft']:
        aircraft_str = str(ships['aircraft'][aircraft])
        game_data['my_ships'].append(aircraft_str)
        if len(aircraft_str) < 2:
          x = str(0)
        else:
          x = aircraft_str[0]
        y = aircraft_str[-1]
        coord = Coordinate.objects.filter(player=player, x=int(x), y=int(y))
        coord.ship = "A"


      #update coordinates for battleship
      for battleship in ships['battleship']:
        battleship_str = str(ships['battleship'][battleship])
        game_data['my_ships'].append(battleship_str)
        if len(battleship_str) < 2:
          x = str(0)
        else:
          x = battleship_str[0]
        y = battleship_str[-1]
        coord = Coordinate.objects.filter(player=player, x=int(x), y=int(y))
        coord.ship = "B"

      #update coordinates for submarine
      for submarine in ships['submarine']:
        submarine_str = str(ships['submarine'][submarine])
        game_data['my_ships'].append(submarine_str)
        if len(submarine_str) < 2:
          x = str(0)
        else:
          x = submarine_str[0]
        y = submarine_str[-1]
        coord = Coordinate.objects.filter(player=player, x=int(x), y=int(y))
        coord.ship = "S"

      #update coordinates for cruiser
      for cruiser in ships['cruiser']:
        cruiser_str = str(ships['cruiser'][cruiser])
        game_data['my_ships'].append(cruiser_str)
        if len(cruiser_str) < 2:
          x = str(0)
        else:
          x = cruiser_str[0]
        y = cruiser_str[-1]
        coord = Coordinate.objects.filter(player=player, x=int(x), y=int(y))
        coord.ship = "C"

      #update coordinates for destroyer
      for destroyer in ships['destroyer']:
        destroyer_str = str(ships['destroyer'][destroyer])
        game_data['my_ships'].append(destroyer_str)
        if len(cruiser_str) < 2:
          x = str(0)
        else:
          x = cruiser_str[0]
        y = destroyer_str[-1]
        coord = Coordinate.objects.filter(player=player, x=int(x), y=int(y))
        coord.ship = "D"
 
      #redirect to the game page
      args = {'name': game_data['name'], 'game_id': str(game_data['game_id'])}
      return HttpResponseRedirect(reverse('game_field', kwargs=args))
    else:
      response = dict(request.session['game_data'])
      response['form'] = form
      return render(request, 'set_field.html', response)
  else:  
    try:
      game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
      return HttpResponse('Game Does Not Exist', status=404) 

    #Check how many players have currently joined
    number_of_players = Player.objects.filter(game__id=game_id).count()

    #Session is used to store information for the player
    request.session['game_data'] = {
      'name': game.name,
      'game_id': game_id,
      'my_turn': False,
      'player': 0,
      'player_name': 'anonymous',
      'player_id': 0,
      'opponent_name': 'anonymous',
      'opponent_id': 0,
      'my_ships': [],
      'latest_coord': 
      'size': range(10),
      'won': False,
      'lost': False,
    }

    game_data = request.session['game_data']


    #Only two players are allowed to join, otherwise 404
    if number_of_players == 0:
      game_data['player'] = 1
      game_data['my_turn'] = True
    elif number_of_players == 1:
      game_data['player'] = 2
    elif number_of_players >= 2:
      return HttpResponse('This game is already full', status=404)

    player = Player(game=game)
    player.save()
    game_data['player_id'] = player.id

    response = dict(request.session['game_data'])
    response['form'] = SetFieldForm()
    return render(request, 'set_field.html', response)

def game_field(request, name, game_id):

  response = request.session['game_data']
  return render(request, 'game_field.html', response)

def highlight(request, name, game_id):
  response = request.session['game_data']
  return HttpResponse(json.dumps(response), content_type='application/json')

def wait(request, name, game_id):
  game_data = request.session['game_data']
  if game_data['opponent_id'] == 0:
    opponent = Player.objects.filter(game__id=game_id).exclude(name = game_data['player_name'])
    if len(opponent) == 1:
      opponent = opponent[0]
      opp_coords = Coordinate.objects.filter(player=opponent)
      if len(opp_coords) == 100:
        game_data['opponent_id'] = opponent.id
        game_data['opponent_name'] = opponent.name

  return HttpResponse(json.dumps(game_data), content_type='application/json')

def their_turn(request, name, game_id):
  game_data = request.session['game_data']
  if game_data['my_turn'] == False
    opponent = player.objects.get(id=game_data['opponent_id'])
    latest_coord = opponent.last_coord_guessed 
    if (latest_coord != 'N') && (latest_coord != game_data['latest_coord']):
      game_data['latest_coord'] = latest_coord
      game_data['my_turn'] = True


  return HttpResponse(json.dumps(game_data), content_type='application/json')