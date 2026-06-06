# Auto Excel Import

Ứng dụng web nhỏ cho phép bạn upload file Excel và tự động nhập dữ liệu lên hệ thống CRUD.

## Cài đặt
```bash
cd d:/Test/auto
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m playwright install
```

Nếu bạn chỉ muốn cài trình duyệt Chrome/Chromium cho Playwright:
```bash
python -m playwright install chromium
```

## Chạy
```bash
python app.py
```

Sau đó mở trình duyệt và truy cập:

```text
http://localhost:5000
```

## Hướng dẫn sử dụng
1. Bấm `Tải template Excel` để lấy file mẫu.
2. Điền dữ liệu vào file Excel theo 4 cột.
3. Upload file `.xlsx` lên hệ thống.
4. Xem preview file đã upload.
5. Bấm `Import dữ liệu lên website` để chạy tự động.

## Ghi chú
- Template Excel mẫu có các cột: `Mã nhân viên`, `Họ tên`, `Thành phố`, `Trạng thái`.
- File dữ liệu test sẵn có theo loại: `sample/data_product.xlsx`, `sample/data_invoice.xlsx`, `sample/data_employee.xlsx`, `sample/data_customer.xlsx`, `sample/data_order.xlsx`.
- Tại giao diện bạn có thể chọn loại trước khi tải template hoặc sample data.
- Đây là workflow tự động cho app `https://test-auto-sandy.vercel.app/`.
- Mỗi dòng sẽ được thử tối đa 5 lần nếu không thấy kết quả thành công.
- Nếu một dòng thất bại sau 5 lần, hệ thống sẽ chụp màn hình và chuyển sang dòng tiếp theo.

## Lưu ý thêm
- Nếu file Excel upload chưa đúng định dạng, hệ thống chỉ chấp nhận `.xlsx`.
- Trong trường hợp đa số dòng fail, bạn nên kiểm tra lại selector hoặc cấu trúc form trên app mục tiêu.
