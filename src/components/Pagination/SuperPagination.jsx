import { Pagination } from "flowbite-react";
import React from "react";

export default function SuperPagination({ pageSize, currentPage, setCurrentPage }) {
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={pageSize}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
