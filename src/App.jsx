import { useState, useEffect } from "react";

const SITES = [
  { id: "google", name: "Google", url: "https://www.google.com/search?q=" },
  { id: "yahoo", name: "Yahoo JAPAN", url: "https://search.yahoo.co.jp/search?p=" },
  { id: "rakuten", name: "楽天市場", url: "https://search.rakuten.co.jp/search/mall/" },
  { id: "amazon", name: "Amazon", url: "https://www.amazon.co.jp/s?k=" },
  { id: "mercari", name: "メルカリ", url: "https://www.mercari.com/jp/search/?keyword=" },
  { id: "yahoo_auc", name: "ヤフオク", url: "https://auctions.yahoo.co.jp/search/search?p=" },
  { id: "yahoo_shop", name: "Yahooショッピング", url: "https://shopping.yahoo.co.jp/search?p=" },
  { id: "monotaro", name: "モノタロウ", url: "https://www.monotaro.com/s/?q=" },
  { id: "aliexpress", name: "AliExpress", url: "https://www.aliexpress.com/wholesale?SearchText=" },
];

const MODES = {
  car: "車名",
  part: "部品名",
  code: "部品番号",
};

export default function App() {
  const [mode, setMode] = useState("part");
  const [keyword, setKeyword] = useState("");
  const [activeSites, setActiveSites] = useState(["google"]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fp_sites"));
    if (saved) setActiveSites(saved);
  }, []);

  const toggleSite = (id) => {
    const updated = activeSites.includes(id)
      ? activeSites.filter(s => s !== id)
      : [...activeSites, id];

    setActiveSites(updated);
    localStorage.setItem("fp_sites", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (!keyword || activeSites.length === 0) return;

    activeSites.forEach(id => {
      const site = SITES.find(s => s.id === id);
      window.open(site.url + encodeURIComponent(keyword), "_blank");
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "24px",
      background: "linear-gradient(135deg,#141e30,#243b55)",
      color: "#e6f7ff",
      fontFamily: "Segoe UI"
    }}>
      <h1>FRIEND PARTS Mk-V+</h1>
      <p style={{ opacity: 0.7 }}>Cyber Search Assist System</p>

      {/* 検索モード + 入力 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          style={{ padding: "8px" }}
        >
          {Object.entries(MODES).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="車名 / 部品名 / 部品番号など"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none"
          }}
        />
      </div>

      {/* 🔥 サイト選択（復活ポイント） */}
      <div style={{ marginBottom: "12px" }}>
        <p style={{ marginBottom: "6px" }}>Search Modules</p>
        {SITES.map(site => (
          <label key={site.id} style={{ marginRight: "12px" }}>
            <input
              type="checkbox"
              checked={activeSites.includes(site.id)}
              onChange={() => toggleSite(site.id)}
            />{" "}
            {site.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          background: "#00e5ff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        EXECUTE SEARCH
      </button>
    </div>
  );
}