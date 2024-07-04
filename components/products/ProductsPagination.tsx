import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({page,totalPages,}: ProductsPaginationProps) {

  const pages = Array.from({length: totalPages}, (_,i) => i +1)

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
      <Link
        href={`/admin/products/?page=${page - 1}`}
        className="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 text-sm  text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
      >
        &laquo;
    </Link>
      )}

      {pages.map(currentPage => (
        <Link
          key={currentPage}
          href={`/admin/products/?page=${currentPage}`}
          className={`${page === currentPage ? 'font-black bg-amber-400' : 'bg-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/admin/products/?page=${page + 1}`}
          className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 text-sm  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
