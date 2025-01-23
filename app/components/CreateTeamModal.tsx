"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"

const domains = ["Web Development", "Mobile Development", "AI/ML", "Blockchain", "IoT", "Cybersecurity"]

// This would typically come from your backend or a larger dataset
const allSkills = [
  "JavaScript", "Python", "Java", "C++", "Ruby", "PHP", "Swift", "Kotlin", "Go", "Rust",
  "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask", "Spring Boot",
  "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch",
  "Git", "Jenkins", "Travis CI", "CircleCI",
  "Figma", "Sketch", "Adobe XD",
  "Agile", "Scrum", "Kanban"
]

export function CreateTeamModal({ isOpen, onClose, onCreateTeam }) {
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [domainPreferences, setDomainPreferences] = useState(["", "", ""])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [skillInput, setSkillInput] = useState("")
  const [openSkillSelect, setOpenSkillSelect] = useState(false)

  const handleCreateTeam = () => {
    const newTeam = {
      name: teamName,
      description: teamDescription,
      domainPreferences,
      requiredSkills: selectedSkills,
    }
    onCreateTeam(newTeam)
    onClose()
  }

  const handleSelectDomain = (value, index) => {
    const newPreferences = [...domainPreferences]
    newPreferences[index] = value
    setDomainPreferences(newPreferences)
  }

  const handleSelectSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
    setSkillInput("")
    setOpenSkillSelect(false)
  }

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(skillInput.toLowerCase()) &&
    !selectedSkills.includes(skill)
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">Create a New Team</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamName" className="text-right">
              Team Name
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamDescription" className="text-right">
              Description
            </Label>
            <Textarea
              id="teamDescription"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          {[0, 1, 2].map((index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`domainPref${index + 1}`} className="text-right">
                Domain Pref {index + 1}
              </Label>
              <Select
                onValueChange={(value) => handleSelectDomain(value, index)}
                value={domainPreferences[index]}
              >
                <SelectTrigger id={`domainPref${index + 1}`} className="col-span-3 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder={`Select domain preference ${index + 1}`} />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Required Skills
            </Label>
            <div className="col-span-3">
              <Popover open={openSkillSelect} onOpenChange={setOpenSkillSelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSkillSelect}
                    className="w-full justify-between bg-gray-700 border-gray-600 text-white"
                  >
                    {skillInput || "Select skills..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-gray-700 border-gray-600 text-white">
                  <Command>
                    <CommandInput
                      placeholder="Search skills..."
                      value={skillInput}
                      onValueChange={setSkillInput}
                      className="bg-gray-700 text-white"
                    />
                    <CommandList>
                      <CommandEmpty>No skill found.</CommandEmpty>
                      <CommandGroup>
                        {filteredSkills.map((skill) => (
                          <CommandItem
                            key={skill}
                            onSelect={() => handleSelectSkill(skill)}
                            className="text-white hover:bg-gray-600"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {skill}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-cyan-800 text-cyan-100"
                  >
                    {skill}
                    <button
                      className="ml-1 text-cyan-300 hover:text-cyan-100"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateTeam} className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
