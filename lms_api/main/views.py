from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollSerializer
from rest_framework.response import Response
from .models import Teacher,Course,CourseCategory,Chapter,Student,StudentCourseEnrollment
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
    

@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        teacherData = Teacher.objects.get(email=email, password=password)
    
    except Teacher.DoesNotExist:
        teacherData=None
    
    if teacherData:
        return JsonResponse({'bool': True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool': False})
    
   

class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer
  
  
  #all course list 
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        qs= super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result']) 
            qs=Course.objects.all().order_by('-id')[:limit]
        
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=Course.objects.filter(techs_icontains=category)
        
        if 'skill_name' in self.request.GET  and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=Teacher.objects.filter(id=teacher).first()
            qs=Course.objects.filter(techs_icontains=skill_name,teacher=teacher)
        return qs


#yesma check garna baki
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    

#chapter list
class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    

    
#specic teacher course 
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)
    
#
class TeacherCourseDetail(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
  
    


class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)
        

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    

#StudentData
class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes=[permissions.IsAuthenticated]
    
    
@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        studentData = Student.objects.get(email=email, password=password)
    
    except Student.DoesNotExist:
        studentData=None
    
    if studentData:
        return JsonResponse({'bool': True,'student_id':studentData.id})
    else:
        return JsonResponse({'bool': False})
    
    
@csrf_exempt
def fetch_enroll_status(request,student_id,course_id):
    student=Student.objects.get(id=student_id).first()
    course=Course.objects.get(id=course_id).first()
    enrollStatus=StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset =StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    