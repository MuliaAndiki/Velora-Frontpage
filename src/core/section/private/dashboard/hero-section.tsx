import { Wallet, ArrowUpFromLine, ArrowDownToLine, ChartNoAxesCombined } from "lucide-react"

const DashboardHeroSection = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex-1 p-4 flex flex-col">
        
        {/* Grid 1x4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-bold">Total Balance</h3>
              <Wallet />
            </div>
            <p className="text-gray-300">Rp0</p>
          </div>

          <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-bold">Income</h3>
              <ArrowUpFromLine />
            </div>
            <p className="text-gray-300">Rp0</p>
          </div>

          <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-bold">Expense</h3>
              <ArrowDownToLine />
            </div>
            <p className="text-gray-300">Rp0</p>
          </div>

          <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xl font-bold">Saving</h3>
              <ChartNoAxesCombined />
            </div>
            <p className="text-gray-300">Rp0</p>
          </div>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md">
            <h3 className="text-white text-xl font-bold">Graph</h3>
          </div>
          <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md">
            <h3 className="text-white text-xl font-bold">Graph</h3>
          </div>
          <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md">
            <h3 className="text-white text-xl font-bold">Recent Transactions</h3>
          </div>
          <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md">
            <h3 className="text-white text-xl font-bold">Budget Progress</h3>
          </div>
        </div>
      </div>

      {/* Sticky button */}
      <button className="fixed bottom-4 right-4 z-50 bg-[#d65206] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#b74705] transition">
        + Add Transaction
      </button>
    </div>
  )
}

export default DashboardHeroSection
