import requests
import json
import os
from dotenv import load_dotenv
from django.shortcuts import render, redirect 
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.core import serializers
from django.core.serializers import serialize
from .models import *

# Create your views here.
load_dotenv()

def home(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def signIn(request):
    print(request.data)
    username=request.data['user']
    password=request.data['password']
    if('@' in username):
        euser=YelpUser.objects.get(email=username)
        username=euser
        user=authenticate(username=username, password=password)
    else:
        user=authenticate(username=username, password=password)
    print(user)
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({'success':True})
        except Exception as e:
            print(e)
            return JsonResponse({'fail': 'failed to login'})
    return JsonResponse({'fail': 'failed to login bottomline'})


@api_view(['GET'])
def curr_user(request):
    if request.user.is_authenticated:
        data=serializers.serialize('json', [request.user], fields=['email', 'username'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

@api_view(['POST'])
def log_out(request):
    try:
        logout(request)
        return JsonResponse({'signout':True}) 
    except Exception as e:
        print(e)
        return JsonResponse({'fail': 'failed to logout'})

@api_view(['POST'])
def signUp(request):
    print(request.data)
    if(request.data['password1']!=request.data['password2']):
        return JsonResponse({'fail': 'Passwords do not match!'})
    try:
        user = YelpUser.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password1'], )
    except Exception as e:
        return JsonResponse({'fail': 'Email or Username is associated with an existing account.'})
    return JsonResponse({'success':True})

@api_view(['POST'])
def search(request):
    print(request.data)
    print(request.data['searching'])
    
    url = f"https://api.yelp.com/v3/businesses/search?location={request.data['loc']}&term={request.data['searching']}&sort_by=best_match&limit=20"

    headers = {
        "accept": "application/json",
        "Authorization": str(os.getenv('Yelp'))
    }

    response = requests.get(url, headers=headers)
    result = json.loads(response.text)
    print(result)
    return JsonResponse({'success':True, 'result':result})

@api_view(['POST'])
def search_review(request):
    print(request.data)
    print('hereh2')

    url = f"https://api.yelp.com/v3/businesses/{request.data['id']}/reviews?limit=20&sort_by=yelp_sort"

    headers = {
        "accept": "application/json",
        "Authorization": str(os.getenv('Yelp'))
    }

    response = requests.get(url, headers=headers)
    result = json.loads(response.text)
    print(result)

    return JsonResponse({'success':True, 'result':result})

@api_view(['POST'])
def location_getter(request):
    ip= request.data['ip']
    url = f"https://api.apilayer.com/ip_to_location/{ip}"
    payload = {}
    headers= {
        "apikey": str(os.getenv('Ip_key'))
    }
    response = requests.request("GET", url, headers=headers, data = payload)
    print(response)
    status_code = response.status_code
    result = json.loads(response.text)
    return JsonResponse({'success':True, 'result':result})

@login_required(login_url='/#/signin')
@api_view(['GET','POST'])
def user_list(request):
    if request.method == 'POST':
       print(request.user) 
       print(request.data['listname'])
       user_list = List.objects.create(name=request.data['listname'], user=request.user) 
       user_list.save()
       
       print(user_list)

    if request.method == 'GET':
        all_list = List.objects.filter(user=request.user)
        serialized_list = json.loads(serialize('json', all_list))
        print(serialized_list)
        return JsonResponse({'data':serialized_list})


    return JsonResponse({'success':True})




