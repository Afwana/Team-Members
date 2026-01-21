import "./MemberTable.scss";
import { teamMembers } from "./MemberData";
import { FiArrowLeft, FiArrowRight, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

type MemberTableProps = {
  searchTerm: string;
  sortKey: "name" | "role" | "email" | null;
  sortOrder: "asc" | "desc";
};

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  "Active",
  "Inactive",
  "Busy",
  "On Leave",
  "Away",
  "Do Not Disturb",
];

export default function MemberTable({
  searchTerm,
  sortKey,
  sortOrder,
}: MemberTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  //   const [members, setMembers] = useState(teamMembers);
  const [openStatusId, setOpenStatusId] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState<"top" | "bottom">(
    "bottom",
  );

  const popupRef = useRef<HTMLDivElement>(null);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const filteredMembers = teamMembers.filter((user) => {
    const term = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey].toLowerCase();
    const bValue = b[sortKey].toLowerCase();

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedMembers.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = sortedMembers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const allSelected =
    currentData.length > 0 &&
    currentData.every((user) => selectedIds.includes(user.id));

  const someSelected =
    currentData.some((user) => selectedIds.includes(user.id)) && !allSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpenStatusId(null);
      }
    };

    const handleScroll = () => setOpenStatusId(null);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="team-table-wrapper">
      <div className="team-table">
        <table>
          <thead>
            <tr>
              <th className="th-name">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(currentData.map((u) => u.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
                Name
              </th>
              <th>Status</th>
              <th>Role</th>
              <th>Email address</th>
              <th>Teams</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {currentData.map((user) => (
              <tr key={user.id}>
                <td className="user">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds((prev) => [...prev, user.id]);
                      } else {
                        setSelectedIds((prev) =>
                          prev.filter((id) => id !== user.id),
                        );
                      }
                    }}
                  />
                  <img src={user.avatar} alt={user.name} />
                  <div>
                    <p className="name">{user.name}</p>
                    <span>{user.username}</span>
                  </div>
                </td>

                <td className="status-cell">
                  <div className="status">
                    {user.status.map((st) => (
                      <button
                        key={st}
                        className={`badge ${st.toLowerCase().replaceAll(" ", "-")}`}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const spaceBelow = window.innerHeight - rect.bottom;

                          setPopupPosition(spaceBelow < 200 ? "top" : "bottom");
                          setOpenStatusId(user.id);
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                  {openStatusId === user.id && (
                    <div
                      ref={popupRef}
                      className={`status-popup ${popupPosition}`}
                    >
                      <div className="arrow" />

                      {STATUS_OPTIONS.map((status) => {
                        const isSelected = user.status.includes(status);

                        return (
                          <div
                            key={status}
                            className={`popup-item ${isSelected ? "selected" : ""}`}
                            // onClick={() => {
                            //   setMembers((prev) =>
                            //     prev.map((m) =>
                            //       m.id === user.id
                            //         ? {
                            //             ...m,
                            //             status: isSelected
                            //               ? m.status.filter((s) => s !== status)
                            //               : [...m.status, status],
                            //           }
                            //         : m,
                            //     ),
                            //   );
                            // }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                            />
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>

                <td>{user.role}</td>
                <td className="email">{user.email}</td>

                <td>
                  <div className="teams">
                    {user.teams.map((team) => (
                      <span
                        key={team}
                        className={`team-badge ${team.toLowerCase()}`}
                      >
                        {team}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="actions">
                  <FiTrash2 />
                  <FiEdit2 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <FiArrowLeft />
          Previous
        </button>

        <div className="pages">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <FiArrowRight />
          Next
        </button>
      </div>
    </div>
  );
}
