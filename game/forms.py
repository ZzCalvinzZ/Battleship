from django import forms

class GameForm(forms.Form):
  name = forms.CharField(label='Name', max_length=200)

class SetFieldForm(forms.Form):
  player_name = forms.CharField(label='Player Name', max_length=200)
  ship_data = forms.CharField(widget=forms.HiddenInput(), max_length=1000)