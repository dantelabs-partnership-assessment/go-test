import React, { useState } from 'react'
import { updateTask, deleteTask, toggleTask } from '../services/api'

function TaskItem({ task, onTaskUpdated, onTaskDeleted, onTaskToggled }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = async () => {
    try {
      const updatedTask = await updateTask(task.id, {
        ...task,
        title: editedTitle,
        description: editedDescription
      })
      onTaskUpdated(updatedTask)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }
    
    try {
      setIsDeleting(true)
      await deleteTask(task.id)
      onTaskDeleted(task.id)
    } catch (error) {
      console.error('Failed to delete task:', error)
      setIsDeleting(false)
    }
  }

  const handleToggle = async () => {
    try {
      const toggledTask = await toggleTask(task.id)
      onTaskToggled(toggledTask)
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      task.completed ? 'border-green-500' : 'border-blue-500'
    }`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task description"
            rows="3"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggle}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <h3 className={`text-lg font-semibold ${
                  task.completed ? 'task-completed' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
              </div>
              <p className={`mt-2 text-gray-600 ${
                task.completed ? 'task-completed' : ''
              }`}>
                {task.description}
              </p>
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                <span>Created: {formatDate(task.createdAt)}</span>
                <span>•</span>
                <span>Updated: {formatDate(task.updatedAt)}</span>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              task.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskItem