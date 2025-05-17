import React, { useEffect, useState } from "react";

const dummyTasks = [
  { id: 1, text: "Belajar React", completed: false },
  { id: 2, text: "Kerjakan tugas kampus", completed: false },
  { id: 3, text: "Olahraga pagi", completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    setTasks(saved?.length ? saved : dummyTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText("");
    setShowInput(false);
  };

  const toggle = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-start py-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-4 flex flex-col justify-between min-h-[90vh]">
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div>
            <h1 className="text-xl font-semibold">Simple</h1>
            <p className="text-gray-500">To-do List</p>
            <p className="text-sm text-gray-600 mt-2">{today}</p>
          </div>

          {/* Tasks */}
          <div className="space-y-2 overflow-y-auto max-h-[40vh] pr-1 flex-1">
            {tasks.map((t) => (
              <div
                key={t.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  t.completed ? "bg-blue-50 opacity-50" : "bg-blue-100"
                }`}
              >
                <span
                  className={`text-sm flex-1 ${
                    t.completed ? "line-through" : ""
                  }`}
                >
                  {t.text}
                </span>
                <button
                  onClick={() => toggle(t.id)}
                  className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ml-2 ${
                    t.completed
                      ? "bg-green-600 border-green-600"
                      : "bg-white border-gray-400"
                  }`}
                >
                  {t.completed && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  -
                </button>
              </div>
            ))}
          </div>

          {/* Input (muncul saat tombol ditekan) */}
          {showInput && (
            <div className="space-y-2">
              <textarea
                className="w-full p-2 border rounded-xl resize-none focus:outline-none shadow"
                rows={2}
                placeholder="Tambah aktivitas..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                onClick={addTask}
                className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700"
              >
                Tambah
              </button>
            </div>
          )}
        </div>

        {/* Tombol utama: toggle input */}
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-blue-600 text-white w-full py-3 rounded-xl text-xl font-bold shadow hover:bg-blue-700"
        >
          {showInput ? "×" : "+"}
        </button>
      </div>
    </div>
  );
}
