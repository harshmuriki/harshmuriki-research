import {NextPage} from 'next';

import About from '../components/About';
import PublicationList from '../components/PublicationList';
import Teaching from '../components/Teaching';
import Education from '../components/Education';
import ResearchProjects from '../components/ResearchProjects';
import CourseProjects from '../components/CourseProjects';
import RobotChase from '../components/RobotChase';
import personalInfo from '../components/data/personalInfo.json';

// Make the color brighter

const Index: NextPage<unknown> = () => (
    <>
        <About/>
        <PublicationList/>
        <ResearchProjects/>
        <CourseProjects/>
        <Teaching/>
        <Education/>
        {/* Set "robotChase": false in personalInfo.json to turn the easter egg off site-wide */}
        {personalInfo.robotChase && <RobotChase/>}
    </>
);

export default Index;
