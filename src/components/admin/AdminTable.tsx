export interface AdminTableColumn<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export function AdminTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "Nothing here yet.",
}: {
  columns: AdminTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-dark/15 p-10 text-center text-sm text-dark/50">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-dark/10 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-dark/10 bg-dark/[0.02] text-xs font-semibold uppercase tracking-wide text-dark/50">
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-dark/5 last:border-0">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 align-middle ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
