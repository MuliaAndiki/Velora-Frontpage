import { House } from "lucide-react"

const BudgetHeroSection = () => {
    return(
        <view>
            <div>
                <div className="w-full flex justify-center">
                    <div className="bg-[#d4d4d4] w-full m-2 rounded-lg p-6">
                        <h3 className="text-[#d65206] text-[35px] font-bold">Budget</h3>
                        <p className="text-white mb-2">Set track monthly spending limits</p>
                        
                        <div className="border border-black p-4 rounded-md mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span><House /></span>
                                    <p>Housing</p>
                                </div>
                                <div>
                                    <p>1000/10000</p>
                                </div>
                            </div>

                            <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
                                <div className="bg-[#d65206] h-4 rounded-full" style={{ width: '10%' }}></div>
                            </div>

                            <div className="flex justify-between text-sm">
                                <p>10% used</p>
                                <p>9000 remaining</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="fixed bottom-4 right-4 z-50 bg-[#d65206] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#b74705] transition">
                + Add Budget
            </button>
        </view>
    )
}

export default BudgetHeroSection