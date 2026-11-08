import data from "../components/data/publications.json";
import Link from "next/link";

const Publications = (): JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Publications
      </h1>
      <div className="space-y-8">
        {[...data]
          .sort(
            (a: { id?: number }, b: { id?: number }) =>
              (a.id ?? 0) - (b.id ?? 0)
          )
          .map((publication: any) => {
            const links = Array.isArray(publication.links)
              ? publication.links
              : [];

            return (
              <div
                key={publication.title}
                className="p-4 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors duration-200"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {publication.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {publication.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      {publication.conference}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-[160px]">
                    {links.map((linkItem: any, idx: number) =>
                      typeof linkItem.name === "string" &&
                      linkItem.name.toLowerCase() === "status" ? (
                        <span
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {linkItem.url}
                        </span>
                      ) : (
                        <a
                          key={idx}
                          href={linkItem.url}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center gap-1 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkItem.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="mt-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center gap-1 text-sm"
        >
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
            className="mr-1"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Publications;
