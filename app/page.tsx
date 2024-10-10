'use client';

import React, { useState } from 'react';
import useTasks from '@/shared/hooks/server/useTasks';

function TaskManager() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const {
    tasks,
    isLoadingTasks,
    isErrorTasks,
    errorTasks,
    isFetchingTasks,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  } = useTasks();

  if (isLoadingTasks) return <p className="mt-4 text-blue-300 text-center">Loading tasks...</p>;
  if (isErrorTasks && errorTasks) return <p className="mt-4 text-center text-red-500">Error: {errorTasks.message}</p>;

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-8 min-h-screen">
      <h2 className="border-yellow-500 mb-8 pb-2 border-b-4 font-extrabold text-4xl text-yellow-300">
        Task Manager
      </h2>

      {isFetchingTasks && <p className="mb-4 text-yellow-400">Updating tasks...</p>}

      <ul className="space-y-4 bg-gray-800 shadow-lg mb-8 p-6 rounded-lg w-full max-w-2xl">
        {tasks?.map((task) => (
          <li key={task.id} className="flex justify-between items-center bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition duration-200">
            <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {task.title}
            </span>
            <div className="flex space-x-3">
              <button
                onClick={() => updateTaskMutation.mutate({ taskId: task.id, updatedTask: { completed: !task.completed } })}
                className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  task.completed
                    ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-300'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-300'
                }`}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                onClick={() => deleteTaskMutation.mutate(task.id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full focus:ring-2 focus:ring-red-300 focus:ring-offset-2 font-semibold text-sm text-white transition-all duration-300 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4 mb-6 w-full max-w-2xl">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 bg-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={() => createTaskMutation.mutate({ title: newTaskTitle })}
          className={`py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            createTaskMutation.isPending ? 'bg-orange-500 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'
          } text-white focus:ring-blue-300`}
        >
          {createTaskMutation.isPending ? 'Creating...' : 'Add Task'}
        </button>
      </div>

      {createTaskMutation.isError && <p className="mb-2 text-red-500">Error: {createTaskMutation.error?.message}</p>}
      {createTaskMutation.isSuccess && <p className="mb-2 text-green-500">Task added successfully!</p>}
    </div>
  );
}

export default TaskManager;
