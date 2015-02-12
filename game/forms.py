from django import forms

class GameForm(forms.Form):
  name = forms.CharField(label='Name', max_length=200)

# class GameForm(forms.Form):
#   player_1 = forms.CharField(label='Player 1', max_length=100)
#   player_2 = forms.CharField(label='Player 2', max_length=100)