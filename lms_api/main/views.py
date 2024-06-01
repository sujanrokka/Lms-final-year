from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TeacherSerializer
from rest_framework.response import Response
from .models import Teacher,Course
from rest_framework import generics
from rest_framework import permissions
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist


#using normal class way
# class TeacherList(APIView):
#     def get(self,request):
#         teachers=Teacher.objects.all()
#         serializer=TeacherSerializer(teachers,many=True)
#         return Response(serializer.data)



#using generics class
class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]
    
class TeacherDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]
    
# @csrf_exempt
# def teacher_login(request):
#     email=request.POST['email']
#     password=request.POST['password']
#     teacherData=Teacher.objects.get(email=email,password=password)
#     if teacherData:
#         return JsonResponse({'bool':True})
#     else:
#         return JsonResponse({'bool':False})

@csrf_exempt
def teacher_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            teacherData = Teacher.objects.get(email=email, password=password)
            return JsonResponse({'bool': True})
        except ObjectDoesNotExist:
            return JsonResponse({'bool': False})
    return JsonResponse({'error': 'Invalid request method'}, status=405)