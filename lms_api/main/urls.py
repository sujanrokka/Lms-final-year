from django.urls import path
from . import views

urlpatterns = [
    #teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>/',views.TeacherDashboard.as_view()),
    path('teacher/change-password/<int:teacher_id>/',views.teacher_change_password),
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
    path('teacher-courses/<int:teacher_id>/',views.TeacherCourseList.as_view()),
     
    #Course Detail
    path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
    
    #student 
    path('student/',views.StudentList.as_view()), 
    path('student-login/',views.student_login),
    path('student/dashboard/<int:pk>/',views.StudentDashboard.as_view()),
    path('student/change-password/<int:student_id>/',views.student_change_password),
    
    
    
    path('student-enroll-course/',views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>',views.EnrolledStudentList.as_view()),
    path('fetch-all-enrolled-students/<int:teacher_id>',views.EnrolledStudentList.as_view()),
    path('fetch-all-enrolled-courses/<int:student_id>',views.EnrolledStudentList.as_view()),
    path('fetch-recommended-courses/<int:studentId>',views.CourseList.as_view()),
    path('course-rating/<int:course_id>',views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>',views.fetch_rating_status),
    path('student-add-favorite-course/',views.StudentFavoriteCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>',views.remove_favorite_course),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>',views.fetch_favorite_status),
    path('fetch-favorite-courses/<int:student_id>',views.StudentFavoriteCourseList.as_view()),
    path('student-assignment/<int:teacher_id>/<int:student_id>',views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>',views.MyAssignmentList.as_view()),
    path('update-assignment/<int:pk>',views.UpdateAssignment.as_view()),
    
    path('student/fetch-all-notifications/<int:student_id>/',views.NotificationList.as_view()),
    path('save-notification/',views.NotificationList.as_view()),
    
    
    
    
    
   
    
    
]
