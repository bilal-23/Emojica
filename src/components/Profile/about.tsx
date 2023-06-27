import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";

interface Props {
  isProfile: boolean;
}
const About: React.FC<Props> = ({ isProfile }) => {
  return (
    <header className="flex flex-wrap items-center p-4 md:py-8 bg-white rounded-lg">
      <div className="md:w-3/12 flex  justify-center">
        {/* <!-- profile image --> */}
        <Avatar
          className="h-20 w-20 flex justify-center items-center  bg-white object-cover rounded-full
                   border-2 border-pink-600 p-1"
        >
          <AvatarImage src="" />
          <AvatarFallback className="bg-white">JW</AvatarFallback>
        </Avatar>
      </div>

      {/* <!-- profile meta --> */}
      <div className="w-8/12 md:w-7/12 ml-2 xs:ml-4">
        <div className="md:flex md:flex-wrap md:items-center mb-4">
          <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
            mrtravlerrr_
          </h2>

          {/* <!-- badge --> */}
          <span
            className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2"
            aria-hidden="true"
          >
            <i
              className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"
            ></i>
          </span>

          {/* <!-- follow button --> */}
          <a
            href="#"
            className="bg-blue-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block "
          >
            Follow
          </a>
        </div>

        {/* <!-- post, following, followers list for medium screens --> */}
        <ul className="hidden md:flex space-x-4 mb-4">
          <li>
            <span className="font-semibold">136</span>
            posts
          </li>

          <li>
            <span className="font-semibold">40.5k</span>
            followers
          </li>
          <li>
            <span className="font-semibold">302</span>
            following
          </li>
        </ul>

        {/* <!-- user meta form medium screens --> */}
        <div className="hidden md:block">
          <h1 className="font-semibold">Mr Travlerrr...</h1>
          <span>Travel, Nature and Music</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </div>

      {/* <!-- user meta form small screens --> */}
      <div className="md:hidden text-sm my-2">
        <h1 className="font-semibold">Mr Travlerrr...</h1>
        <span>Travel, Nature and Music</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>
      <div className="px-px md:px-3 w-full">
        <ul
          className="flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm"
        >
          <li>
            <span className="font-semibold text-gray-800 block">136</span>
            posts
          </li>

          <li>
            <span className="font-semibold text-gray-800 block">40.5k</span>
            followers
          </li>
          <li>
            <span className="font-semibold text-gray-800 block">302</span>
            following
          </li>
        </ul>
      </div>
    </header>
  );
};

export default About;
