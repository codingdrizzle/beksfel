import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const styleHeaders = (header) => {
    header.eachCell({ includeEmpty: false }, (cell) => {
        cell.font = { bold: true, size: 12 };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '#4472c4' } // Light gray background color
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });
};


export const bulkExportToExcel = (dataToExport, fileName, sheetName) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    const headerTitiles = [
        'DATE',
        'PV NUMBER',
        'NAME/RECEIVED BY',
        'PREPARED BY',
        'BANK/CASH',
        'BANK NAME',
        'CHEQUE NUMBER',
        'PROJECT NAME',
        'PROJECT LOCATION',
        'DETAILS',
        'AMOUNT (GH₵)',
        'BALANCE',
        'TAX',
        'MATERIALS'
    ];

    const headers = worksheet.addRow(headerTitiles);
    styleHeaders(headers);

    dataToExport.forEach((rowData) => {
        worksheet.addRow([
            rowData?.date?.split('T')[0] || '',
            rowData.pv_number || '',
            rowData.name_received_by || '',
            rowData.prepared_by || '',
            rowData.payment_type || '',
            rowData.bank_name || '',
            rowData.cheque_number || '',
            rowData?.invoice_id?.project_name || '',
            rowData?.invoice_id?.project_location || '',
            rowData.details || '',
            rowData.amount_received || '',
            rowData.balance || '',
            rowData.tax_amount || '',
            rowData.materials || ''
        ]);
    });


    worksheet.getRow(1).height = 60;

    for (let col = 1; col <= 100; col++) {
        worksheet.getColumn(col).width = 20;
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName || 'pv-data.xlsx');
    });
}