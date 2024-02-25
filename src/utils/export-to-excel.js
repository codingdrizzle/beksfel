import * as XLSX from 'xlsx';

const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([dataToExport]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${'fileName'}.xlsx`);
};


//const itemsData = Array.isArray(storeInvoice.items) && storeInvoice.items.map((item) => [item.description, item.quantity, item.unit, item.rate, item.amount]);

//const dataToExport = [
//    ['Invoice Number', 'Date', 'Payment Type', 'Cheque Number', 'Bank Name', 'TIN Number', 'Invoice ID', 'Tax', 'Gross Amount', 'Net Amount', 'Balance'],
//    pV,
//    [], [],
//    ['Description', 'Quantity', 'Unit', 'Rate', 'Amount'],
//    itemsData
//]