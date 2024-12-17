import {NextPage} from 'next';

import About from '../components/About';
import PublicationList from '../components/PublicationList';
import Teaching from '../components/Teaching';
import Education from '../components/Education';
import ResearchProjects from '../components/ResearchProjects';

const Index: NextPage<unknown> = () => (
    <>
        <About/>
        <PublicationList/>
        {/* <Teaching/> */}
        <ResearchProjects/>
        <Education/>
    </>
);

export default Index;
