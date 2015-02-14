from django.conf.urls import patterns, include, url
from django.contrib import admin

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'battleship.views.home', name='home'),
    # url(r'^battleship/', include('battleship.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^game/(?P<name>(\w|\s)+)/(?P<game_id>\d+)/?$', 'game.views.set_field', name='set_field'),
    url(r'^game/(?P<name>(\w|\s)+)/(?P<game_id>\d+)/play/?$', 'game.views.game_field', name='game_field'),
    url(r'^$', 'game.views.index', name='index'),
)
