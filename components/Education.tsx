import ExtLink from "./ExtLink";
import data from "./data/personalInfo.json";

const Education = (): JSX.Element => {
  // 1. Group by institution & location
  const groupedEducation = data.education.reduce((acc: any[], current) => {
    // Look for an existing entry with the same name + location
    const existing = acc.find(
      (item) => item.name === current.name && item.location === current.location
    );

    if (existing) {
      // If found, just push this "level" (degree) onto the array
      existing.levels.push(current.level);
    } else {
      // Otherwise create a new entry with levels array
      acc.push({
        name: current.name,
        link: current.link,
        location: current.location,
        levels: [current.level],
      });
    }

    return acc;
  }, []);

  // 2. Render
  return (
    <section className="grid" id="education">
      <h2 className="text-xl font-bold mt-12 mb-4">Education</h2>
      <div className="text-base text-gray-700 dark:text-gray-400">
        🐸 &nbsp;is at &nbsp;
        {groupedEducation.map((edu, idx) => (
          <span key={idx}>
            <ExtLink href={edu.link}>{edu.name}</ExtLink>
            &nbsp;(
            {edu.levels.join(" & ")} at {edu.location})
            {idx < groupedEducation.length - 1 && ", "}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Education;
