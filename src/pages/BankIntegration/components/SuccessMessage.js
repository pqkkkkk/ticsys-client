import { CheckCircle } from "lucide-react"

export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold">Liên kết thành công!</h3>
      <p className="mb-6 max-w-md text-muted-foreground">
        Tài khoản ngân hàng của bạn đã được liên kết thành công với tài khoản của chúng tôi. Bây giờ bạn có thể sử dụng
        đầy đủ các tính năng của dịch vụ.
      </p>
      <div className="w-full max-w-md rounded-lg border bg-muted/50 p-4">
        <div className="flex justify-between py-2">
          <span className="text-sm text-muted-foreground">Ngân hàng:</span>
          <span className="font-medium">Vietcombank</span>
        </div>
        <div className="flex justify-between border-t py-2">
          <span className="text-sm text-muted-foreground">Số tài khoản:</span>
          <span className="font-medium">**** **** 1234</span>
        </div>
        <div className="flex justify-between border-t py-2">
          <span className="text-sm text-muted-foreground">Tên chủ tài khoản:</span>
          <span className="font-medium">NGUYEN VAN A</span>
        </div>
        <div className="flex justify-between border-t py-2">
          <span className="text-sm text-muted-foreground">Trạng thái:</span>
          <span className="font-medium text-green-600">Đã xác minh</span>
        </div>
      </div>
    </div>
  )
}
