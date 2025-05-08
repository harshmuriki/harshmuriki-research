import data from "./data/CourseProjects.json";
import Image from "next/image";
import Link from "next/link";

const CourseProjects = (): JSX.Element => {
  // Get only the first 3 projects
  const displayedProjects = data.slice(0, 3);

  return (
    <section className="grid" id="CourseProjects">
      <h2 className="text-xl font-bold mt-12 mb-4">Course Projects</h2>
      <div className="space-y-8">
        {displayedProjects.map((project) => (
          <div
            key={project.title}
            className="p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="flex gap-6 items-start">
              <div className="w-48 h-32 relative flex-shrink-0">
                <Image
                  src={
                    project.image === "image"
                      ? "/images/project-placeholder.jpg"
                      : project.image
                  }
                  alt={project.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {project.info}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 mt-2 inline-flex items-center gap-1 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-8">
          <Link
            href="/course-projects"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center gap-1 text-sm"
          >
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseProjects;
