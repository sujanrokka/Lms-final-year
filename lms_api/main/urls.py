from django.urls import path
from . import views

urlpatterns = [
    #teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>/',views.TeacherDetailList.as_view()),
    path('teacher-login',views.teacher_login),
    
    #category
    path('category/',views.CategoryList.as_view()),
     
    #course
    path('course/',views.CourseList.as_view()),
     
     #course detail
    path('course/<int:pk>/',views.CourseDetailView.as_view()),
     
     
    #specific course chapter
    path('course-chapters/<int:course_id>',views.CourseChapterList.as_view()),
     
     #Specific chapter
    path('chapter/<int:pk>',views.ChapterDetailView.as_view()),
     
     
     #teacher courses
    path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),
     
     #Course Detail
    path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
    
    #student 
    path('student/',views.StudentList.as_view()),
    path('student-login/',views.student_login),
    
    path('student-enroll-course/',views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
]
