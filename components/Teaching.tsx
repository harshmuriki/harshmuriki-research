import ExtLink from "./ExtLink";
import data from "./data/teaching.json";

const Teaching = (): JSX.Element => {
  return (
    <section className="grid" id="teaching">
      <h2 className="text-xl font-bold mt-12 mb-4">Teaching</h2>
      <div className="text-base text-gray-700 dark:text-gray-400 space-y-3">
        {data.map((course) => (
          <div key={course.id}>
            <p>
              {course.link ? (
                <ExtLink href={course.link}>
                  {course.id}: {course.name}
                </ExtLink>
              ) : (
                <span>
                  {course.id}: {course.name}
                </span>
              )}
            </p>
            <p className="text-sm">
              {course.role} · {course.semesters.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teaching;
