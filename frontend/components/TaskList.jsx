import React from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, onTaskUpdated, onTaskDeleted, onTaskToggled }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
          onTaskToggled={onTaskToggled}
        />
      ))}
    </div>
  )
}

export default TaskList