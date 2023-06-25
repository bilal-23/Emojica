import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";

interface Props {
  isProfile: boolean;
}
const About: React.FC<Props> = ({ isProfile }) => {
  return (
    <div className="flex flex-col lg:flex-row rounded-lg flex-wrap border-2 bg-white">
      <div className="w-full lg:w-1/4 px-2  py-4  text-center flex  items-center justify-start lg:justify-end lg:items-start">
        <div className="w-max relative lg:w-3/4 pt-3 justify-end">
          <Avatar className="h-20 w-20 rounded-full flex justify-center items-center border-2 bg-white">
            <AvatarImage src="" />
            <AvatarFallback className="bg-white">JW</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-left pl-4 pt-3 flex items-center flex-wrap gap-2 lg:hidden">
          <span className=" text-gray-700 text-2xl mr-2 break-words">
            HiraveSonali
          </span>
          <span className="text-base font-semibold text-gray-700 mr-2">
            {isProfile ? (
              <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                Edit Profile
              </button>
            ) : (
              <button className="bg-transparent bg-blue-500 font-semibold text-white py-2 px-4 border-transparent rounded">
                Follow
              </button>
            )}
          </span>
        </div>
      </div>
      <div className="w-full md:w-3/4 px-2 py-4 text-center">
        <div className="text-left pl-4 pt-3 hidden lg:block">
          <span className=" text-gray-700 text-2xl mr-2">HiraveSonali</span>
          <span className="text-base font-semibold text-gray-700 mr-2">
            <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
              Edit Profile
            </button>
          </span>
        </div>
        <div className="text-left pl-4 pt-3">
          <span className="text-base font-semibold text-gray-700 mr-2">
            <b>220</b> posts
          </span>
          <span className="text-base font-semibold text-gray-700 mr-2">
            <b>114</b> followers
          </span>
          <span className="text-base font-semibold text-gray-700">
            <b>200</b> following
          </span>
        </div>
        <div className="text-left pl-4 pt-2">
          <span className="text-lg font-bold text-gray-700 mr-2">
            Sonali Hirave
          </span>
        </div>
        <div className="text-left pl-4 pt-2">
          <p className="text-base font-medium text-gray-700 mr-2 break-words">
            Limitedd Edition
          </p>
          <a
            href="#"
            className="text-base font-medium text-blue-500 mr-2 cursor-pointer break-words"
          >
            https://www.behance.net/hiravesona7855
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
