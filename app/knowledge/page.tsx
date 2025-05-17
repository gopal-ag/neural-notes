"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Filter, Search, ZoomIn, ZoomOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockKnowledgeGraph } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("All")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [nodes, setNodes] = useState(mockKnowledgeGraph.nodes)
  const [links, setLinks] = useState(mockKnowledgeGraph.links)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)

  // Filter nodes based on search and group
  useEffect(() => {
    let filteredNodes = mockKnowledgeGraph.nodes

    if (searchTerm) {
      filteredNodes = filteredNodes.filter((node) => node.label.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedGroup !== "All") {
      filteredNodes = filteredNodes.filter((node) => node.group === selectedGroup)
    }

    const nodeIds = new Set(filteredNodes.map((node) => node.id))

    // Only include links where both source and target nodes are in the filtered set
    const filteredLinks = mockKnowledgeGraph.links.filter(
      (link) => nodeIds.has(link.source) && nodeIds.has(link.target),
    )

    setNodes(filteredNodes)
    setLinks(filteredLinks)
  }, [searchTerm, selectedGroup])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const getNodeColor = (group: string, mastery: number) => {
    const opacity = 0.3 + (mastery / 100) * 0.7

    if (group === "AI") return `rgba(124, 131, 253, ${opacity})`
    if (group === "CS") return `rgba(72, 229, 194, ${opacity})`
    if (group === "Web") return `rgba(255, 170, 100, ${opacity})`
    if (group === "Math") return `rgba(255, 102, 196, ${opacity})`

    return `rgba(150, 150, 150, ${opacity})`
  }

  const getNodeSize = (mastery: number) => {
    return 20 + (mastery / 100) * 30
  }

  const handleNodeHover = (id: string | null) => {
    setHoveredNode(id)
  }

  const getRelatedLinks = (nodeId: string | null) => {
    if (!nodeId) return new Set<string>()

    const relatedLinks = new Set<string>()
    links.forEach((link) => {
      if (link.source === nodeId || link.target === nodeId) {
        relatedLinks.add(`${link.source}-${link.target}`)
      }
    })

    return relatedLinks
  }

  const relatedLinks = getRelatedLinks(hoveredNode)

  return (
    <div className="gradient-mesh min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-grotesk text-3xl font-bold">Knowledge Graph</h1>
            <p className="text-muted-foreground">Visualize your learning connections</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="CS">Computer Science</option>
              <option value="Web">Web Development</option>
              <option value="Math">Mathematics</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="neumorphic md:col-span-1">
            <CardHeader>
              <CardTitle>Mastery Legend</CardTitle>
              <CardDescription>Your knowledge level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Beginner</span>
                  <span className="text-sm">Expert</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="progress-fill h-full w-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[rgba(124,131,253,0.2)] text-[rgb(124,131,253)]">AI</Badge>
                  <Badge className="bg-[rgba(72,229,194,0.2)] text-[rgb(72,229,194)]">CS</Badge>
                  <Badge className="bg-[rgba(255,170,100,0.2)] text-[rgb(255,170,100)]">Web</Badge>
                  <Badge className="bg-[rgba(255,102,196,0.2)] text-[rgb(255,102,196)]">Math</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Node Size</h4>
                <p className="text-sm text-muted-foreground">Larger nodes indicate higher mastery level</p>
              </div>

              {hoveredNode && (
                <div className="rounded-md border p-3">
                  <h4 className="font-medium">{nodes.find((n) => n.id === hoveredNode)?.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    Mastery: {nodes.find((n) => n.id === hoveredNode)?.mastery}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="neumorphic md:col-span-3">
            <CardHeader>
              <CardTitle>Interactive Knowledge Map</CardTitle>
              <CardDescription>Hover over nodes to see connections</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[600px] w-full overflow-hidden rounded-md bg-card">
                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox="0 0 1000 600"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
                >
                  <defs>
                    <marker
                      id="arrowhead"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerUnits="strokeWidth"
                      markerWidth="10"
                      markerHeight="10"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(124, 131, 253, 0.5)" />
                    </marker>
                  </defs>

                  {/* Links */}
                  {links.map((link) => {
                    const source = nodes.find((n) => n.id === link.source)
                    const target = nodes.find((n) => n.id === link.target)

                    if (!source || !target) return null

                    // Calculate positions (more spread out)
                    const sourceX = 100 + ((Number.parseInt(source.id) * 120) % 800)
                    const sourceY = 100 + ((Number.parseInt(source.id) * 80) % 400)
                    const targetX = 100 + ((Number.parseInt(target.id) * 120) % 800)
                    const targetY = 100 + ((Number.parseInt(target.id) * 80) % 400)

                    const isHighlighted = relatedLinks.has(`${link.source}-${link.target}`)

                    return (
                      <motion.line
                        key={`${link.source}-${link.target}`}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredNode ? (isHighlighted ? 0.8 : 0.1) : 0.5,
                          strokeWidth: isHighlighted ? 3 : 2,
                        }}
                        transition={{ duration: 0.3 }}
                        x1={sourceX}
                        y1={sourceY}
                        x2={targetX}
                        y2={targetY}
                        stroke={isHighlighted ? "rgba(124, 131, 253, 0.8)" : "rgba(124, 131, 253, 0.5)"}
                        strokeWidth={isHighlighted ? 3 : 2}
                        markerEnd="url(#arrowhead)"
                        className="node-link"
                      />
                    )
                  })}

                  {/* Nodes */}
                  {nodes.map((node) => {
                    // Calculate positions (more spread out)
                    const x = 100 + ((Number.parseInt(node.id) * 120) % 800)
                    const y = 100 + ((Number.parseInt(node.id) * 80) % 400)
                    const radius = getNodeSize(node.mastery)
                    const color = getNodeColor(node.group, node.mastery)
                    const isHighlighted =
                      hoveredNode === node.id ||
                      links.some(
                        (link) =>
                          (link.source === node.id || link.target === node.id) &&
                          (link.source === hoveredNode || link.target === hoveredNode),
                      )

                    return (
                      <motion.g
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredNode ? (isHighlighted ? 1 : 0.3) : 1,
                          scale: 1,
                          filter: isHighlighted ? "brightness(1.2)" : "brightness(1)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="knowledge-node"
                        onMouseEnter={() => handleNodeHover(node.id)}
                        onMouseLeave={() => handleNodeHover(null)}
                      >
                        <circle cx={x} cy={y} r={radius} fill={color} />
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fill="white"
                          fontSize="12"
                          style={{ pointerEvents: "none" }}
                        >
                          {node.label}
                        </text>
                      </motion.g>
                    )
                  })}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
