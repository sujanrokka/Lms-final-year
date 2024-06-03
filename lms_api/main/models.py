from django.db import models
from django.core import serializers

#teacher model
class Teacher(models.Model):
    full_name=models.CharField(max_length=100)
    detail=models.TextField(null=True)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualification=models.CharField(max_length=100)
    mobile_no=models.CharField(max_length=100)
    skills=models.TextField()
    
    class  Meta:
        verbose_name_plural = '1.Teachers'
    
    def tech_list(self):
        skill_list=self.skills.split(',')
        return skill_list  
    
    def __str__(self):
         return self.full_name
    
     
 
    
#course model
class CourseCategory(models.Model):
    title=models.CharField(max_length=150)
    description=models.TextField()
    
    class  Meta:
        verbose_name_plural = '2.Course Categories'
    def __str__(self):
         return self.title
    

#course model
class Course(models.Model):
    category=models.ForeignKey(CourseCategory,on_delete=models.CASCADE)
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name='teacher_courses')
    title=models.CharField(max_length=150)
    description=models.TextField()
    featured_img=models.ImageField(upload_to='course_imgs/',null=True)
    techs=models.TextField(null=True)
    
    class  Meta:
        verbose_name_plural = '3.Courses'
        
    def related_videos(self):
        related_videos=Course.objects.filter(techs_icontains=self.techs)
        return serializers.serialize('json',related_videos)
    
    def tech_list(self):
        tech_list=self.techs.split(',')
        return tech_list    
        
    def __str__(self):
         return self.title
    
    
#course model   
class Chapter(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')
    title=models.CharField(max_length=150)
    description=models.TextField()
    video=models.FileField(upload_to='chapter_videos/',null=True)
    remarks=models.TextField(null=True)
    
    class  Meta:
        verbose_name_plural = '4.Chapters'
        
    def __str__(self):
         return self.title
    
    

#student model
class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualification=models.CharField(max_length=100)
    mobile_no=models.CharField(max_length=100)
    address=models.TextField()
    interested_categories=models.TextField()
    
    class  Meta:
        verbose_name_plural = '5.Students'
    
    