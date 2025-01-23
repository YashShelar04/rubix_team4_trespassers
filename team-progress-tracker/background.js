// Function to check if a task is due
function isTaskDue(task) {
    if (!task.dueTime) return false
  
    const now = new Date()
    const [hours, minutes] = task.dueTime.split(":")
    const dueTime = new Date()
    dueTime.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0)
  
    // Task is due if current time is past the due time
    return now >= dueTime
  }
  
  // Function to check tasks and create notifications
  function checkTasks() {
    chrome.storage.sync.get("tasks", ({ tasks }) => {
      if (!tasks) return
  
      tasks.forEach((task) => {
        if (isTaskDue(task) && !task.notified) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Task Due!",
            message: `Task "${task.name}" assigned to ${task.assignee} was due at ${task.dueTime}!`,
            priority: 2,
          })
  
          // Mark task as notified to prevent multiple notifications
          task.notified = true
        }
      })
  
      // Save the updated tasks back to storage
      chrome.storage.sync.set({ tasks })
    })
  }
  
  // Check tasks every minute
  chrome.alarms.create("taskChecker", { periodInMinutes: 1 })
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "taskChecker") {
      checkTasks()
    }
  })
  
  // Also check tasks when the extension is installed or updated
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed/updated.")
    checkTasks()
  })
  
  