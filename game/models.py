from django.db import models

class Game(models.Model):
  name = models.CharField(max_length=200)

class Player(models.Model):
  name = models.CharField(max_length=200)
  won = models.BooleanField(default=False)
  lost = models.BooleanField(default=False)
  game = models.ForeignKey(Game, default=0)

class Coordinate(models.Model):
  x = models.IntegerField(default=0)
  y = models.IntegerField(default=0)
  ship = models.CharField(max_length=1, default=None)
  attr = models.CharField(max_length=1, default="U")
  player = models.ForeignKey(Player)