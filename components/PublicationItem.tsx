import ExtLink from "./ExtLink";

interface Props {
  publication: any;
  index: number;
}

const PublicationItem = ({ publication, index }: Props): JSX.Element => {
  return (
    <div className="mt-6 mb-8 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
      <div className="flex justify-between items-start gap-6">
        {/* Left side - Publication details */}
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

        {/* Right side - Links */}
        {publication.links && publication.links.length > 0 && (
          <div className="flex flex-col items-end gap-2 min-w-[120px]">
            {publication.links.map((linkItem: any, idx: any) =>
              linkItem.name === "status" ? (
                <span
                  key={idx}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {linkItem.url}
                </span>
              ) : (
                <ExtLink
                  href={linkItem.url}
                  key={idx}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center gap-1 text-sm"
                >
                  {linkItem.name === "pdf" ? (
                    <>
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
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      PDF
                    </>
                  ) : linkItem.name === "video" ? (
                    <>
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
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect
                          x="1"
                          y="5"
                          width="15"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                      </svg>
                      Video
                    </>
                  ) : (
                    <>
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
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      {linkItem.name}
                    </>
                  )}
                </ExtLink>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationItem;
