from flask import request,Blueprint,jsonify,render_template, send_from_directory
from app.model.data_model import *
from app import db
from app.model.auth import create_auth_token, token_required
import os
from sqlalchemy import join,and_
import datetime
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
import io




users = Blueprint('users', __name__)



# Registration #
@users.route('/auth/school', methods=['POST'])
def auth_school():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing JSON'}), 400

    created_by = data.get('created_by')
    password = data.get('password')
    print(data)


    if not created_by or not password:
        return jsonify({'message': 'Invalid credentials'}), 400


    user = School.query.filter_by(created_by=created_by).first()
    if not user:
        return jsonify({'message': 'Invalid email'}), 401

    if not user.verify_password(password):
        return jsonify({'message': 'Invalid password'}), 401

    token = create_auth_token(user.id)
    return jsonify({'message': 'Login successful',
     'user': {
     'school_id': user.id,
     'token': token,
      'name':user.name,
      'email':user.created_by
        }}), 200
 



def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if re.match(pattern, email):
        return True
    return False




@users.route('/add/school', methods=['POST'])
def add_school():
    data = request.get_json()

    try:
        school = School(**data)
        db.session.add(school)
        db.session.commit()



        return jsonify({'message': 'School added successfully'}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': str(e.__cause__)}), 400

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'error': 'An unexpected error occurred: ' + str(e)}), 500




# end Registration #


# Student #

@users.route('/get/student/<int:student_id>', methods=['GET'])
@token_required
def get_student(current_user,student_id):
    student = Student.query.filter_by(school_id=current_user.id,id=student_id).first() 
    if student:
      
        student_data = {
            'id': student.id,
            'fullname': student.fullname,
            'birthday': student.birthday,
            'address': student.address,
            'gender': student.gender,
            'contact': student.contact,
            'email': student.email,
            'avatar_url': student.avatar_url,
            'timestamp': student.timestamp,
            'regnum': student.regnum,
            'mode_of_study': student.mode_of_study,
            'date_reg': student.date_reg,
            'stream_id': student.stream_id,
            'stream_name': student.stream.name,
            'class_name': student.stream.classroom.name,
        }
        return jsonify(student_data)
    else:
        return jsonify({'error': 'Student not found'})






@users.route('/add/student', methods=['POST'])
@token_required
def add_student(current_user):
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No input data provided'}), 400

        school_id = current_user.id

        data['school_id'] = school_id
       

        # Create and save the student record
        student = Student(**data)
        db.session.add(student)
        db.session.commit()

        return jsonify({'message': 'Student created successfully'}), 200

    except KeyError as e:
        return jsonify({'message': f"Missing data: {str(e)}"}), 400
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({'message': 'An internal error occurred'}), 500
 



     
@users.route('/get/students', methods=['GET'])
@token_required
def get_students(current_user):
    try:
        school_id = current_user.id

        students = Student.query.filter_by(school_id=school_id).all()
        result = []
        for student in students:
            stream = student.stream.name if student.stream else None

            student_data = {
                "id": student.id,
                "fullname": student.fullname,
                "study": student.mode_of_study,
                "gender": student.gender,
                "timestamp": student.timestamp,
                "email": student.email,
                "class": stream
                
            }
            result.append(student_data)

        return jsonify(result), 200
    except SQLAlchemyError as e:
        error_message = str(e.__dict__['orig'])
        return jsonify({'message': error_message}), 500
    except Exception as e:
        return jsonify({'message': str(e)}), 500







@users.route('/classroom/<int:stream_id>/subjects/teacher', methods=['GET'])
@token_required
def get_subjects_and_teachers_by_classroom(current_user,stream_id):
    subjects = Subject.query.filter_by(stream_id=stream_id).all()

    result = []
    for subject in subjects:
        subject_data = {
            "id": subject.id,
            "stream_id": subject.stream_id,
            "subject": subject.subject
        }
        result.append(subject_data)

    return jsonify(result), 200







@users.route('/add/stream', methods=['POST'])
@token_required
def add_stream(current_user):
    data = request.get_json()
    data['school_id'] = current_user.id
    user = Stream(**data)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Stream added successfully'}), 200



@users.route('/get/streams', methods=['GET'])
@token_required
def get_stream(current_user):
    posts = Stream.query.all()
    result = []
    for post in posts:
        post_data = {
            "id": post.id,
            "name": post.name,
            "capacity": post.capacity,
            "classroom": post.name 

        }
        result.append(post_data)
    print(result)
    return jsonify(result), 200





@users.route('/class/<int:stream_id>/students', methods=['GET'])
@token_required
def get_class_students(current_user,stream_id):
    subjects = Student.query.filter_by(stream_id=stream_id).all()
    
    result = []
    for subject in subjects:
        subject_data = {
            "id": subject.id,
              "fullname": subject.fullname,
        }
        result.append(subject_data)
    return jsonify(result), 200








@users.route('/classroom/<int:stream_id>/subjects', methods=['GET'])
@token_required
def get_subjects_by_classroom(current_user,stream_id):
    subjects = Subject.query.filter_by(stream_id=stream_id).all()
    result = []
    for subject in subjects:
        subject_data = {
            "id": subject.id,
            "stream_id": subject.stream_id,
            "subject": subject.subject,
        }
        result.append(subject_data)
    return jsonify(result), 200



@users.route('/class/data', methods=['GET'])
@token_required
def get_class_data(current_user):
    school_id = current_user.id
    
    # Get Classrooms and their Streams
    streams = Stream.query.filter_by(school_id=school_id).all()
    stream_result = []
    for stream in streams:
        stream_data = {
            "id": stream.id,
            "name": stream.name,
            "capacity": stream.capacity,
             "student_count": len(stream.students)
            }
        stream_result.append(stream_data)

    return jsonify(stream_result), 200

# end Classroom  #

# end Staff  #


# Attendance  #
@users.route('/assign/rooster', methods=['POST'])
@token_required
def add_rooster(current_user):
    school_id = current_user.id

    data = request.get_json()

    data['school_id'] = school_id
    
    user = Routine(**data)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Rooster added successfully'}), 200





@users.route('/get/routine/<int:stream_id>', methods=['GET'])
@token_required
def get_routine(current_user, stream_id):
    school_id = current_user.id

    # Query for routines that match the stream_id and school_id
    routines = Routine.query.join(Subject).filter(
        Routine.school_id == school_id,
        Subject.stream_id == stream_id
    ).all()

    if not routines:
        return jsonify({'message': 'No routines found for the given stream and school'}), 404

    routine_data = []
    for routine in routines:
        # Get the subject and the assigned teachers
        subject = routine.subject
    

    
        routine_data.append({
            'routine_id': routine.id,
            'subject': {
                'id': subject.id,
                'name': subject.subject
            },
            'day': routine.day,
            'time_slot': routine.time_slot
        })

    return jsonify(routine_data), 200





@users.route('/delete/routine/<int:routine_id>', methods=['POST'])
@token_required
def remove_rooster(current_user,routine_id):
    school_id = current_user.id

    try:

        routine = Routine.query.filter_by(school_id=school_id, id=routine_id).first()

        if not routine: 
            return jsonify({'message': 'Rooster not found'}), 404

        db.session.delete(routine)
        db.session.commit()

        return jsonify({'message': 'Rooster removed successfully'}), 200


    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500





# Subject  #
@users.route('/add/subject', methods=['POST'])
@token_required
def subject(current_user):
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No input data provided'}), 400

        data['school_id'] = current_user.id
        user = Subject(**data)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'Subject created successfully'}), 200
    except KeyError as e:
        return jsonify({'message': f'Missing data: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500





@users.route('/get-routine/<int:routine_id>', methods=['GET'])
def get_schedule(routine_id):
    routine = Routine.query.get(routine_id)

    if not routine:
        return jsonify({'error': 'Routine not found'}), 404

    subject = routine.subject
    stream = subject.stream  # Get stream from subject

    # Get all students in the stream
    students = stream.students

    # Get attendance records for this routine
    attendances = Attendance.query.filter_by(routine_id=routine.id).all()
    attendance_map = {att.student_id: att.attended for att in attendances}

    response = {
        'routine_id': routine.id,
        'subject': subject.subject,
        'stream': stream.name,
        'students': [
            {
                'id': student.id,
                'fullname': student.fullname,
                'gender': student.gender,
                'attendance': attendance_map.get(student.id, None)  # None if not recorded
            }
            for student in students
        ]
    }

    return jsonify(response), 200








@users.route('/attendance/submit', methods=['POST'])
def submit_attendance():
    data = request.get_json()
    routine_id = data.get('routine_id')
    attendance_data = data.get('attendance')  # { student_id: true/false }

    for student_id, attended in attendance_data.items():
        existing = Attendance.query.filter_by(student_id=student_id, routine_id=routine_id).first()
        if existing:
            existing.attended = attended
        else:
            new_att = Attendance(student_id=student_id, routine_id=routine_id, attended=attended)
            db.session.add(new_att)
    db.session.commit()

    return jsonify({'message': 'Attendance submitted'}), 200
