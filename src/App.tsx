import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import TableComponent from "./components/TableComponent";
import Pagination from "./components/Pagination";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Post, Comment } from "./types";

const App: React.FC = () => {
  const [data, setData] = useState<Post[] | Comment[]>([]);
  const [contentType, setContentType] = useState<"Posts" | "Comments">("Posts");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch data when the content type changes
    fetchData(contentType);
    setCurrentPage(1); // Reset to first page when content type changes
  }, [contentType]);

  const fetchData = async (type: "Posts" | "Comments") => {
    setLoading(true);
    const url =
      type === "Posts"
        ? "https://jsonplaceholder.typicode.com/posts"
        : "https://jsonplaceholder.typicode.com/comments";
    try {
      const response = await axios.get<Post[] | Comment[]>(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const tableData = data
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .map((item) => {
        if ("title" in item) {
          return { ID: item.id, Title: item.title };
        } else {
          return { ID: item.id, Title: item.name };
        }
      });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${contentType}.xlsx`);
  };

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 lg:p-12 sm:p-8 overflow-x-hidden">
      <div className="bg-white shadow-md p-2 sm:p-4 lg:p-3 rounded-lg mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Dynamic Content Manager
        </h1>
      </div>

      <div className="bg-white shadow-sm p-2 sm:p-4 lg:p-3 rounded-lg mt-4">
        <h1 className="text-md sm:text-lg md:text-xl font-semibold">Fetch Content</h1>
      </div>

      <div className="flex sm:flex-row items-center mb-4 mt-6 ml-2 sm:mb-6 w-full">
        <h1 className="mr-3 font-semibold">Select Content Type</h1>
        <Dropdown value={contentType} onChange={setContentType} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-20 h-20 border-4 border-t-4 border-blue-500 rounded-full animate-spin shadow-lg"></div>
        </div>
      ) : (
        <>
          {/* If data is fetched, display table */}
          {data.length > 0 ? (
            <TableComponent
              data={currentData}
              columns={["ID", contentType === "Posts" ? "Title" : "Name"]}
            />
          ) : (
            <div className="text-center text-gray-500 mt-4">No data available</div>
          )}

          <Pagination
            totalRows={data.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          <div className="flex justify-center mt-6">
            <button
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 text-sm sm:text-base"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
