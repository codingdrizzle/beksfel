import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');

const pvHeaders = [
    'PV Number',
    'Date',
    'Payment Type',
    'Cheque Number',
    'Bank Name',
    'Gross Amount',
    'Tax Amount',
    'Tax Percent',
    'Net Amount',
    'TIN Number',
    'Balance',
    'Amount Received'
];

const invoiceHeaders = [
    'Invoice Number',
    'Project Name',
    'Project Location',
    'Invoice Date',
    'Invoice Total',
    'Invoice By'
];

const invoiceItemsHeaders = [
    'Item Description',
    'Quantity',
    'Unit',
    'Rate',
    'Item Amount'
]

function flattenData(data) {
    const flattened = {};

    function flatten(obj, prefix = '') {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flatten(obj[key], `${prefix}${key}_`);
            } else {
                flattened[`${prefix}${key}`] = obj[key];
            }
        }
    }

    flatten(data);
    return flattened;
}

const styleHeaders = (hearder) => {
    hearder.eachCell({ includeEmpty: false }, (cell) => {
        cell.font = { bold: true, size: 12 };
        cell.alignment = { horizontal: 'left' };
    });
}

const jumbotronHeaders = (text) => {
    const newRowNumber = worksheet.rowCount + 1;
    const mergedCellRange = `A${newRowNumber}:J${newRowNumber}`;

    worksheet.addRow([]);
    worksheet.mergeCells(mergedCellRange);

    const mergedCell = worksheet.getCell(mergedCellRange);
    mergedCell.value = text;
    mergedCell.font = { bold: true, size: 16 };
    mergedCell.alignment = { horizontal: 'center', vertical: 'middle' };
}

export const exportToExcel = (data, fileName) => {
    
    jumbotronHeaders('Payment Voucher Details');
    const pvHeader = worksheet.addRow(pvHeaders);
    styleHeaders(pvHeader);
    worksheet.addRow(Object.values(data.pvData));
    worksheet.addRow([]);

    jumbotronHeaders('Invoice Details');
    const invoiceHeader = worksheet.addRow(invoiceHeaders);
    styleHeaders(invoiceHeader);
    worksheet.addRow(Object.values(data.invoiceData));
    worksheet.addRow([]);

    jumbotronHeaders('Invoice Items');
    const invoiceItemsHeader = worksheet.addRow(invoiceItemsHeaders);
    styleHeaders(invoiceItemsHeader);

    data.invoiceItems.forEach((item) => {
        delete item._id;
        const itemRow = worksheet.addRow(Object.values(item));
        itemRow.alignment = { horizontal: 'left' };
    });
    
    worksheet.addRow([]);
    worksheet.mergeCells(`A${worksheet.rowCount}:E${worksheet.rowCount}`);
    
    const labelCell = worksheet.getCell(worksheet.rowCount, 1);
    labelCell.value = "Total";
    labelCell.font = { bold: true, size: 12 };
    labelCell.alignment = { horizontal: 'right' };
    
    const totalCell = worksheet.getCell(worksheet.rowCount, 6);
    totalCell.value = data.invoiceData.total;
    totalCell.font = { bold: true, size: 12 };
    totalCell.alignment = { horizontal: 'left' };
    
    
    for (let col = 1; col <= 100; col++) {
        worksheet.getColumn(col).width = 20;
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName || 'pv-data.xlsx');
    });
}