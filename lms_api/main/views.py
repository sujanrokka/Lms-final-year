from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer
from rest_framework.response import Response
from .models import Teacher,Course,CourseCategory
from rest_framework import generics
from rest_framework import permissions
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt



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
    email = request.POST.get('email')
    password = request.POST.get('password')
    teacherData = Teacher.objects.get(email=email, password=password)
    if teacherData:
        return JsonResponse({'bool': True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool': False})
    
   

class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer
  
  
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
#specic teaccher course 
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)