<<<<<<< HEAD
export function downloadCsv(
  filename: string,
  rows: Record<string, string | number | boolean>[],
) {
  const headers = Object.keys(rows[0] ?? { message: "No data" });
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
=======
export function downloadCsv(filename: string, rows: Record<string, string | number | boolean>[]) {
  const headers = Object.keys(rows[0] ?? { message: "No data" });
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
