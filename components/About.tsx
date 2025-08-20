import Image from "next/image";

import ExtLink from "./ExtLink";
import ProfileImage from "./ProfileImage";
import personalInfo from "./data/personalInfo.json";

const About = (): JSX.Element => {
  return (
    <section className="grid gap-12" id="about">
      <div className="flex justify-between">
        <div className="mr-8 hidden md:block rounded-md">
          <ProfileImage></ProfileImage>
        </div>
        <div className="flex flex-col max-w-xl w-full justify-evenly">
          <h1 className="text-4xl font-bold pb-8 md:pb-0">
            {personalInfo.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            I am a BS/MS student in{" "}
            <ExtLink href={personalInfo.about.department.link}>
              {personalInfo.about.department.name}{" "}
            </ExtLink>
            at{" "}
            <ExtLink href={personalInfo.about.college.link}>
              {personalInfo.about.college.name}{" "}
            </ExtLink>
            advised by{" "}
            <ExtLink href={personalInfo.about.advisor.link}>
              {" "}
              {personalInfo.about.advisor.name}
            </ExtLink>
            . I am also working as a Graduate Teaching Assistant with{" "}
            <ExtLink href={personalInfo.about.graadvisor.link}>
              {personalInfo.about.graadvisor.name}
            </ExtLink>
            . <br />
            <a className="text-sm text-gray-600 dark:text-gray-400">
              ✉️ {personalInfo.about.email}
            </a>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Research Interest: {personalInfo.about.interest}
          </p>
          {/* <p className="text-sm text-gray-400">
            Under construction......
            <br />
            Re-architecting this site with some modern web technologies.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default About;
