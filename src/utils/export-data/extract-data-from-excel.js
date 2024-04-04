import ExcelJS from 'exceljs';

const extractExcelData = async (file) => {
  const workbook = new ExcelJS.Workbook();
  const data = [];
  await workbook.xlsx.load(file);
  
  const worksheet = workbook.worksheets[0];
  worksheet.eachRow((row, rowNumber) => {
    const rowData = [];
    row.eachCell((cell, colNumber) => {
      rowData.push(cell.value);
    });
    data.push(rowData);
  });
  return data;
};


export default extractExcelData;