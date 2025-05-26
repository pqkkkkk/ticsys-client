"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

// Danh sách ngân hàng mẫu
const banks = [
  { id: "vietcombank", name: "Vietcombank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "vietinbank", name: "VietinBank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "bidv", name: "BIDV", logo: "/placeholder.svg?height=40&width=40" },
  { id: "agribank", name: "Agribank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "techcombank", name: "Techcombank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "mbbank", name: "MB Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "vpbank", name: "VPBank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "acb", name: "ACB", logo: "/placeholder.svg?height=40&width=40" },
  { id: "sacombank", name: "Sacombank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "tpbank", name: "TPBank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "hdbank", name: "HDBank", logo: "/placeholder.svg?height=40&width=40" },
  { id: "ocb", name: "OCB", logo: "/placeholder.svg?height=40&width=40" },
]

export function BankSelector({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBanks = banks.filter((bank) => bank.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm ngân hàng..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredBanks.map((bank) => (
          <button
            key={bank.id}
            className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent"
            onClick={() => onSelect(bank.id)}
          >
            <div className="mb-2 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={bank.logo || "/placeholder.svg"}
                alt={bank.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-center text-sm font-medium">{bank.name}</span>
          </button>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          Không tìm thấy ngân hàng phù hợp với tìm kiếm của bạn.
        </div>
      )}
    </div>
  )
}
