"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Lấy tên ngân hàng dựa trên ID
const getBankName = (bankId) => {
  const banks = {
    vietcombank: "Vietcombank",
    vietinbank: "VietinBank",
    bidv: "BIDV",
    agribank: "Agribank",
    techcombank: "Techcombank",
    mbbank: "MB Bank",
    vpbank: "VPBank",
    acb: "ACB",
    sacombank: "Sacombank",
    tpbank: "TPBank",
    hdbank: "HDBank",
    ocb: "OCB",
  }
  return banks[bankId] || "Ngân hàng"
}

export function BankLinkForm({ bankId, onSubmit, onBack }) {
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra lỗi
    const newErrors = {}

    if (!accountNumber.trim()) {
      newErrors.accountNumber = "Vui lòng nhập số tài khoản"
    } else if (!/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = "Số tài khoản chỉ được chứa các chữ số"
    }

    if (!accountName.trim()) {
      newErrors.accountName = "Vui lòng nhập tên chủ tài khoản"
    }

    if (!agreed) {
      newErrors.agreed = "Bạn cần đồng ý với điều khoản và điều kiện"
    }

    setErrors(newErrors)

    // Nếu không có lỗi, tiến hành submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center">
        <Button type="button" variant="ghost" size="sm" onClick={onBack} className="mr-2 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">{getBankName(bankId)}</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-number">Số tài khoản</Label>
          <Input
            id="account-number"
            placeholder="Nhập số tài khoản ngân hàng"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          {errors.accountNumber && <p className="text-sm text-destructive">{errors.accountNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-name">Tên chủ tài khoản</Label>
          <Input
            id="account-name"
            placeholder="Nhập tên chủ tài khoản"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          {errors.accountName && <p className="text-sm text-destructive">{errors.accountName}</p>}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tôi đồng ý với điều khoản và điều kiện
            </label>
            <p className="text-sm text-muted-foreground">
              Bạn đồng ý cho phép chúng tôi truy cập thông tin tài khoản của bạn để xác minh danh tính.
            </p>
          </div>
        </div>
        {errors.agreed && <p className="text-sm text-destructive">{errors.agreed}</p>}
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit">Tiếp tục</Button>
      </div>
    </form>
  )
}
