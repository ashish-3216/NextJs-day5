import { useState } from "react";
export default function Home() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [findTeacher, setFindTeacher] = useState([]);
  const [Id, setTeacherId] = useState(0);

  const fetchStudentData = async () => {
    const res = await fetch("/api/student");
    const data = await res.json();
    return data;
  };
  const fetchTeacherData = async () => {
    const res = await fetch("/api/teachers");
    const data = await res.json();
    return data;
  };
  const findStudents = (id) => {
    if (id > 5) {
      return [];
    }
    const student = students.filter((student) => {
      return student.teacherId === id;
    });
    return student;
  };
  return (
    <div className="container">
      <div className="student-container">
        <button
          onClick={async () => {
            const data = await fetchStudentData();
            setStudents(data);
          }}
        >
          Fetch Students Data
        </button>
        {students.map((student) => {
          return <div key={student.id}>{student.id}- {student.name}</div>;
        })}
      </div>
      <div className="teacher-container">
        <button
          onClick={async () => {
            const data = await fetchTeacherData();
            setTeachers(data);
          }}
        >
          Fetch Teachers Data
        </button>
        {teachers.map((teacher) => {
          return <div key={teacher.id}>{teacher.id}- {teacher.name}</div>;
        })}
      </div>
      <div className="find-container">
        <input
          type="number"
          placeholder="Enter Teacher ID"
          onChange={(e) => {
            setTeacherId(parseInt(e.target.value));
          }}
        />
        <button
          onClick={() => {
            setFindTeacher(findStudents(Id));
            setTeacherId(0);
          }}
        >
          Find Students
        </button>
        {Id > 5 && <div>Invalid Teacher ID</div>}
        {findTeacher.length > 0 &&
          findTeacher.map((student) => {
            return <div key={student.id}>{student.id}- {student.name}</div>;
          })}
      </div>
    </div>
  );
}
