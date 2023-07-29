import Nav from "../components/Nav"
import SideBar from '../components/miniComponent/SideBar';
import SchoolBar from '../components/miniComponent/SchoolBar';
import TeacherBar from '../components/miniComponent/TeacherBar';

const TeacherTab = () => {

    
  return (
    <>
    <div className="teacher">
    <Nav />
    <main>
        <SideBar />
        <TeacherBar />
        <SchoolBar />
    </main>
    </div>
    
    </>
  )
}

export default TeacherTab