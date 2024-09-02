import landing from "../assets/landing.png"
import app from "../assets/appDownload.png"
const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-md shadow-md text-center -mt-16 py-7 flex flex-col items-center gap-4">
                <div className="text-orange-600 font-bold text-5xl">Tuck into a takeway today</div>
                <div className="text-sm">Food is just a click away!</div>
                <div>
                    <input type="text" placeholder="Search by City or Town" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <img src={landing} alt="" className="" />
                </div>
                <div className="flex-1 gap-3 text-center flex flex-col justify-center">
                    <div className="font-bold text-3xl">Order Take-away even faster</div>
                    <div className="text-xs">Download the MernEats App for faster ordering and personalized recommendations</div>
                    <div className="mx-auto">
                        <img src={app} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
