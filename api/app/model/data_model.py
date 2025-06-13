from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash



class Updateable:
    def update(self, data):
        for attr, value in data.items():
            setattr(self, attr, value)

class School(db.Model,Updateable):
    __tablename__ = 'schools'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    created_by = db.Column(db.String(128), unique=True, nullable=False)  
    password_hash = db.Column(db.String(256))

    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    streams = db.relationship('Stream', backref='school_backref', lazy='dynamic')
    subjects = db.relationship('Subject', backref='school')
    students = db.relationship('Student', backref='school')
    routines = db.relationship('Routine', backref='school')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<School {}>'.format(self.name)







class Student(db.Model,Updateable):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    fullname = db.Column(db.String(128))
    gender = db.Column(db.String(64))
    email = db.Column(db.String(64), nullable=True)
    avatar_url = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    mode_of_study = db.Column(db.String(64))
    date_reg = db.Column(db.Date,nullable=True)
    stream_id = db.Column(db.Integer, db.ForeignKey('streams.id'))

    stream = db.relationship('Stream', backref='students')
    stream = db.relationship('Stream', backref='students')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


    def __repr__(self):
        return '<Classroom {}>'.format(self.name)



class Stream(db.Model,Updateable):
    __tablename__ = 'streams'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    capacity = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
   

    def __repr__(self):
        return '<Stream {}>'.format(self.name)




class Subject(db.Model,Updateable):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    stream_id = db.Column(db.Integer, db.ForeignKey('streams.id'), nullable=False)
    subject = db.Column(db.String(64))
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    stream = db.relationship('Stream', backref='subjects')
    
    def __repr__(self):
        return '<Subject {}>'.format(self.subject)

class Routine(db.Model, Updateable):
    __tablename__ = 'routines'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    day = db.Column(db.String(64))
    time_slot = db.Column(db.String(64))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    subject = db.relationship('Subject', backref='routines')
    attendance = db.relationship("Attendance", backref="routine")

    # Add this:
    students = db.relationship('Student',secondary='attendance',backref='routines',)

    def __repr__(self):
        return f'<Routine {self.id}>'


class Attendance(db.Model):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    attended = db.Column(db.Boolean)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))

    student = db.relationship("Student", backref="attendances")  # Changed backref to plural for clarity


    
