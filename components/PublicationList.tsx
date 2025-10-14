import PublicationItem from "./PublicationItem";
import data from "./data/publications.json";
import Link from "next/link";

const PublicationList = (): JSX.Element => {
  return (
    <section className="grid w-full" id="publications">
      <h2 className="text-xl font-bold mt-12 mb-4">Publications</h2>
      <div>
        {[...data]
          .sort(
            (a: { id?: number }, b: { id?: number }) =>
              (b.id ?? 0) - (a.id ?? 0)
          )
          .slice(0, 4)
          .map((publication, index) => (
            <PublicationItem
              publication={publication}
              index={index}
              key={index}
            />
          ))}
      </div>
      <div className="flex justify-end mt-8">
        <Link
          href="/publications"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center gap-1 text-sm"
        >
          View All Publications
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
    </section>
  );
};

export default PublicationList;
