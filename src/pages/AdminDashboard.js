import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const NavigateToHome = () => {
    navigate("/");
  };

  const fetchUrls = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/adminpage?page=${page}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setUrls(res.data.urls);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls(currentPage);
  }, [currentPage]);

  if (loading) return <p className="load">Loading URLs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, Admin!</h2>
      <table className="url-table">
        
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((urlObj) => (
            <tr key={urlObj._id}>

              <td>
                <a href={urlObj.longURL} target="_blank" rel="noreferrer"className="long-url">{urlObj.longURL} </a>
              </td>

              <td>
                <a href={`http://localhost:5000/${urlObj.shortID}`}  target="_blank" rel="noreferrer" className="short-url">{urlObj.shortURL}</a>
              </td>

              <td>{urlObj.clicks ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}> Prev </button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} > Next </button>
      </div>

        <button type="submit" onClick={NavigateToHome}>HomePage</button>

    </div>
  );
}

export default AdminDashboard;

