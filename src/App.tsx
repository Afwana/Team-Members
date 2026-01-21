import { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import MemberTable from "./components/MemberTable/MemberTable";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "role" | "email" | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [teamFilter, setTeamFilter] = useState<string[]>([]);

  const handleSort = (key: "name" | "role" | "email") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSort={handleSort}
        statusFilter={statusFilter}
        teamFilter={teamFilter}
        setStatusFilter={setStatusFilter}
        setTeamFilter={setTeamFilter}
      />
      <MemberTable
        searchTerm={searchTerm}
        sortKey={sortKey}
        sortOrder={sortOrder}
        statusFilter={statusFilter}
        teamFilter={teamFilter}
      />
    </div>
  );
}
