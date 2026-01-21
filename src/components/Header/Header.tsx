import { useState } from "react";
import "./Header.scss";
import { CiBellOn, CiCirclePlus, CiSettings } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiFilter, FiSearch } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import { TbFileExport, TbFileImport } from "react-icons/tb";

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSort: (key: "name" | "role" | "email") => void;
  statusFilter: string[];
  teamFilter: string[];
  setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setTeamFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

const STATUS_OPTIONS = ["Active", "Inactive", "Busy", "On Leave"];
const TEAM_OPTIONS = ["Design", "Product", "Engineering", "Marketing"];

export default function Header({
  searchTerm,
  onSearchChange,
  onSort,
  statusFilter,
  teamFilter,
  setStatusFilter,
  setTeamFilter,
}: HeaderProps) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="team-header">
      {/* main header */}
      <div className="team-header__main">
        <h1>Team members</h1>
        <div className="team-header__icons">
          <FiSearch />
          <FaWhatsapp />
          <CiSettings />
          <CiCirclePlus />
          <CiBellOn />
          <div className="avatar">A</div>
        </div>
      </div>

      {/* sub heder */}
      <div className="sub-header">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="actions">
          <button onClick={() => setOpenFilter((p) => !p)}>
            <FiFilter /> Filter
          </button>
          {openFilter && (
            <div className="filter-popup">
              <p>Status</p>
              {STATUS_OPTIONS.map((st) => (
                <label key={st}>
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(st)}
                    onChange={() =>
                      setStatusFilter((prev) =>
                        prev.includes(st)
                          ? prev.filter((s) => s !== st)
                          : [...prev, st],
                      )
                    }
                  />
                  {st}
                </label>
              ))}

              <p>Teams</p>
              {TEAM_OPTIONS.map((team) => (
                <label key={team}>
                  <input
                    type="checkbox"
                    checked={teamFilter.includes(team)}
                    onChange={() =>
                      setTeamFilter((prev) =>
                        prev.includes(team)
                          ? prev.filter((t) => t !== team)
                          : [...prev, team],
                      )
                    }
                  />
                  {team}
                </label>
              ))}
            </div>
          )}
          <button onClick={() => onSort("name")}>
            <LuArrowUpDown />
            Sort
          </button>
          <button>
            <TbFileImport />
            Import
          </button>
          <button>
            <TbFileExport />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
