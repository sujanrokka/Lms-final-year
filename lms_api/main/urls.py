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
     
     
    #specific course chapter
     path('course-chapters/<int:course_id>',views.CourseChapterList.as_view()),
     
     #Specific chapter
     path('chapter/<int:pk>',views.ChapterDetailView.as_view()),
     
     
     #teacher courses
     path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),
     
     #Course Detail
     path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
     
]
