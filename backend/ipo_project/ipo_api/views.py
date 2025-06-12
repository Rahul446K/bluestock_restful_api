from django.shortcuts import render, redirect
from rest_framework import generics, status, viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import RegisterSerializer, CompanySerializer, IPOSerializer, DocumentSerializer
from django.views.generic import RedirectView
from .models import Company, IPO, Document


class HomeView(RedirectView):
    pattern_name = 'api:register'
    permanent = False


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": serializer.data,
                "message": "User created successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def ipos(self, request, pk=None):
        company = self.get_object()
        ipos = company.ipos.all()
        serializer = IPOSerializer(ipos, many=True)
        return Response(serializer.data)


class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = IPO.objects.all()
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]
