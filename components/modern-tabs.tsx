"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
}

interface ModernTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function ModernTabs({ tabs, activeTab, onChange }: ModernTabsProps) {
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
  })
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    // Initialize the refs array with the correct length
    tabsRef.current = tabsRef.current.slice(0, tabs.length);
    
    // Find the active tab element
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (activeTabIndex !== -1 && tabsRef.current[activeTabIndex]) {
      const tabElement = tabsRef.current[activeTabIndex]
      if (tabElement) {
        // Calculate the position and width for the highlight
        setHighlightStyle({
          left: tabElement.offsetLeft,
          width: tabElement.offsetWidth,
        })
      }
    }
  }, [activeTab, tabs])

  return (
    <div className="relative mb-6 flex items-center space-x-1 overflow-x-auto border-b">
      {/* Highlight element that moves to the active tab */}
      <motion.div
        className="absolute bottom-0 h-0.5 rounded-full bg-secondary"
        animate={{
          left: highlightStyle.left,
          width: highlightStyle.width,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
      />

      {/* Tab buttons */}
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabsRef.current[index] = el
          }}
          className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.id 
              ? "text-secondary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
