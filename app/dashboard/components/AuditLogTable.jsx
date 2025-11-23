


'use client';

import React, { useState } from "react";
import RestoreButton from './RestoreButton';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Icon components remain the same
const IconSearch = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"></path>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"></circle>
  </svg>
);
// IconDownload component (kept for future use if needed)
// const IconDownload = ({ className = "h-5 w-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
//     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12"></path>
//     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 11l4 4 4-4"></path>
//     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3"></path>
//   </svg>
// );

const AuditLogTable = ({
  rows = [],
  total = 0,
  loading = false,
  page = 1,
  pageSize = 25,
  search = '',
  onPageChange,
  onPageSizeChange,
  onSearch,
  onRestoreSuccess,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(total, page * pageSize);

  // A helper function to pretty-print the JSON data
  const formatData = (data, actionType) => {
    try {
      const parsed = JSON.parse(data);
      
      if (actionType === 'edited') {

        const oldData = parsed.original;
        // Use 'new' or 'updated' for the final state
        const newData = parsed.new || parsed.updated; 

        if (!oldData || !newData) return 'Data structure mismatch for edited log.';

        // Compare objects to find changed fields
        const changes = Object.keys(newData).reduce((acc, key) => {
          // Compare primitive values (safe for string, number, boolean)
          if (String(oldData[key]) !== String(newData[key])) { 
            acc.push({
              field: key,
              oldValue: oldData[key],
              newValue: newData[key]
            });
          }
          return acc;
        }, []);

        if (changes.length === 0) return 'No visible changes tracked.';

        // Return a cleaner, compact display for edited records
        return (
          <div className="text-xs space-y-1">
            <strong>Changes:</strong>
            {changes.map((change, index) => (
              <p key={index} className="truncate">
                <span className="font-semibold capitalize">{change.field.replace(/_/g, ' ')}:</span> 
                from '{String(change.oldValue || 'N/A')}' to '{String(change.newValue || 'N/A')}'
              </p>
            ))}
          </div>
        );
      }
      
      else if (actionType === 'deleted') {

        const originalRecord = parsed.original;
        
        if (!originalRecord) return 'Data structure mismatch for deleted log.';

        // Select specific fields to show the user
        const selectedFields = {
          id: originalRecord.id,
          name: originalRecord.full_name || originalRecord.name || 'N/A',
          email: originalRecord.email,
          state: originalRecord.state,
          LGA: originalRecord.lga_name || originalRecord.lga,
          organisation: originalRecord.organisation || 'N/A',
          // Use a timestamp field if available
          'creation time': originalRecord.created_at ? new Date(originalRecord.created_at).toLocaleString() : 'N/A'
        };
        
        // Return a clean list display for deleted records
        return (
          <div className="text-xs space-y-1">
            <strong>Deleted Record:</strong>
            {Object.entries(selectedFields).map(([key, value]) => (
              <p key={key} className="truncate">
                <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value || 'N/A'}
              </p>
            ))}
          </div>
        );
      }
      
      return data; // Fallback for other action types (e.g., 'created')
    } catch (e) {
      // console.error("Error parsing audit log data:", e);
      return data; // Fallback if data is not valid JSON
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold">Audit Log</h3>
          <div className="text-sm text-gray-400">
            {loading ? "Loading..." : `Showing ${startIndex}-${endIndex} of ${total}`}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => {}} // Hook up to handleDownload if implemented
            className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1 text-sm text-white"
            aria-label="Download Audit Log"
            disabled={loading}
          >
            <IconDownload className="h-4 w-4" />
            Export
          </button> */}
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
              aria-label="Search audit logs"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-gray-200 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><IconSearch /></span>
          </div>
        </div>
      </div>
      
      {/* WRAPPED TABLE FOR HORIZONTAL SCROLL AND WIDER DATA COLUMN */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">ID</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Action</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Table</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Record ID</th>
              {/* Added min-w-80 to ensure data column is wide enough */}
              <th scope="col" className="py-3 px-6 min-w-80 whitespace-nowrap">Data</th> 
              <th scope="col" className="py-3 px-6 whitespace-nowrap">User</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Timestamp</th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">Loading...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">No data</td>
              </tr>
            ) : (
              rows.map((log) => (
                <tr key={log.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-900">
                  <td className="py-4 px-6 font-medium text-white whitespace-nowrap">{log.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{log.action_type}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{log.table_name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{log.original_id}</td>
                  {/* Removed max-w-xs and added whitespace-normal for wrapping */}
                  <td className="py-4 px-6 text-gray-300 min-w-80 whitespace-normal">
                    {formatData(log.data, log.action_type)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{log.changed_by}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <RestoreButton 
                      auditLogId={log.id}
                      actionType={log.action_type}
                      originalId={log.original_id}
                      onRestoreSuccess={onRestoreSuccess}
                    />
                  </td>
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
};

export default AuditLogTable;