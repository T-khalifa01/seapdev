"use client";

import React, { useRef, useState, useEffect } from "react";

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Icon Components (kept here as they are helpers for this component only)
const IconSearch = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"></path>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"></circle>
  </svg>
);
const IconDownload = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12"></path>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 11l4 4 4-4"></path>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3"></path>
  </svg>
);
const IconSort = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18"></path>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 12h12"></path>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 18h4"></path>
  </svg>
);
const IconEdit = () => (
  <svg className={"h-4 w-4"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);
const IconTrash = () => (
  <svg className={"h-4 w-4"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);


const DashTable = ({
  title = "Table",
  columns = [],
  rows = [],
  total = 0,
  loading = false,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = '',
  sort = null,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onSort,
  onPatchCell,
  onDeleteRow,
  exportAllUrl = null,
  exportAllFn = null,
}) => {
  // ---------- UI State ----------
  const [selectedCell, setSelectedCell] = useState(null); // { rowId, colKey }
  const [editing, setEditing] = useState(null); // { rowId, colKey, value }
  const [sortDropdownOpen, setSortDropdownOpen] = useState(null); // The key of the column with the open dropdown

  // ---------- Column widths (colgroup) ----------
  const initialWidths = columns.map((c) => c.width ?? 150);
  const [colWidths, setColWidths] = useState(initialWidths);
  const widthsRef = useRef([...initialWidths]);
  const colRefs = useRef([]); // refs to <col> elements
  const dragInfoRef = useRef(null);
  const rafRef = useRef(null);
  const tableContainerRef = useRef(null);

  const derivedColumns = [
    { key: "__actions", label: "Actions", width: 80, sortable: false, type: "none" },
    { key: "__sn", label: "S/N", width: 80, sortable: false, type: "none" },
    ...columns,
  ];

  // Column resize logic (rAF + refs) - unchanged as it's a UI concern
  const startDrag = (clientX, colIndex) => {
    const startX = clientX;
    const startWidth = widthsRef.current[colIndex];
    dragInfoRef.current = { startX, startWidth, colIndex };

    const onMove = (evt) => {
      const di = dragInfoRef.current;
      if (!di) return;
      const deltaX = evt.clientX - di.startX;
      const newWidth = Math.max(di.startWidth + deltaX, 50); // min width
      widthsRef.current[di.colIndex] = newWidth;
      if (colRefs.current[di.colIndex]) {
        colRefs.current[di.colIndex].style.width = `${newWidth}px`;
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
        });
      }
    };

    const onUp = () => {
      setColWidths((prev) => {
        const copy = [...widthsRef.current];
        return copy;
      });
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      dragInfoRef.current = null;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleMouseDown = (e, colIndex) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, colIndex);
  };

  useEffect(() => {
    colRefs.current = new Array(derivedColumns.length).fill(null);
    widthsRef.current = colWidths.slice(0, derivedColumns.length);
  }, [derivedColumns.length]);

  useEffect(() => {
    derivedColumns.forEach((_, idx) => {
      if (colRefs.current[idx]) {
        const w = colWidths[idx] ?? (derivedColumns[idx].width ?? 150);
        colRefs.current[idx].style.width = `${w}px`;
      }
    });
  }, [colWidths, derivedColumns]);


  // ---------- Sorting UI Logic ----------
  const handleSortClick = (col) => {
    if (!col.sortable) return;
    setSortDropdownOpen(sortDropdownOpen === col.key ? null : col.key);
  };

  const handleSortOptionClick = (key, direction) => {
    onSort(key, direction);
    setSortDropdownOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableContainerRef.current && !tableContainerRef.current.contains(event.target)) {
        setSortDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- Selection & Inline Edit ----------
  const handleCellClick = (rowId, colKey) => {
    if (colKey === '__actions' || colKey === '__sn') return;
    const originalCol = columns.find(c => c.key === colKey);
    if (!originalCol) {
      setSelectedCell(null);
      return;
    }
    setSelectedCell({ rowId, colKey });
  };
  
  const startEdit = () => {
    if (!selectedCell) return;
    const cellValue = rows.find(r => r.id === selectedCell.rowId)?.[selectedCell.colKey];
    if (cellValue === undefined) return;
    setEditing({ rowId: selectedCell.rowId, colKey: selectedCell.colKey, value: cellValue });
  };

  const cancelEdit = () => {
    setEditing(null);
    setSelectedCell(null);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await onPatchCell(editing.rowId, editing.colKey, editing.value);
    setEditing(null);
    setSelectedCell(null);
  };


  // ---------- Download CSV helpers (Updated) ----------
  const toCSV = (rowsToExport) => {
    const headers = derivedColumns.filter((c) => c.key !== "__actions").map((c) => c.label);
    const keys = derivedColumns.filter((c) => c.key !== "__actions").map((c) => c.key);
    const lines = [];
    lines.push(headers.join(","));
    for (const r of rowsToExport) {
      const row = keys.map((k) => {
        if (k === "__sn") return "";
        const v = r[k] ?? "";
        return `"${String(v).replace(/"/g, '""')}"`;
      });
      lines.push(row.join(","));
    }
    return lines.join("\n");
  };

  // const handleDownloadCurrent = () => {
  //   if (!window.confirm("Do you want to download the data for the current page?")) return;
  //   const csv = toCSV(rows);
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `${title?.replace(/\s+/g, "_") || "table"}_page${page}.csv`;
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // // New function to handle "Download All" with confirmation
  // const handleDownloadAll = () => {
  //   if (!window.confirm("Do you want to download all data? This may take some time.")) return;
  //   // Call the provided function from the parent component
  //   if (exportAllFn) {
  //     exportAllFn();
  //   } else if (exportAllUrl) {
  //     window.open(exportAllUrl, "_blank");
  //   } else {
  //     console.warn("No exportAllFn or exportAllUrl provided to DashTable.");
  //   }
  // };

  const handleDownloadCurrent = () => {
    if (!window.confirm("Do you want to download the data for the current page as CSV?")) return;
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title?.replace(/\s+/g, "_") || "table"}_page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // This is the updated function
  const handleDownloadAll = () => {
    if (!window.confirm("Do you want to download all data as CSV? This may take some time.")) return;

    // We now pass the current search and sort state to the export function.
    if (exportAllFn) {
      exportAllFn({
        search,
        sortKey: sort?.key,
        sortDir: sort?.dir,
      });
    } else if (exportAllUrl) {
      window.open(exportAllUrl, "_blank");
    } else {
      console.warn("No exportAllFn or exportAllUrl provided to DashTable.");
    }
  };


  // ---------- Render ----------
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(total, page * pageSize);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="text-sm text-gray-400">
            {loading ? "Loading..." : `Showing ${startIndex}-${endIndex} of ${total}`}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300">Rows:</label>
            <select
              aria-label="Rows per page"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-gray-700 text-sm py-1 px-2 rounded"
            >
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              aria-label="Search table"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><IconSearch /></span>
          </div>

          {/* Updated Download buttons */}
          <div className="relative inline-block">
            <button
              onClick={handleDownloadCurrent}
              title="Download current page"
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              <IconDownload /> <span className="text-sm">Page</span>
            </button>
            <button
              onClick={handleDownloadAll}
              title="Download all rows"
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 ml-2"
            >
              <IconDownload /> <span className="text-sm">All</span>
            </button>
          </div>
        </div>
      </div>

      <div ref={tableContainerRef} className="overflow-x-auto">
        <table className="w-full table-fixed min-w-max border-collapse">
          <colgroup>
            {derivedColumns.map((col, idx) => (
              <col
                key={col.key}
                ref={(el) => (colRefs.current[idx] = el)}
                style={{ width: `${colWidths[idx] ?? col.width ?? 150}px` }}
              />
            ))}
          </colgroup>

          <thead>
            <tr>
              {derivedColumns.map((col, idx) => {
                const isSorted = sort?.key === col.key;
                const isSortable = col.sortable;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-300 border-b border-r border-gray-700 relative group"
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      {isSortable && (
                        <div className="relative">
                          <button
                            aria-label={`Sort by ${col.label}`}
                            onClick={() => handleSortClick(col)}
                            className="p-1 rounded hover:bg-gray-700"
                          >
                            <IconSort />
                          </button>
                          {sortDropdownOpen === col.key && (
                            <div className="absolute top-full left-0 z-30 mt-2 bg-gray-700 rounded-md shadow-lg overflow-hidden w-28">
                              <button
                                onClick={() => handleSortOptionClick(col.key, "asc")}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                              >
                                A-Z (Asc)
                              </button>
                              <button
                                onClick={() => handleSortOptionClick(col.key, "desc")}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                              >
                                Z-A (Desc)
                              </button>
                              {isSorted && (
                                <button
                                  onClick={() => onSort(null, null)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                                >
                                  Clear Sort
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      role="separator"
                      aria-orientation="vertical"
                      tabIndex={0}
                      onMouseDown={(e) => handleMouseDown(e, idx)}
                      className="absolute top-0 right-0 h-full w-2 cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    />
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={derivedColumns.length} className="py-6 text-center text-gray-400">Loading...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={derivedColumns.length} className="py-6 text-center text-gray-400">No data</td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                  {derivedColumns.map((col) => {
                    if (col.key === "__actions") {
                      const isEnabled = selectedCell && selectedCell.rowId === row.id;
                      return (
                        <td key={col.key} className="px-3 py-2 text-sm border-r border-gray-700">
                          <div className="flex gap-2">
                            <button
                              className={`p-1 rounded ${isEnabled ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-700 opacity-50 cursor-not-allowed"}`}
                              onClick={() => {
                                if (!isEnabled) return;
                                startEdit();
                              }}
                              aria-disabled={!isEnabled}
                              title="Edit selected cell"
                            >
                              <IconEdit />
                            </button>
                            <button
                              className={`p-1 rounded bg-red-600 hover:bg-red-500`}
                              onClick={() => onDeleteRow(row.id)}
                              title="Delete row"
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </td>
                      );
                    }
                    if (col.key === "__sn") {
                      return (
                        <td key={col.key} className="px-4 py-3 text-sm font-medium border-r border-gray-700">
                          { (page - 1) * pageSize + rowIndex + 1 }
                        </td>
                      );
                    }
                    const isEditingThis = editing && editing.rowId === row.id && editing.colKey === col.key;
                    const isSelected = selectedCell && selectedCell.rowId === row.id && selectedCell.colKey === col.key;
                    const displayValue = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis border-r border-gray-700 relative ${isSelected ? 'border-2 border-purple-600' : ''}`}
                        onClick={() => handleCellClick(row.id, col.key)}
                      >
                        {isEditingThis ? (
                          <div className="flex items-center gap-2">
                            <input
                              className="bg-gray-700 px-2 py-1 rounded text-sm w-full"
                              value={editing.value}
                              onChange={(e) => setEditing((s) => ({ ...s, value: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit();
                                if (e.key === 'Escape') cancelEdit();
                              }}
                              autoFocus
                            />
                            <div className="flex gap-1">
                              <button type="button" onClick={saveEdit} className="px-2 py-1 bg-green-600 rounded text-sm">Save</button>
                              <button type="button" onClick={cancelEdit} className="px-2 py-1 bg-gray-700 rounded text-sm">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="truncate">{displayValue}</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`px-2 py-1 rounded ${page === 1 ? "bg-gray-700 opacity-50" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            Prev
          </button>
          <span>Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const newPage = Math.min(Math.max(1, Number(e.target.value || 1)), totalPages);
              onPageChange(newPage);
            }}
            className="w-16 bg-gray-800 px-2 py-1 rounded text-sm"
          />
          <span>of {totalPages}</span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-2 py-1 rounded ${page === totalPages ? "bg-gray-700 opacity-50" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashTable;