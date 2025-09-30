const DashboardHeroSection = () =>{
    return(
        <view>
            <div className="w-full min-h-screen flex justify-center">
                <div className="flex-1 p-4 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
                            <h3 className="text-white text-xl font-bold">Title</h3>
                            <p className="text-gray-300">Rp0</p>
                        </div>
                            <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
                            <h3 className="text-white text-xl font-bold">Title</h3>
                        <p className="text-gray-300">Rp0</p>
                        </div>
                        <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
                            <h3 className="text-white text-xl font-bold">Title</h3>
                            <p className="text-gray-300">Rp0</p>
                        </div>
                        <div className="bg-[#d65206] p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-700 hover:scale-102 transition duration-300">
                            <h3 className="text-white text-xl font-bold">Title</h3>
                            <p className="text-gray-300">Rp0</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md w-full sm:w-[48%]">
                            <h3 className="text-white text-xl font-bold">Graph</h3>
                        </div>
                        <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md w-full sm:w-[48%]">
                            <h3 className="text-white text-xl font-bold">Graph</h3>
                        </div>
                        <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md w-full sm:w-[48%]">
                            <h3 className="text-white text-xl font-bold">Recent Transactions</h3>
                        </div>
                        <div className="bg-[#b7b7b7] p-6 rounded-lg shadow-md w-full sm:w-[48%]">
                            <h3 className="text-white text-xl font-bold">Budget Progress</h3>
                        </div>
                    </div>
                </div>
            </div>
        </view>
    )
}

export default DashboardHeroSection