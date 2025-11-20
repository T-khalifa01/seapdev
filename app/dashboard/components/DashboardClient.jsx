'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashCard from "../../(common)/commponents/specific/DashCard";
import DashTable from "../../(common)/commponents/specific/DashTable";
import { useDashContext } from '../../(common)/commponents/specific/DashContext';
import RegisterUserForm from './RegisterUserForm';
import AuditLogTable from './AuditLogTable';
import UserManagement from './UserManagement';
import { useSession } from "next-auth/react";

// Helper hook, keeping this in page.jsx for now
const useDebounced = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// First, define a reusable function for the download logic.
const fetchAndDownload = async (tableName, { search, sortKey, sortDir }) => {
  try {
    const url = `/api/export/${tableName}?search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server responded with a ${response.status} status.`);
    }

    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `${tableName}_export_${Date.now()}.csv`;
    if (contentDisposition) {
       const matches = /filename="([^"]+)"/.exec(contentDisposition);
      if (matches && matches[1]) {
            filename = matches[1];
      }
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(blobUrl);
    a.remove();

  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download the file. Please try again.");
  }
};

const tableConfigs = {
  lgaForms: {
    columns: [
      { key: "timestamp", label: "Timestamp", sortable: true, type: "date" },
      { key: "state", label: "State", sortable: true, type: "string" },
      { key: "lga_name", label: "LGA", sortable: true, type: "string" },
      { key: "full_name", label: "LGA Chairman name", sortable: false, type: "string" },
      { key: "phone_number", label: "Phone", sortable: false, type: "string" },
      { key: "email", label: "Email", sortable: false, type: "string" },
      { key: "office_address", label: "LGA Chairman Office Address", sortable: false, type: "string" },
      { key: "estimated_lga_population", label: "estimated LGA population", sortable: false, type: "string" },
      { key: "households_without_electricity", label: "households with out electricity", sortable: false, type: "string" },
      { key: "power_distribution_challenges", label: "power distribution challenges", sortable: false, type: "string" },
      { key: "communities_not_connected_to_national_grid", label: "communities not connected to national grid", sortable: false, type: "string" },
      { key: "support_for_hybrid_power", label: "hybrid power support", sortable: false, type: "string" },
      { key: "registered_tricycles", label: "registered tricycles", sortable: false, type: "string" },
      { key: "registered_motorcycles", label: "registered motorcycles", sortable: false, type: "string" },
      { key: "registered_buses", label: "registered buses", sortable: false, type: "string" },
      { key: "support_for_cng_elec_conversion", label: "support for CNG conversion", sortable: false, type: "string" },
      { key: "top_crops_grown", label: "crops grown in LGA", sortable: false, type: "string" },
      { key: "existing_agroprocessing_centerds", label: "exixting processing center", sortable: false, type: "string" },
      { key: "agroprocessing_opportunities_needed", label: "agroprocessing opportunities needed", sortable: false, type: "string" },
      { key: "land_for_agro_expansion", label: "available land for agro expansion", sortable: false, type: "string" },
      { key: "farming_hecters", label: "available land for agro", sortable: false, type: "string" },
      { key: "known_miniral_deposits", label: "miniral deposits", sortable: false, type: "string" },
      { key: "types_of_minerals", label: "types of minirals", sortable: false, type: "string" },
      { key: "licensed_miners_present", label: "present miners", sortable: false, type: "string" },
      { key: "support_needed_to_attract_mining_investment", label: "support to attract miners", sortable: false, type: "string" },
      { key: "designated_industrial_parks", label: "designated industrial parks", sortable: false, type: "string" },
      { key: "industries_that_would_thrive", label: "sutaible industires for LGA", sortable: false, type: "string" },
      { key: "present_road_power_water_access_for_industries", label: "infrastructure for industries", sortable: false, type: "string" },
      { key: "support_asset_allocation_for_investments", label: "will support allocation for investments", sortable: false, type: "string" },
      { key: "number_of_33kv_transformer_present", label: "33kv transformer present", sortable: false, type: "string" },
      { key: "number_of_11kv_transformer_present", label: "11kv transformer present ", sortable: false, type: "string" },
      { key: "number_of_415kv_transformer_present", label: "415kv transformer present", sortable: false, type: "string" },
      { key: "investments_priorities", label: "investments priorities", sortable: false, type: "string" },
      { key: "willing_to_meet_technical_advisors", label: "willing to meet technical advisors", sortable: false, type: "string" },
      { key: "primary_cooking_fuel", label: "primary cooking fuel", sortable: false, type: "string" },
      { key: "cooking_gas_price", label: "cooking gas price", sortable: false, type: "string" },
      { key: "households_with_cooking_gas_percentage", label: "% homes with cooking gas", sortable: false, type: "string" },
      { key: "synced_at", label: "synced at", sortable: true, type: "date" },
    ],
    fetchData: async ({ page, pageSize, search, sortKey, sortDir }) => {
       const res = await fetch(
        `/api/lga-forms?page=${page}&pageSize=${pageSize}&search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`
      );
      return await res.json();
    },
    patchCell: async (id, key, value) => {
      const res = await fetch(`/api/lga-forms`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id, key, value })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.row;
      },
      deleteRow: async (id) => {
        const res = await fetch(`/api/lga-forms?id=${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      },
    // exportAllFn: async ({ search, sortKey, sortDir }) => {
    // // You can add logic here to trigger a server-side export.
    // // A simple approach is to open a new tab with the same query parameters.
    // const url = `/api/lga-forms/export/google_form_responses?search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`;
    // window.open(url, "_blank");
    // },
    exportAllFn: (params) => fetchAndDownload("google_form_responses", params),
  },
  investmentForms: {
    columns: [
      { key: "created_at", label: "Timestamp", sortable: true, type: "date" },
      { key: "state", label: "state", sortable: true, type: "string" },
      { key: "lga", label: "LGA", sortable: true, type: "string" },
      { key: "full_name", label: "Name", sortable: true, type: "string" },
      { key: "phone", label: "Phone", sortable: false, type: "string" },
      { key: "email", label: "Email", sortable: false, type: "string" },
      { key: "identity", label: "identity", sortable: true, type: "string" },
      { key: "organisation", label: "Org Name", sortable: true, type: "string" },
      { key: "organisation_type", label: "Org type", sortable: true, type: "string" },
      { key: "sector_of_interest", label: "sectore of intrest", sortable: true, type: "string" },
      { key: "investment_capacity", label: "Investment Capacity", sortable: true, type: "string" },
      { key: "time_frame", label: "time frame", sortable: true, type: "string" },
      { key: "mode_of_investment", label: "mode of investment", sortable: true, type: "string" },
      { key: "previous_experience", label: "previous experience", sortable: false, type: "string" },
      { key: "contact_method", label: "contact method", sortable: true, type: "string" },
      { key: "message", label: "message", sortable: false, type: "string" },
      { key: "receive_updates", label: "receive updates", sortable: true, type: "string" },
    ],
    fetchData: async ({ page, pageSize, search, sortKey, sortDir }) => {
      const res = await fetch(
        `/api/investment-forms?page=${page}&pageSize=${pageSize}&search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`
      );
      return await res.json();
    },
    patchCell: async (id, key, value) => {
      const res = await fetch(`/api/investment-forms`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, key, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.row;
    },
    deleteRow: async (id) => {
      const res = await fetch(`/api/investment-forms?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    },
    // exportAllFn: async ({ search, sortKey, sortDir }) => {
    // const url = `/api/investment-forms/export/investment_submissions?search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`;
    // window.open(url, "_blank");
    // },
    exportAllFn: (params) => fetchAndDownload("investment_submissions", params),
  },
  contactForms: {
    columns: [
      { key: "created_at", label: "Timestamp", sortable: true, type: "date" },
      { key: "full_name", label: "Name", sortable: true, type: "string" },
      { key: "phone", label: "Phone", sortable: true, type: "string" },
      { key: "email", label: "Email", sortable: true, type: "string" },
      { key: "identity", label: "identity", sortable: false, type: "string" },
      { key: "organisation", label: "organisation", sortable: false, type: "string" },
      { key: "organisation type", label: "organisation type", sortable: false, type: "string" },
      { key: "message", label: "Message", sortable: false, type: "string" },
    ],
    fetchData: async ({ page, pageSize, search, sortKey, sortDir }) => {
      const res = await fetch(
        `/api/contact-forms?page=${page}&pageSize=${pageSize}&search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`
      );
      return await res.json();
    },
    patchCell: async (id, key, value) => {
      const res = await fetch(`/api/contact-forms`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, key, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.row;
    },
    deleteRow: async (id) => {
      const res = await fetch(`/api/contact-forms?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    },
    // exportAllFn: async ({ search, sortKey, sortDir }) => {
    // const url = `/api/contact-forms/export/contact_submissions?search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`;
    // window.open(url, "_blank");
    // },
    exportAllFn: (params) => fetchAndDownload("contact_submissions", params),
  },
  subscriptions: {
    columns: [
      { key: "created_at", label: "Timestamp", sortable: true, type: "date" },
      { key: "email", label: "Email", sortable: true, type: "string" },
      { key: "type", label: "Type", sortable: true, type: "string" },
    ],
    fetchData: async ({ page, pageSize, search, sortKey, sortDir }) => {
      const res = await fetch(
        `/api/subscription-forms?page=${page}&pageSize=${pageSize}&search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`
      );
      return await res.json();
    },
    patchCell: async (id, key, value) => {
      const res = await fetch(`/api/subscription-forms`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, key, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data.row;
    },
    deleteRow: async (id) => {
      const res = await fetch(`/api/subscription-forms?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    },
    // exportAllFn: async ({ search, sortKey, sortDir }) => {
    // const url = `/api/investment-forms/export/subscriptions?search=${search || ""}&sortKey=${sortKey || ""}&sortDir=${sortDir || ""}`;
    // window.open(url, "_blank");
    // },
    exportAllFn: (params) => fetchAndDownload("subscriptions", params),
  },
  auditLog: {
    endpoint: "/api/audit-log",
    name: "Audit Log",
    columns: [
      { key: 'id', label: 'ID', Sortable: true , type: 'string' },
      { key: 'action_type', label: 'Action', Sortable: true , type: 'string' },
      { key: 'table_name', label: 'Table', Sortable: true , type: 'string'},
      { key: 'original_id', label: 'Original ID', Sortable: true , type: 'string'},
      { key: 'data', label: 'Original Data', Sortable: false, type: 'string' },
      { key: 'changed_by', label: 'USER', Sortable: false, type: 'string' },
      { key: 'created_at', label: 'Timestamp', Sortable: true, type: 'date' },
      { key: 'actions', label: 'Actions', Sortable: false , type: 'string' },
    ],
    searchable: true,
    defaultSort: 'created_at',
    defaultSortDir: 'DESC',
    isPaginated: true,
  },
};


export default function DashboardClient({ session }) {
  const { activeKey } = useDashContext();

  // New State Management
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(null); // { key, direction: 'asc' | 'desc' }
  const debouncedSearch = useDebounced(search);

  // State for the audit log table
  const [auditRows, setAuditRows] = useState([]);
  const [auditTotal, setAuditTotal] = useState(0);
  const [auditLoading, setAuditLoading] = useState(true);
  const [auditPage, setAuditPage] = useState(1);
  const [auditPageSize, setAuditPageSize] = useState(25);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditSort, setAuditSort] = useState({ key: 'created_at', dir: 'DESC' });


  const [cardData, setCardData] = useState([
    { title: 'Number of LGAs filled', value: 'Loading...' },
    { title: 'Number of investment forms filled', value: 'Loading...' },
    { title: 'Number of contact forms', value: 'Loading...' },
    { title: 'Number of subscribers', value: 'Loading...' },
  ]);

  // The single data fetching function
  const fetchData = useCallback(async () => {
    const config = tableConfigs[activeKey];
    if (!config || activeKey === 'dashboard') {
      setRows([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const data = await config.fetchData({
        page,
        pageSize,
        search: debouncedSearch,
        sortKey: sort?.key,
        sortDir: sort?.direction,
      });
      setRows(data.rows || []);
      setTotal(data.total ?? data.totalCount ?? 0);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [activeKey, page, pageSize, debouncedSearch, sort]);

  useEffect(() => {
    // This is the key change. We reset the page to 1 when search or table changes.
    // This prevents showing page 3 of table A, then trying to show page 3 of table B which may not exist.
    setPage(1);
    fetchData();
  }, [activeKey, debouncedSearch, sort]);

  // Separate effect for pagination
  useEffect(() => {
    fetchData();
  }, [page, pageSize, fetchData]);

  // New handler functions passed to DashTable
  const handlePageChange = (newPage) => setPage(newPage);
  const handlePageSizeChange = (newSize) => setPageSize(newSize);
  const handleSearch = (newSearch) => setSearch(newSearch);
  const handleSort = (key, direction) => setSort({ key, direction });

  const handlePatchCell = async (id, key, value) => {
    const config = tableConfigs[activeKey];
    if (!config || !config.patchCell) return;
    setLoading(true);
    try {
      const updatedRow = await config.patchCell(id, key, value);
      setRows(prevRows => prevRows.map(row => row.id === id ? updatedRow : row));
    } catch (error) {
      console.error("Failed to patch cell:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async (id) => {
    const config = tableConfigs[activeKey];
    if (!config || !config.deleteRow) return;
    if (!window.confirm("Are you sure you want to delete this row?")) return;
    
    setLoading(true);
    try {
      await config.deleteRow(id);
      setRows(prevRows => prevRows.filter(row => row.id !== id));
      setTotal(prevTotal => prevTotal - 1);
    } catch (error) {
      console.error("Failed to delete row:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use a single useEffect to fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    // Fetch card data
    try {
      const countsResponse = await fetch('/api/counts');
      const countsData = await countsResponse.json();
      setCardData([
        { title: 'Number of LGAs filled', value: countsData.lgaCount.toLocaleString() },
        { title: 'Number of investment forms filled', value: countsData.investmentCount.toLocaleString() },
        { title: 'Number of contact forms', value: countsData.contactCount.toLocaleString() },
        { title: 'Number of subscribers', value: countsData.subscriptionsCount.toLocaleString() },
      ]);
    } catch (error) {
      console.error("Could not fetch dashboard counts:", error);
    }

    // Fetch audit log data
    setAuditLoading(true);
    try {
      const url = `/api/audit-log?page=${auditPage}&pageSize=${auditPageSize}&search=${auditSearch}&sortKey=${auditSort.key}&sortDir=${auditSort.dir}`;
      const auditResponse = await fetch(url);
      if (!auditResponse.ok) {
        throw new Error('Failed to fetch audit log');
      }
      const auditData = await auditResponse.json();
      setAuditRows(auditData.data);
      setAuditTotal(auditData.totalCount);
    } catch (error) {
      console.error("Could not fetch audit log:", error);
    } finally {
      setAuditLoading(false);
    }
  }, [auditPage, auditPageSize, auditSearch, auditSort]);

  useEffect(() => {
    fetchDashboardData();
  }, [auditPage, auditPageSize, auditSearch, auditSort, fetchDashboardData]);

  // We need new handlers for the audit table
  const handleAuditPageChange = (newPage) => setAuditPage(newPage);
  const handleAuditPageSizeChange = (newSize) => setAuditPageSize(newSize);
  const handleAuditSearch = (newSearch) => {
    setAuditPage(1); // Reset page on new search
    setAuditSearch(newSearch);
  };
  const handleAuditSort = (newSort) => setAuditSort(newSort);

  // Check if session is a valid object before rendering
  if (!session) {
    return null; // Or show a loading state, the middleware will handle redirect
  }
  
  const tableConfig = tableConfigs[activeKey];
  
  return (
    <>
      {activeKey === 'dashboard' && (
        <>
          <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardData.map((card, index) => (
              <DashCard key={index} title={card.title} value={card.value} />
            ))}
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Changes (Audit Log)</h3>
            <AuditLogTable
              rows={auditRows}
              total={auditTotal}
              loading={auditLoading}
              page={auditPage}
              pageSize={auditPageSize}
              search={auditSearch}
              onPageChange={setAuditPage}
              onPageSizeChange={(size) => { setAuditPage(1); setAuditPageSize(size); }}
              onSearch={(s) => { setAuditPage(1); setAuditSearch(s); }}
              onRestoreSuccess={() => { setAuditPage(1); setAuditSearch(''); fetchDashboardData(); }}
            />
          </section>
        </>
      )}

      {activeKey === 'register-user' && <RegisterUserForm />}

      {activeKey === 'user-management' && <UserManagement />}

      {activeKey !== 'dashboard' && tableConfig && (
        <DashTable
          title={activeKey}
          columns={tableConfig.columns}
          rows={rows}
          total={total}
          loading={loading}
          page={page}
          pageSize={pageSize}
          search={search}
          sort={sort}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          onSort={handleSort}
          onPatchCell={handlePatchCell}
          onDeleteRow={handleDeleteRow}
          exportAllFn={tableConfig.exportAllFn}
        />
      )}
    </>
  );
};