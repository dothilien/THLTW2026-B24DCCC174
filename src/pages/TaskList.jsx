const [search, setSearch] = useState("");

const filteredTasks = tasks.filter(t =>
  t.title.toLowerCase().includes(search.toLowerCase())
);

const columns = [
  { title: "Tên", dataIndex: "title" },
  {
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline)
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "Todo", value: "todo" },
      { text: "Doing", value: "doing" },
      { text: "Done", value: "done" }
    ],
    onFilter: (value, record) => record.status === value
  }
];