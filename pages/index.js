import { useState } from "react";
import AddTeacherForm from "./Components/AddTeacher";
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
        <ol>
          {students.map((student) => {
            return <li key={student.id}> {student.name}</li>;
          })}
        </ol>
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
        <ol>
          {teachers.map((teacher) => {
            return <li key={teacher.id}>{teacher.name}</li>;
          })}
        </ol>
      </div>
      <div className="find-container">
        <input
          type="number"
          placeholder="Enter Teacher ID"
          onChange={(e) => {
            setTeacherId(parseInt(e.target.value));
            if (e.target.value <= 0 || e.target.value > 5) {
              setTeacherId(0);
              setFindTeacher([]);
            }
          }}
        />
        <button
          onClick={() => {
            setFindTeacher(findStudents(Id));
          }}
        >
          Find Students
        </button>
        {Id === 0 && <div>Invalid Teacher ID</div>}
        {Id <= 5 &&
          findTeacher.length > 0 &&
          findTeacher.map((student) => {
            return (
              <ul key={student.id}>
                <li> {student.name}</li>
              </ul>
            );
          })}
      </div>
    </div>
  );
}
