const TransactionHeroSection = () => {
    return(
        <view>
            <div className="w-full flex justify-center">
                <div className="bg-[#d4d4d4] w-full m-2 rounded-lg p-6">
                    <h3 className="text-[#d65206] text-xl font-bold mb-4">All Transaction</h3>

                    <div className="flex items-center justify-between gap-4 mb-4">
                        <input 
                            type="text" 
                            placeholder="Search Transaction..." 
                            className="flex-1 px-4 py-2 rounded-md border border-[#d65206] focus:outline-none focus:ring-2 focus:ring-[#d65206]"
                        />
                        <div>
                            <select className="appearance-none px-4 py-2 rounded-md border border-[#d65206] focus:outline-none focus:ring-2 focus:ring-[#d65206]">
                            <option>Income</option>
                            <option>Expense</option>
                            </select>
                        </div>
                    </div>

                    <p className="text-white">Isi konten di sini...</p>
                </div>
            </div>
            <button className="fixed bottom-4 right-4 z-50 bg-[#d65206] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#b74705] transition">
                + Add Transaction
            </button>
        </view>
    )
}
export default TransactionHeroSection