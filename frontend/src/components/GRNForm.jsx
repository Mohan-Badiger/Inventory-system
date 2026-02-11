import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toWords } from "number-to-words";


pdfMake.vfs = pdfFonts.vfs;

export default function GRNForm() {
    const [formData, setFormData] = useState({
        grnNumber: "",
        grnDate: "",
        challanNo: "",
        challanDate: "",
        billNo: "",
        billDate: "",
        poNumber: "",
        prNumber: "",
        vendorName: "",
        remark: "",
        receivedBy: "",
        authorisedSignatory: ""
    });

    const [items, setItems] = useState([
        {
            sectionName: "",
            itemName: "",
            itemMake: "",
            receivedQty: "",
            unitPrice: "",
            totalAmount: 0
        }
    ]);

    const [lastSavedGRN, setLastSavedGRN] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleItemChange = (index, e) => {
        const updatedItems = [...items];
        updatedItems[index][e.target.name] = e.target.value;

        const qty = Number(updatedItems[index].receivedQty || 0);
        const price = Number(updatedItems[index].unitPrice || 0);
        updatedItems[index].totalAmount = qty * price;

        setItems(updatedItems);
    };

    const addItemRow = () => {
        setItems([
            ...items,
            {
                sectionName: "",
                itemName: "",
                itemMake: "",
                receivedQty: "",
                unitPrice: "",
                totalAmount: 0
            }
        ]);
    };

    const grandTotal = items.reduce(
        (sum, item) => sum + Number(item.totalAmount || 0),
        0
    );


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/api/storegrn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    items,
                    grandTotal,
                    grandTotalInWords:toWords(grandTotal).replace(/\b\w/g, c => c.toUpperCase()) + " Rupees Only"
                })
            });

            const data = await res.json();
            console.log(data);

            setLastSavedGRN(data);

            alert("GRN Saved Successfully ✅");

            // Reset form
            setFormData({
                grnNumber: "",
                grnDate: "",
                challanNo: "",
                challanDate: "",
                billNo: "",
                billDate: "",
                poNumber: "",
                prNumber: "",
                vendorName: "",
                remark: "",
                receivedBy: "",
                authorisedSignatory: ""
            });

            // Reset items
            setItems([
                {
                    sectionName: "",
                    itemName: "",
                    itemMake: "",
                    receivedQty: "",
                    unitPrice: "",
                    totalAmount: 0
                }
            ]);

        } catch (error) {
            console.error(error);
            alert("Error saving GRN ❌");
        }
    };

    // ✅ PROFESSIONAL PDF
    const handleDownloadPDF = () => {
        if (!lastSavedGRN) {
            alert("No GRN saved yet ❌");
            return;
        }

        const grn = lastSavedGRN;

        const docDefinition = {
            content: [

                // Header
                { text: "Goods Receipt Note", style: "title" },

                { text: "------------------------------------------------------------" },

                { text: `GRN Number : ${grn.grnNumber || "-"}`, bold: true },

                { text: "------------------------------------------------------------", margin: [0, 5] },

                // GRN Info
                { text: `GRN Date : ${formatDate(grn.grnDate)}` },

                {
                    columns: [
                        { text: `Challan No. : ${grn.challanNo || "0"}` },
                        { text: `Challan Date : ${formatDate(grn.challanDate)}` }
                    ]
                },

                {
                    columns: [
                        { text: `Bill No. : ${grn.billNo || "-"}` },
                        { text: `Bill Date : ${formatDate(grn.billDate)}` }
                    ]
                },

                {
                    columns: [
                        { text: `PO Number : ${grn.poNumber || "-"}` },
                        { text: `PR Number : ${grn.prNumber || "0"}` }
                    ],
                    margin: [0, 0, 0, 10]
                },

                // Vendor
                { text: `From Vendor : ${grn.vendorName || "-"}` },

                { text: "------------------------------------------------------------", margin: [0, 5] },

                // Items Table
                {
                    table: {
                        headerRows: 1,
                        widths: [30, 80, "*", "*", 40, 60, 60],
                        body: [
                            [
                                { text: "Sr.N", bold: true },
                                { text: "Section", bold: true },
                                { text: "Item Name", bold: true },
                                { text: "Item Make", bold: true },
                                { text: "Qty", bold: true },
                                { text: "Price", bold: true },
                                { text: "Amount", bold: true }
                            ],

                            ...(grn.items || []).map((item, i) => [
                                i + 1,
                                item.sectionName || "-",
                                item.itemName || "-",
                                item.itemMake || "-",
                                item.receivedQty || 0,
                                item.unitPrice || 0,
                                item.totalAmount || 0
                            ])
                        ]
                    }
                },

                { text: "------------------------------------------------------------", margin: [0, 10] },

                // Totals
                { text: `Grand Total (Rs.) : ${grn.grandTotal || 0}`, bold: true },

                { text: "------------------------------------------------------------" },

                {
                    text: `Grand Total (In Words) : ${grn.grandTotalInWords && grn.grandTotalInWords.trim() !== ""
                        ? grn.grandTotalInWords
                        : "-"
                        }`,
                    margin: [0, 5]
                },


                { text: "------------------------------------------------------------" },

                // Remark
                { text: `Remark : ${grn.remark || "-"}` },

                // Signatures
                { text: "------------------------------------------------------------" },

                { text: `Received By : ${grn.receivedBy || "-"}` },

                { text: "------------------------------------------------------------" },

                { text: `Authorised Signatory : ${grn.authorisedSignatory || "-"}` },

            ],

            styles: {
                title: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center",
                    margin: [0, 0, 0, 10]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download(`${grn.grnNumber}.pdf`);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-sm w-full max-w-3xl p-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">
                    Goods Receipt Note (GRN)
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Input label="GRN Number" name="grnNumber" value={formData.grnNumber} onChange={handleChange} />
                    <Input label="GRN Date" name="grnDate" type="date" value={formData.grnDate} onChange={handleChange} />

                    <Input label="Challan No" name="challanNo" value={formData.challanNo} onChange={handleChange} />
                    <Input label="Challan Date" name="challanDate" type="date" value={formData.challanDate} onChange={handleChange} />

                    <Input label="Bill No" name="billNo" value={formData.billNo} onChange={handleChange} />
                    <Input label="Bill Date" name="billDate" type="date" value={formData.billDate} onChange={handleChange} />

                    <Input label="PO Number" name="poNumber" value={formData.poNumber} onChange={handleChange} />
                    <Input label="PR Number" name="prNumber" value={formData.prNumber} onChange={handleChange} />

                    <div className="md:col-span-2">
                        <Input label="Vendor Name" name="vendorName" value={formData.vendorName} onChange={handleChange} />
                    </div>

                    <div className="md:col-span-2">
                        <Input label="Remark" name="remark" value={formData.remark} onChange={handleChange} />
                    </div>

                    <Input label="Received By" name="receivedBy" value={formData.receivedBy} onChange={handleChange} />
                    <Input label="Authorised Signatory" name="authorisedSignatory" value={formData.authorisedSignatory} onChange={handleChange} />

                    {/* Items */}
                    <div className="md:col-span-2 mt-4">
                        <h2 className="text-lg font-semibold mb-2">Items</h2>

                        {items.map((item, index) => (
                            <div key={index} className="border rounded-sm p-3 mb-3">
                                <div className="grid grid-cols-2 gap-3">

                                    <SmallInput label="Section" name="sectionName" value={item.sectionName} onChange={(e) => handleItemChange(index, e)} />
                                    <SmallInput label="Item Name" name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} />

                                    <SmallInput label="Item Make" name="itemMake" value={item.itemMake} onChange={(e) => handleItemChange(index, e)} />
                                    <SmallInput label="Received Qty" name="receivedQty" type="number" value={item.receivedQty} onChange={(e) => handleItemChange(index, e)} />

                                    <SmallInput label="Unit Price" name="unitPrice" type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />

                                    <div className="flex items-end font-semibold">
                                        Total: ₹ {item.totalAmount}
                                    </div>

                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addItemRow}
                            className="bg-slate-700 text-white px-4 py-2 rounded-sm"
                        >
                            + Add Item
                        </button>

                        <div className="text-right font-bold mt-3">
                            Grand Total: ₹ {grandTotal}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 mt-4 space-y-2">
                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-3 rounded-sm"
                        >
                            Save GRN
                        </button>

                        <button
                            type="button"
                            onClick={handleDownloadPDF}
                            className="w-full bg-emerald-600 text-white py-3 rounded-sm"
                        >
                            Download Last GRN PDF
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

// ✅ Date formatter
const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
};

function Input({ label, name, type = "text", value, onChange }) {
    return (
        <div>
            <label className="block text-sm mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-slate-300 rounded-sm px-3 py-2"
            />
        </div>
    );
}

function SmallInput({ label, name, type = "text", value, onChange }) {
    return (
        <div>
            <label className="block text-xs mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-slate-300 rounded-sm px-2 py-1"
            />
        </div>
    );
}
