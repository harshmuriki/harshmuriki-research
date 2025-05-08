import {NextPage} from 'next';

import About from '../components/About';
import PublicationList from '../components/PublicationList';
import Teaching from '../components/Teaching';
import Education from '../components/Education';
import ResearchProjects from '../components/ResearchProjects';
import CourseProjects from '../components/CourseProjects';

// Make the color brighter

const Index: NextPage<unknown> = () => (
    <>
        <About/>
        <PublicationList/>
        {/* <Teaching/> */}
        <ResearchProjects/>
        <CourseProjects/>
        <Education/>
    </>
);

export default Index;
