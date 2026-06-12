"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { FileText, Sparkles, ArrowRight, Upload, X, Building2, MapPin, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  file: File
  label: 'om' | 'rr' | 't12' | 'other'
}

interface UniversalInputProps {
  onAnalyze?: (input: { type: 'file'; value: string; files?: UploadedFile[] }) => void
  className?: string
  size?: 'default' | 'large'
  addressOnly?: boolean  // If true, only show address input and hide file uploads
}

const FILE_LABELS: { value: UploadedFile['label']; display: string; description: string }[] = [
  { value: 'om',    display: 'Offering Memo',  description: 'OM / Deal Package' },
  { value: 'rr',    display: 'Rent Roll',      description: 'Tenant rent roll' },
  { value: 't12',   display: 'T-12',           description: 'Trailing 12-month P&L' },
  { value: 'other', display: 'Other',          description: 'Any other document' },
]

// Mapbox configuration
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() || ""
const MAPBOX_DEBOUNCE_MS = 300

type MapboxFeature = {
  id: string
  text?: string
  place_name?: string
  context?: Array<{
    id?: string
    text?: string
    short_code?: string
  }>
}

type AddressSuggestion = {
  id: string
  fullAddress: string
  primaryText: string
  secondaryText: string
}

function mapMapboxFeatureToSuggestion(feature: MapboxFeature): AddressSuggestion {
  const fullAddress = feature.place_name || feature.text || ""
  const primaryText = feature.text || fullAddress
  const secondaryText = fullAddress.startsWith(`${primaryText}, `)
    ? fullAddress.slice(primaryText.length + 2)
    : fullAddress

  return {
    id: feature.id,
    fullAddress,
    primaryText,
    secondaryText,
  }
}

async function fetchMapboxFeatures(
  query: string,
  signal: AbortSignal,
): Promise<MapboxFeature[]> {
  if (!MAPBOX_ACCESS_TOKEN) return []
  
  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`)
  url.searchParams.set("access_token", MAPBOX_ACCESS_TOKEN)
  url.searchParams.set("autocomplete", "true")
  url.searchParams.set("types", "address,place")
  url.searchParams.set("country", "us")
  url.searchParams.set("limit", "5")

  const response = await fetch(url.toString(), { signal })
  if (!response.ok) {
    const error = new Error("Mapbox request failed") as Error & { status?: number }
    error.status = response.status
    throw error
  }
  const data = await response.json()
  return data.features || []
}

export function UniversalInput({ onAnalyze, className, size = 'default', addressOnly = false }: UniversalInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Address autocomplete state
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [addressLookupError, setAddressLookupError] = useState<string | null>(null)
  const [addressLookupDisabled, setAddressLookupDisabled] = useState(!MAPBOX_ACCESS_TOKEN)
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null)
  const [selectedValue, setSelectedValue] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestRef = useRef<AbortController | null>(null)

  const isLarge = size === 'large'

  // Address autocomplete effect
  useEffect(() => {
    const query = inputValue.trim()
    
    // If user selected a suggestion and hasn't changed it, don't search
    if (selectedSuggestionId && selectedValue === query) {
      return
    }
    
    // Reset selection when user types
    setSelectedSuggestionId(null)
    setSelectedValue("")
    
    if (query.length < 3) {
      setAddressLookupError(null)
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (!MAPBOX_ACCESS_TOKEN || addressLookupDisabled) {
      setAddressLookupError("Address autocomplete is unavailable. Add a valid NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN and restart the dev server if you just added it.")
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      requestRef.current?.abort()
      const controller = new AbortController()
      requestRef.current = controller
      setIsLoadingSuggestions(true)

      try {
        setAddressLookupError(null)
        const features = await fetchMapboxFeatures(query, controller.signal)
        const mapped = features.map(mapMapboxFeatureToSuggestion).filter(s => s.fullAddress)
        setSuggestions(mapped)
        setShowSuggestions(mapped.length > 0)

        if (mapped.length === 0) {
          setAddressLookupError("No matching addresses found yet. Keep typing a fuller street address.")
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        const status = (error as Error & { status?: number }).status
        if (status === 401 || status === 403) {
          setAddressLookupDisabled(true)
          setAddressLookupError("Address autocomplete is unavailable. Add a valid NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN and restart the dev server if you just added it.")
        } else {
          setAddressLookupError("We couldn't load address suggestions right now.")
        }
        console.error("[UniversalInput] Address lookup failed", error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSuggestions(false)
        }
      }
    }, MAPBOX_DEBOUNCE_MS)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      requestRef.current?.abort()
    }
  }, [addressLookupDisabled, inputValue, selectedSuggestionId, selectedValue])

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.fullAddress)
    setSelectedSuggestionId(suggestion.id)
    setSelectedValue(suggestion.fullAddress)
    setAddressLookupError(null)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const addFile = useCallback((file: File) => {
    const name = file.name.toLowerCase()
    let label: UploadedFile['label'] = 'other'
    if (name.includes('rent') || name.includes('rr') || name.includes('roll')) label = 'rr'
    else if (name.includes('t12') || name.includes('t-12') || name.includes('trailing') || name.includes('p&l') || name.includes('income')) label = 't12'
    else if (name.includes('om') || name.includes('memo') || name.includes('offering') || name.includes('package')) label = 'om'

    setUploadedFiles(prev => [...prev, { file, label }])
  }, [])

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const updateLabel = (index: number, label: UploadedFile['label']) => {
    setUploadedFiles(prev => prev.map((f, i) => i === index ? { ...f, label } : f))
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    Array.from(e.dataTransfer.files).forEach(file => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
        addFile(file)
      }
    })
  }, [addFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setIsDragging(false), [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach(addFile)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleAnalyze = useCallback(() => {
    const hasFiles = uploadedFiles.length > 0
    const hasAddress = inputValue.trim().length > 0

    // In address-only mode, just need the address
    if (addressOnly) {
      if (!hasAddress) return
      onAnalyze?.({
        type: 'file',
        value: inputValue.trim(),
        files: [],
      })
      return
    }

    // Normal mode: require both address AND at least one document
    if (!hasFiles || !hasAddress) return

    setIsAnalyzing(true)
    onAnalyze?.({
      type: 'file',
      value: inputValue.trim(),
      files: uploadedFiles,
    })
  }, [inputValue, uploadedFiles, onAnalyze, addressOnly])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault()
      if (showSuggestions && suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0])
      } else {
        handleAnalyze()
      }
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  // Require both address AND files in normal mode, address-only in landing mode
  const canAnalyze = addressOnly ? inputValue.trim().length > 0 : uploadedFiles.length > 0 && inputValue.trim().length > 0

  return (
    <div
      className={cn("relative w-full", className)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className={cn(
          "relative rounded-2xl transition-colors",
          isDragging && "bg-teal-50/30",
        )}
      >
        <div>
          {/* Property Address */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Property address
            </label>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
              <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                  if (addressLookupError) setAddressLookupError(null)
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Start typing a property address..."
                className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
              />
              {isLoadingSuggestions && (
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              )}
              {selectedSuggestionId && selectedValue === inputValue.trim() && !isLoadingSuggestions && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              )}
            </div>
            {addressLookupError && (
              <p className="mt-2 text-xs text-amber-600">{addressLookupError}</p>
            )}
            
            {/* Address suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-start gap-3 border-b border-slate-100 last:border-0"
                  >
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{suggestion.primaryText}</p>
                      <p className="text-xs text-slate-500 truncate">{suggestion.secondaryText}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Upload Documents — only show in full mode */}
          {!addressOnly && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Deal documents
              </label>

              {/* Drop zone */}
              <label
                className={cn(
                  "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                  isDragging
                    ? "border-teal-400 bg-teal-50/40"
                    : "border-slate-200 hover:border-teal-300 hover:bg-teal-50/20",
                  uploadedFiles.length > 0 ? "py-3" : "py-5"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.xlsx,.csv,.xls"
                  multiple
                  onChange={handleFileSelect}
                  className="sr-only"
                />
                <div className={cn(
                  "w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center transition-all",
                  isDragging && "bg-teal-100 scale-110"
                )}>
                  <Upload className={cn("h-5 w-5 text-teal-500", isDragging && "text-teal-700")} />
                </div>
                <div className="text-center">
                  <p className={cn("font-semibold text-slate-700 text-sm", isLarge && "text-base")}>
                    {isDragging ? "Drop files here" : uploadedFiles.length > 0 ? "Add more documents" : "Drop or click to upload"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    OM, Rent Roll, T-12, Operating Statements - PDF, Excel, CSV
                  </p>
                </div>
              </label>

              {/* Uploaded files list */}
              {uploadedFiles.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {uploadedFiles.map((uf, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{uf.file.name}</p>
                        <p className="text-xs text-slate-400">{(uf.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      {/* Label selector */}
                      <select
                        value={uf.label}
                        onChange={e => updateLabel(i, e.target.value as UploadedFile['label'])}
                        className="text-xs font-medium border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                      >
                        {FILE_LABELS.map(l => (
                          <option key={l.value} value={l.value}>{l.display}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFile(i)}
                        className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Analyze button */}
          <div className="mt-5">
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isAnalyzing}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 disabled:opacity-40 disabled:cursor-not-allowed",
                isLarge && "text-lg"
              )}
            >
              {isAnalyzing
                ? <><Sparkles className="h-4 w-4 animate-pulse" /><span>Analyzing...</span></>
                : <><span>{addressOnly ? "Continue" : "Analyze Property"}</span><ArrowRight className="h-4 w-4" /></>
              }
            </button>
            {!canAnalyze && !addressOnly && (
              <p className="text-center text-xs text-slate-400 mt-2">
                Add an address and at least one document to begin
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
