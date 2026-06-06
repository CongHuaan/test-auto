from pathlib import Path
import subprocess
import sys

try:
    import openpyxl
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--user', 'openpyxl'])
    import openpyxl

from openpyxl import Workbook

path = Path('sample/template.xlsx')
path.parent.mkdir(exist_ok=True)
wb = Workbook()
ws = wb.active
ws.title = 'Data'
ws.append(['Mã nhân viên', 'Họ tên', 'Thành phố', 'Trạng thái'])
ws.append(['NV001', 'Nguyễn Văn A', 'HN', 'Active'])
ws.append(['NV002', 'Trần Thị B', 'HCM', 'Inactive'])
wb.save(path)
print('Created', path.resolve())
