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


export const insertDataIntoExcel = (dataToExport, fileName, sheetName) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    //const headers = worksheet.addRow(headerTitiles);
    //styleHeaders(headers);

    dataToExport.forEach((rowData) => {
        worksheet.addRow([...rowData]);
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