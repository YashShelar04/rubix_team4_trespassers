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

// Function to update the timer display
const pomodoroTimer = {
  workDuration: 1500,
  breakDuration: 300,
  timeLeft: 1500,
  isWorkSession: true,
  isRunning: false,
  timerInterval: null,

  start(workTime, breakTime) {
    if (this.isRunning) return

    this.workDuration = workTime || this.workDuration
    this.breakDuration = breakTime || this.breakDuration
    this.timeLeft = this.isWorkSession ? this.workDuration : this.breakDuration

    this.isRunning = true
    this.runTimer()
  },

  runTimer() {
    clearInterval(this.timerInterval)
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--
        this.broadcastTimerUpdate()
      } else {
        this.switchSession()
      }
    }, 1000)
  },

  pause() {
    if (this.isRunning) {
      clearInterval(this.timerInterval)
      this.isRunning = false
      this.broadcastTimerUpdate()
    }
  },

  resume() {
    if (!this.isRunning) {
      this.isRunning = true
      this.runTimer()
      this.broadcastTimerUpdate()
    }
  },

  reset() {
    clearInterval(this.timerInterval)
    this.timeLeft = this.workDuration
    this.isWorkSession = true
    this.isRunning = false
    this.broadcastTimerUpdate()
  },

  switchSession() {
    this.isWorkSession = !this.isWorkSession
    this.timeLeft = this.isWorkSession ? this.workDuration : this.breakDuration

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: this.isWorkSession ? "Work Time!" : "Break Time!",
      message: this.isWorkSession ? "Get back to work!" : "Take a break to stay productive!",
      priority: 2,
    })

    this.broadcastTimerUpdate()
  },

  broadcastTimerUpdate() {
    chrome.runtime
      .sendMessage({
        action: "timerUpdate",
        timeLeft: this.timeLeft,
        isWorkSession: this.isWorkSession,
        isRunning: this.isRunning,
      })
      .catch((error) => console.error("Broadcast error:", error))
  },
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "startTimer":
      pomodoroTimer.start(message.workTime, message.breakTime)
      sendResponse({ status: "started" })
      break

    case "pauseTimer":
      pomodoroTimer.pause()
      sendResponse({ status: "paused" })
      break

    case "resumeTimer":
      pomodoroTimer.resume()
      sendResponse({ status: "resumed" })
      break

    case "resetTimer":
      pomodoroTimer.reset()
      sendResponse({ status: "reset" })
      break

    case "getTimerState":
      sendResponse({
        timeLeft: pomodoroTimer.timeLeft,
        isWorkSession: pomodoroTimer.isWorkSession,
        isRunning: pomodoroTimer.isRunning,
      })
      break

    default:
      console.error("Unknown action:", message.action)
      sendResponse({ error: "Unknown action" })
  }
  return true // Indicates that the response is sent asynchronously
})

