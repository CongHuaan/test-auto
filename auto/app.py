import os
from pathlib import Path
from flask import Flask, render_template, request, redirect, send_file, url_for, flash
from werkzeug.utils import secure_filename
from automation import import_excel_data, read_excel_preview

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
SAMPLE_FOLDER = BASE_DIR / "sample"
ALLOWED_EXTENSIONS = {"xlsx"}
ENTITY_TYPES = ["Product", "Invoice", "Employee", "Customer", "Order"]
TEMPLATE_COLUMNS = {
    "Product": ["Mã nhân viên", "Họ tên", "Legal Entity", "Ngày"],
    "Invoice": ["Mã nhân viên", "Họ tên", "Legal Entity", "Ngày"],
    "Employee": ["Mã nhân viên", "Họ tên", "Legal Entity", "Ngày"],
    "Customer": ["Mã nhân viên", "Họ tên", "Legal Entity", "Ngày"],
    "Order": ["Mã nhân viên", "Họ tên", "Legal Entity", "Ngày"],
}

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
SAMPLE_FOLDER.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.secret_key = "auto-crud-secret"
app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)


def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_template_path(entity_type: str) -> Path:
    safe_name = entity_type.lower()
    return SAMPLE_FOLDER / f"template_{safe_name}.xlsx"


@app.route("/")
def index():
    selected_type = request.args.get("type", "Customer")
    if selected_type not in ENTITY_TYPES:
        selected_type = "Customer"

    upload_filename = request.args.get("file")
    preview_data = None
    if upload_filename:
        upload_path = UPLOAD_FOLDER / upload_filename
        if upload_path.exists():
            preview_data = read_excel_preview(upload_path)
    return render_template(
        "index.html",
        upload_filename=upload_filename,
        preview_data=preview_data,
        selected_type=selected_type,
        entity_types=ENTITY_TYPES,
    )


@app.route("/download-template")
def download_template():
    entity_type = request.args.get("type", "Customer")
    if entity_type not in ENTITY_TYPES:
        entity_type = "Customer"

    template_path = get_template_path(entity_type)
    if not template_path.exists():
        from openpyxl import Workbook

        wb = Workbook()
        ws = wb.active
        ws.title = "Data"
        columns = TEMPLATE_COLUMNS.get(entity_type, TEMPLATE_COLUMNS["Customer"])
        ws.append(columns)
        ws.append(["NV001", "Nguyễn Văn A", "HO", "2026-06-06"])
        ws.append(["NV002", "Trần Thị B", "Branch 1", "2026-06-06"])
        wb.save(template_path)

    return send_file(
        str(template_path),
        as_attachment=True,
        download_name=f"template_{entity_type.lower()}.xlsx",
    )


@app.route("/download-sample")
def download_sample():
    entity_type = request.args.get("type", "Customer")
    if entity_type not in ENTITY_TYPES:
        entity_type = "Customer"

    sample_path = SAMPLE_FOLDER / f"data_{entity_type.lower()}.xlsx"
    if not sample_path.exists():
        from openpyxl import Workbook

        wb = Workbook()
        ws = wb.active
        ws.title = "Data"
        ws.append(TEMPLATE_COLUMNS.get(entity_type, TEMPLATE_COLUMNS["Customer"]))
        ws.append(["NV101", f"Sample {entity_type} 1", "HO", "2026-06-06"])
        ws.append(["NV102", f"Sample {entity_type} 2", "Branch 1", "2026-06-07"])
        wb.save(sample_path)

    return send_file(
        str(sample_path),
        as_attachment=True,
        download_name=f"data_{entity_type.lower()}.xlsx",
    )


@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        flash("Không tìm thấy file upload", "error")
        return redirect(url_for("index"))

    file = request.files["file"]
    if file.filename == "":
        flash("Vui lòng chọn file Excel", "error")
        return redirect(url_for("index"))

    selected_type = request.form.get("entity_type", "Customer")
    if selected_type not in ENTITY_TYPES:
        selected_type = "Customer"

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = UPLOAD_FOLDER / filename
        file.save(save_path)
        flash(f"Upload thành công: {filename}", "success")
        return redirect(url_for("index", file=filename, type=selected_type))

    flash("Chỉ chấp nhận file .xlsx", "error")
    return redirect(url_for("index"))


@app.route("/import", methods=["POST"])
def do_import():
    filename = request.form.get("filename")
    selected_type = request.form.get("entity_type", "Customer")
    if selected_type not in ENTITY_TYPES:
        selected_type = "Customer"

    if not filename:
        flash("Vui lòng upload file Excel trước khi import.", "error")
        return redirect(url_for("index", type=selected_type))

    file_path = UPLOAD_FOLDER / filename
    if not file_path.exists():
        flash("File upload không tồn tại.", "error")
        return redirect(url_for("index", type=selected_type))

    result = import_excel_data(file_path, selected_type)
    flash(result["message"], "success" if result["failed_rows"] == [] else "warning")
    preview_data = read_excel_preview(file_path)
    return render_template(
        "index.html",
        upload_filename=filename,
        preview_data=preview_data,
        result=result,
        selected_type=selected_type,
        entity_types=ENTITY_TYPES,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
