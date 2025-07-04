import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/" || location.pathname === "/home") {
    return null;
  }

  const marginLeft = pathnames.length === 1
    ? "ml-[6.75rem]" 
    : "ml-[3rem]";

  return (
    <nav className={`flex items-center ${marginLeft} mt-1 text-[1.1rem] text-black fixed`}>
      <ul className="flex text-black">
        <li>
          <Link
            to="/home"
            className="flex text-[var(--sidebar-color)] items-center"
          >
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={pathTo} className="flex">
              <span className="mx-1 font-semibold">⟩</span>
              {isLast ? (
                <span className="text-black capitalize">{value}</span>
              ) : (
                <Link
                  to={pathTo}
                  className="text-[var(--sidebar-color)] capitalize"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
