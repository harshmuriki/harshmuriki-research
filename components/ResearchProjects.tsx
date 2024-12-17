import data from "./data/ResearchProjects.json";

const ResearchProjects = (): JSX.Element => {
  return (
    <section className="grid" id="ResearchProjects">
      <h2 className="text-xl font-bold mt-12 mb-4">ResearchProjects</h2>
      <div className="text-base ml-4 text-gray-700">
        <ul className="list-disc">
          {data.map((classInfo) => (
            <li key={classInfo.id}>
              TA: {classInfo.id}, {classInfo.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResearchProjects;
