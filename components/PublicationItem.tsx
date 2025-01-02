import ExtLink from "./ExtLink";

interface Props {
  publication: any;
  index: number;
}

const PublicationItem = ({ publication, index }: Props): JSX.Element => {
  return (
    <div className="mt-4 mb-8">
      <p className="text-base text-gray-500">
        {publication.author}{" "}
        <b>
          <i>{publication.title}</i>
        </b>
        <br />
        <a className="text-sm">{publication.conference}</a>
      </p>
      <p className="text-gray-500 flex justify-end text-sm bold">
        {publication.links && publication.links.length > 0 && (
          <p className="text-gray-500 flex justify-end text-sm bold">
            {publication.links && publication.links.length > 0 && (
              <p className="text-gray-500 flex justify-end text-sm bold">
                {publication.links.map((linkItem: any, idx: any) =>
                  linkItem.name === "status" ? (
                    <span
                      className="border-b-[1px] border-gray-600 transition hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-sm"
                        key={idx}
                    >
                      {" "}
                      {linkItem.url} &nbsp;
                    </span>
                  ) : (
                    <ExtLink href={linkItem.url} key={idx}>
                      [{linkItem.name}] &nbsp;
                    </ExtLink>
                  )
                )}
              </p>
            )}
          </p>
        )}
      </p>
    </div>
  );
};

export default PublicationItem;
