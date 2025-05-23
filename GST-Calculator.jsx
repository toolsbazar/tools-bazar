import { useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [includeGST, setIncludeGST] = useState(false);
  const [total, setTotal] = useState(null);
  const [gstAmount, setGstAmount] = useState(null);

  const calculateGST = () => {
    const numericAmount = parseFloat(amount);
    const numericGSTRate = parseFloat(gstRate);

    if (isNaN(numericAmount) || isNaN(numericGSTRate)) {
      alert('Please enter valid numbers for both amount and GST rate.');
      return;
    }

    let calculatedGST, calculatedTotal;

    if (includeGST) {
      // Amount includes GST
      calculatedGST = numericAmount * (numericGSTRate / (100 + numericGSTRate));
      calculatedTotal = numericAmount - calculatedGST;
    } else {
      // Amount excludes GST
      calculatedGST = numericAmount * (numericGSTRate / 100);
      calculatedTotal = numericAmount + calculatedGST;
    }

    setGstAmount(calculatedGST.toFixed(2));
    setTotal(calculatedTotal.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.01] duration-300">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 bg-indigo-600 text-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">GST Calculator</h2>
            <p className="mb-6">Calculate Goods and Services Tax for your business or personal use. This tool helps you determine the tax-inclusive or exclusive price of a product or service.</p>
            
            <div className="mt-auto pt-6">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M12 15V9M12 15C13.6569 15 15 13.6569 15 12V9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9V12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">Common GST Rates:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                <li>5% - Essential goods/services</li>
                <li>12% - Basic services</li>
                <li>18% - Most common rate</li>
                <li>28% - Luxury items</li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="gstRate" className="block text-sm font-medium text-gray-700 mb-1">
                  GST Rate (%)
                </label>
                <select
                  id="gstRate"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                  <option value="custom">Custom</option>
                </select>
                {gstRate === 'custom' && (
                  <input
                    type="number"
                    value=""
                    placeholder="Enter custom rate"
                    onChange={(e) => setGstRate(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="includeGST"
                  type="checkbox"
                  checked={includeGST}
                  onChange={() => setIncludeGST(!includeGST)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="includeGST" className="ml-2 block text-sm text-gray-700">
                  Entered amount includes GST
                </label>
              </div>

              <button
                onClick={calculateGST}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Calculate GST
              </button>

              {total !== null && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md animate-fadeIn">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">GST Amount:</span>
                    <span className="font-semibold">₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{includeGST ? 'Pre-tax amount:' : 'Total with GST:'}</span>
                    <span className="font-semibold">₹{total}</span>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500">
                <h3 className="font-medium mb-2">How it works:</h3>
                <p className="mb-2">If "includes GST" is checked, the calculator will show the pre-tax amount and the GST portion. Otherwise, it adds GST to the entered amount.</p>
                <p>Use this tool for quick calculations, but always consult official guidelines for actual tax filings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
