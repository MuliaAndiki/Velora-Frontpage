import { Camera, SquarePen, Eye } from "lucide-react"

const ProfileHeroSection = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-5 gap-6">
       
            <div className="bg-[#d65206] p-6 rounded-lg col-span-2">
                <h3 className="text-white text-xl font-bold mb-4">Profile Picture</h3>
                <div className="flex justify-center">
                    <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden flex items-center justify-center">
                    {/* <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
                    </div>
                </div>
                <div className="flex justify-center m-4 border-2 border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#d65206] transition">
                    <Camera />
                    <button className="ml-4">
                    Change Picture
                    </button>
                </div>
            </div>

            <div className="bg-[#b7b7b7] p-6 rounded-lg col-span-3">
                <h3 className="text-white text-xl font-bold mb-6">Personal Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-md font-bold">
                        <p className="text-white">Username</p>
                        <div className="bg-[#a1a1a1] px-4 py-2 rounded-md mt-2 flex justify-between items-center">
                            <p className="text-[15px]">John Doe</p>
                            <button className="text-red-600 font-bold hover:text-red-800"><SquarePen /></button>
                        </div>
                    </div>
                    <div className="text-md font-bold">
                        <p className="text-white">Email</p>
                        <div className="bg-[#a1a1a1] px-4 py-2 rounded-md mt-2 flex justify-between items-center">
                            <p className="text-[15px]">John@gmail.com</p>
                            <button className="text-red-600 font-bold hover:text-red-800"><SquarePen /></button>
                        </div>
                    </div>
                    <div className="text-md font-bold">
                        <p className="text-white">Phone</p>
                        <div className="bg-[#a1a1a1] px-4 py-2 rounded-md mt-2 flex justify-between items-center">
                            <p className="text-[15px]">+62</p>
                            <button className="text-red-600 font-bold hover:text-red-800"><SquarePen /></button>
                        </div>
                    </div>
                    <div className="text-md font-bold">
                        <p className="text-white">Password</p>
                        <div className="bg-[#a1a1a1] px-4 py-2 rounded-md mt-2 flex justify-between items-center">
                            <p className="text-[15px]">*********</p>
                            <button className="text-red-600 font-bold hover:text-red-800"><Eye /></button>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileHeroSection
