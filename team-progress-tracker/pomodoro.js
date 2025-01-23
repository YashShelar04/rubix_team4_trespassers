document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start")
    const pauseButton = document.getElementById("pause")
    const resetButton = document.getElementById("reset")
    const timerDisplay = document.getElementById("timer")
    const workTimeInput = document.getElementById("work-time")
    const breakTimeInput = document.getElementById("break-time")
  
    let isPaused = false
  
    function updateDisplay(timeLeft = 1500, isWorkSession = true) {
      const hours = Math.floor(timeLeft / 3600)
      const minutes = Math.floor((timeLeft % 3600) / 60)
      const seconds = timeLeft % 60
      const formattedTime =
        (hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "") +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`
      timerDisplay.textContent = formattedTime
      timerDisplay.style.color = isWorkSession ? "black" : "green"
    }
  
    function updateButtonStates(isRunning) {
      startButton.disabled = isRunning
      pauseButton.disabled = false
      resetButton.disabled = false
      pauseButton.textContent = isRunning ? "Pause" : "Resume"
    }
  
    function validateInput(input) {
      const value = Number.parseInt(input.value)
      return !isNaN(value) && value > 0
    }
  
    function sendMessage(message) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Message error:", chrome.runtime.lastError)
            reject(chrome.runtime.lastError)
          } else {
            resolve(response)
          }
        })
      })
    }
  
    startButton.addEventListener("click", async () => {
      if (!validateInput(workTimeInput) || !validateInput(breakTimeInput)) {
        alert("Please enter valid numbers for work and break times.")
        return
      }
  
      const workTime = Number.parseInt(workTimeInput.value) * 60 || 1500
      const breakTime = Number.parseInt(breakTimeInput.value) * 60 || 300
  
      try {
        await sendMessage({ action: "startTimer", workTime, breakTime })
        isPaused = false
        updateButtonStates(true)
      } catch (error) {
        console.error("Start error:", error)
      }
    })
  
    pauseButton.addEventListener("click", async () => {
      const action = isPaused ? "resumeTimer" : "pauseTimer"
      try {
        await sendMessage({ action })
        isPaused = !isPaused
        updateButtonStates(!isPaused)
      } catch (error) {
        console.error(`${action} error:`, error)
      }
    })
  
    resetButton.addEventListener("click", async () => {
      try {
        await sendMessage({ action: "resetTimer" })
        isPaused = false
        updateButtonStates(false)
      } catch (error) {
        console.error("Reset error:", error)
      }
    })
  
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "timerUpdate") {
        updateDisplay(message.timeLeft, message.isWorkSession)
        updateButtonStates(message.isRunning)
      }
    })
  
    // Initial state sync
    sendMessage({ action: "getTimerState" })
      .then((response) => {
        if (response) {
          updateDisplay(response.timeLeft, response.isWorkSession)
          updateButtonStates(response.isRunning)
          isPaused = !response.isRunning
        }
      })
      .catch((error) => console.error("Initial sync error:", error))
  })
  
  