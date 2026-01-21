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
};

export default function Header({
  searchTerm,
  onSearchChange,
  onSort,
}: HeaderProps) {
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
          <button>
            <FiFilter /> Filter
          </button>
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
