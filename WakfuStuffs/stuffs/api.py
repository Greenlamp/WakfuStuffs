from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Stuff
from .serializers import StuffSerializer


class StuffViewSet(viewsets.ModelViewSet):
    queryset = Stuff.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StuffSerializer

    @api_view
    def test(self, request):
        queryset = Stuff.objects.all().order_by("name")
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class EndView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StuffSerializer

    def get_queryset(self):
        queryset = Stuff.objects.all().order_by("name")
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return queryset

class ListStuff(APIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StuffSerializer

    def get(self, request, format=None):
        names = None
        if('letter' in request.query_params and request.query_params['letter'] is not None):
            letter = request.query_params['letter']
            names = [stuff.name for stuff in Stuff.objects.all().filter(name__startswith=letter)]
        elif('id' in request.query_params and request.query_params['id'] is not None):
            id = request.query_params['id']
            names = [stuff.name for stuff in Stuff.objects.all().filter(id=id)]
        else:
            names = [stuff.name for stuff in Stuff.objects.all()]
        return Response(names)

class AddStuff(APIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StuffSerializer

    def get(self, request, format=None):
        retour = ["ok"]
        return Response(retour)

    def post(self, request, format=None):
        print(len(str(request)))
        taille = int(request.data.get("count"))
        cpt = 0
        for i in range(0, taille):
            data = request.data.getlist(str(i))

            temp = {"name": "", "quality": "", "type": "", "niveau": "", "bonus": ""}
            temp["name"] = data[0]
            temp["quality"] = data[1]
            temp["type"] = data[2]
            temp["niveau"] = str(data[3])
            temp["bonus"] = data[4]
            serializer = StuffSerializer(data=temp)
            print(serializer.is_valid())
            if serializer.is_valid():
                serializer.save()
                cpt+=1
        if cpt == taille:
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
