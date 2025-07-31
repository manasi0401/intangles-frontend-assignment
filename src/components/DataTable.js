import React, { useState } from 'react';
import '../App.css';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'Event Count', direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = parseFloat(a[sortConfig.key]);
    const valB = parseFloat(b[sortConfig.key]);
    return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
  });

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Event Data Table</h2>
      <div className="sort-controls">
        <div className="sort-group">
          <label>Sort By:</label>
          <select
            value={sortConfig.key}
            onChange={(e) => handleSort(e.target.value, sortConfig.direction)}
          >
            <option value="Event Count">Event Count</option>
            <option value="Event duration">Event Duration</option>
          </select>
        </div>
        <div className="sort-group">
          <label>Order:</label>
          <select
            value={sortConfig.direction}
            onChange={(e) => handleSort(sortConfig.key, e.target.value)}
          >
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>
        </div>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Event Count</th>
            <th>Event Duration</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => {
            let locationObj = {};
            try {
              locationObj = row["location"] ? JSON.parse(row["location"].replace(/'/g, '"')) : {};
            } catch (e) {
              console.error("Failed to parse location:", row["location"]);
            }
            const latitude = locationObj.latitude ?? 'N/A';
            const longitude = locationObj.longitude ?? 'N/A';
            return (
              <tr key={idx}>
                <td>{row["Event Count"]}</td>
                <td>{row["Event duration"]}</td>
                <td>{`(${latitude}, ${longitude})`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

