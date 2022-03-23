import { useLocation } from 'react-router-dom';

import Button from '../Components/Button';
import Input from '../Components/Input';
import { config } from '../Utils/config';

const Start = () => {
  const { state: redirectMessage } = useLocation();

  if (redirectMessage) {
    // console.log(redirectMessage);
  }

  return (
    <div className="flex items-center">
      <div className="inline-flex w-[900px] h-screen px-[120px] pt-[200px] bg-black bg-opacity-50">
        <div className="text-white">
          <h1 className="mb-[60px] text-7xl">Catering Reyes</h1>
          <p className="text-xl">
            We hotel Reyes offer an assortiment of foods and beverages you can
            order from our cafetaria directly to your room. All of our products
            are made with the freshest and top quality ingredients with some
            gluten free options.
          </p>
          <p className="mt-[20px] text-xl ">
            We hope everything is to your liking and enjoy your meal!
          </p>

          <div className="flex items-center justify-center w-auto h-[280px] mt-[110px] ml-[-120px] mr-[-120px] bg-black bg-opacity-70">
            <div className="w-[150px] h-[150px] bg-red-700">myImage</div>
            <div className="relative w-[400px] h-[150px] ml-[64px] pt-[20px]">
              <p className="text-center">
                With this app I don’t have to bother room service anymore
                whenever I get hungry. Oh and of course the food is excellent.
              </p>
              <div className="absolute bottom-2 left-1/2 -translate-x-2/4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex justify-center w-[calc(100%-900px)]">
        <div className="relative w-[600px] h-[800px] p-24 bg-white">
          <div>
            <p className="mb-[24px]">
              In order to use the catering app it is required to make an account
              or you can login with your Google account as well!
            </p>
            <Input label="Email:" />
            <Input label="Password:" type="password" />
            <a className="block mt-[8px] mb-[40px] text-sm text-blue-700 underline">
              Forgot Password?
            </a>
            <Button label="Sign in" variant="primary" />
            <Button
              label="Sign in with Google"
              variant="google"
              onClick={() => {
                window.location.href = `${config.API_URL}/auth/google`;
              }}
            />
            <p className="mt-[42px] mb-[2px] text-center text-blue-700 ">
              Dont have an account?
            </p>
            <a className="block mb-[40px] text-center text-blue-700 underline cursor-pointer">
              Make a new account!
            </a>

            {redirectMessage && (
              <p className="text-lg mb-[12px] text-center text-red-500 font-semibold">
                {String(redirectMessage)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
