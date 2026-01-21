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
      />
      <MemberTable
        searchTerm={searchTerm}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </div>
  );
}
