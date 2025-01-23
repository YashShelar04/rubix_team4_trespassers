function isOverdue(dueTime) {
    if (!dueTime) return false
  
    const now = new Date()
    const [hours, minutes] = dueTime.split(":")
    const dueDate = new Date()
    dueDate.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0)
  
    return now > dueDate
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form")
    const taskList = document.getElementById("task-list")
    const themeToggle = document.getElementById("theme-toggle")
  
    // Theme handling
    const getTheme = () => {
      return chrome.storage.sync.get("theme").then((result) => result.theme || "light")
    }
  
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme)
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙"
      chrome.storage.sync.set({ theme })
    }
  
    // Initialize theme
    getTheme().then(setTheme)
  
    themeToggle.addEventListener("click", () => {
      getTheme().then((currentTheme) => {
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        setTheme(newTheme)
      })
    })
  
    const createTaskElement = (task, index) => {
      const taskItem = document.createElement("li")
  
      // Create task info div
      const taskInfo = document.createElement("div")
      const taskName = document.createElement("strong")
      taskName.textContent = task.name
  
      const taskMeta = document.createElement("p")
      taskMeta.className = "task-meta"
      taskMeta.textContent = `Assigned to: ${task.assignee}`
      if (task.dueTime) {
        const isTaskOverdue = isOverdue(task.dueTime)
        taskMeta.textContent += ` | Due by: ${task.dueTime}`
        if (isTaskOverdue) {
          taskMeta.textContent += " (OVERDUE)"
          taskMeta.style.color = "var(--error, #e74c3c)"
        }
      }
      if (task.priority) {
        taskMeta.textContent += ` | Priority: ${task.priority}`
      }
  
      taskInfo.appendChild(taskName)
      taskInfo.appendChild(taskMeta)
  
      // Create actions div
      const actionsDiv = document.createElement("div")
      actionsDiv.className = "task-actions"
  
      const doneButton = document.createElement("button")
      doneButton.className = "mark-done"
      doneButton.textContent = "✓ Done"
      doneButton.dataset.index = index
  
  
  
      actionsDiv.appendChild(doneButton)
    
  
      taskItem.appendChild(taskInfo)
      taskItem.appendChild(actionsDiv)
  
      return taskItem
    }
  
    const loadTasks = () => {
      chrome.storage.sync.get("tasks", ({ tasks }) => {
        taskList.innerHTML = ""
        tasks = tasks || []
        tasks.forEach((task, index) => {
          const taskItem = createTaskElement(task, index)
          taskList.appendChild(taskItem)
        })
      })
    }
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const task = document.getElementById("task").value
      const assignee = document.getElementById("assignee").value
      const dueTime = document.getElementById("due-time")?.value
      const priority = document.getElementById("priority")?.value
  
      chrome.storage.sync.get("tasks", ({ tasks }) => {
        tasks = tasks || []
        tasks.push({
          name: task,
          assignee,
          completed: false,
          dueTime: dueTime || null,
          priority: priority || "medium",
          createdAt: new Date().toISOString(),
        })
        chrome.storage.sync.set({ tasks }, loadTasks)
      })
  
      taskForm.reset()
    })
  
    taskList.addEventListener("click", (e) => {
      const index = Number.parseInt(e.target.getAttribute("data-index"))
  
      if (e.target.classList.contains("mark-done")) {
        chrome.storage.sync.get("tasks", ({ tasks }) => {
          tasks.splice(index, 1)
          chrome.storage.sync.set({ tasks }, loadTasks)
        })
      }
  
      if (e.target.classList.contains("edit-task")) {
        chrome.storage.sync.get("tasks", ({ tasks }) => {
          const task = tasks[index]
          console.log("Edit task:", task)
        })
      }
    })
  
    loadTasks()
  })
  
  