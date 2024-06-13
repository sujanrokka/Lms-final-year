from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q
from .serializers import TeacherSerializer,CategorySerializer,CourseSerializer,ChapterSerializer,StudentSerializer,StudentCourseEnrollSerializer,CourseRatingSerializer,TeacherDashboardSerializer,StudentFavoriteCourseSerializer,StudentAssignmentSerializer,StudentDashboardSerializer,NotificationSerializer,QuizSerializer,QuestionSerializer,CourseQuizSerializer,AttemptQuizSerializer
from rest_framework.response import Response
from .models import Teacher,Course,CourseCategory,Chapter,Student,StudentCourseEnrollment,CourseRating,StudentFavoriteCourse,StudentAssignment,Notification,Quiz,QuizQuestions,CourseQuiz,AttemptQuiz
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

class TeacherDashboard(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer    

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
            qs=Course.objects.filter(techs__icontains=category)
        
        if 'skill_name' in self.request.GET  and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=Teacher.objects.filter(id=teacher).first()
            qs=Course.objects.filter(techs__icontains=skill_name,teacher=teacher)
            return qs
        
        
        if 'studentId' in self.kwargs:
            student_id=self.kwargs['studentId']
            student=Student.objects.get(pk=student_id)
            print(student.interested_categories)
            queries=[Q(techs__iendswith=value) for value in student.interested_categories]
            query=queries.pop()
            for item in queries:
                query |= item
            qs=Course.objects.filter(query)
            return qs
        return qs
            
            
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
    
    def get_serializer_context(self):
        context= super().get_serializer_context()
        context['chapter_duration']=self.chapter_duration
        print('context----------------------')
        print(context)
        return context
    

#StudentData
class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes=[permissions.IsAuthenticated]
    

class StudentDashboard(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDashboardSerializer 
    
    
    
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
    
    


class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset =StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    
@csrf_exempt
def fetch_enroll_status(request,student_id,course_id):
    student=Student.objects.get(id=student_id)#removed.first()
    course=Course.objects.get(id=course_id)#removed.first()
    enrollStatus=StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset =StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=Student.objects.get(pk=student_id)
            return StudentFavoriteCourse.objects.filter(student=student).distinct()
     

def fetch_favorite_status(request,student_id,course_id):
    student=Student.objects.get(id=student_id)
    course=Course.objects.get(id=course_id)
    favoriteStatus=StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

def remove_favorite_course(request,course_id,student_id):
    student=Student.objects.get(id=student_id)
    course=Course.objects.get(id=course_id)
    favoriteStatus=StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    
    if favoriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
    
       
    
class EnrolledStudentList(generics.ListAPIView):
    queryset =StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=Course.objects.get(pk=course_id)
            return StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher=Teacher.objects.get(pk=teacher_id)
            return StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=Student.objects.get(pk=student_id)
            return StudentCourseEnrollment.objects.filter(student=student).distinct()
        
       
        
    
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        student_id=self.kwargs['student_id']
        course=Course.objects.get(pk=course_id)
        return CourseRating.objects.filter(course=course)


@csrf_exempt
def fetch_rating_status(request,student_id,course_id):
    student=Student.objects.get(id=student_id)
    course=Course.objects.get(id=course_id)
    ratingStatus=CourseRating.objects.filter(course=course,student=student).count()
    
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    

@csrf_exempt
def teacher_change_password(request,teacher_id):
    password = request.POST.get('password')
    try:
        teacherData = Teacher.objects.get(id=teacher_id)
    
    except Teacher.DoesNotExist:
        teacherData=None
    
    if teacherData:
        Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
    
class AssignmentList(generics.ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        teacher_id=self.kwargs['teacher_id']
        student=Student.objects.get(pk=student_id)
        teacher=Teacher.objects.get(pk=teacher_id)
        return StudentAssignment.objects.filter(student=student,teacher=teacher)
    
class MyAssignmentList(generics.ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=Student.objects.get(pk=student_id)
        #update notification
        Notification.objects.filter(student=student,notif_for='student',notif_subject='assignment').update(notifiread_status=True )
        return StudentAssignment.objects.filter(student=student)
    
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    

@csrf_exempt
def student_change_password(request,student_id):
    password = request.POST.get('password')
    try:
        studentData = Student.objects.get(id=student_id)
    
    except Student.DoesNotExist:
        studentData=None
    
    if studentData:
        Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
class NotificationList(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=Student.objects.get(pk=student_id)
        return Notification.objects.filter(student=student,notif_for='student',notif_subject="assignment",notifiread_status=False)
    
    

class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
#specific teacher quiz
class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Quiz.objects.filter(teacher=teacher)
    
    
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
    
class  QuizQuestionList(generics.ListAPIView):
    serializer_class = QuestionSerializer
    
    def get_queryset(self):   
        quiz_id=self.kwargs['quiz_id']
        quiz=Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs['quiz_id']:
            return QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        else:
            return QuizQuestions.objects.filter(quiz=quiz)
    


class CourseQuizList(generics.ListCreateAPIView):
    queryset =CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=Course.objects.get(pk=course_id)
            return CourseQuiz.objects.filter(course=course)
        
        
def fetch_quiz_assign_status(request,quiz_id,course_id):
    quiz=Quiz.objects.get(id=quiz_id)
    course=Course.objects.get(id=course_id)
    assignStatus=CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    
    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    

class AttemptQuizList(generics.ListCreateAPIView):
    queryset =AttemptQuiz.objects.all()
    serializer_class = AttemptQuizSerializer
    
 