import React from 'react';
import SocialLinks from '../../views/common/SocialLinks'
import { FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
		<footer className="mt-16 bg-gray-600 text-white py-8 flex flex-col">
			<div className="container flex-grow max-w-screen-xl pr-[5%] pl-[20%]  md:pl-[25%] lg:w-auto mx-auto transition-all duration-300 text-center items-center ">
				<h2 className="text-lg tracking-[.25em] uppercase font-semibold  mb-2">
					Let's Connect
				</h2>
				<p className="mb-0">
					Feel free to reach out for collaborating or just to say
					hello.
				</p>
				<p className="mb-8">
					<a
						href="mailto:hello@robleto.com"
						className="mt-2 z-50 inline-block border border-gray-100 text-gray-100 rounded-full px-6 py-2 transition-colors duration-300 self-start hover:bg-gray-700 hover:text-white hover:border-white"
					>
						<FaEnvelope className="inline-block mr-2" />
						hello@robleto.com
					</a>
				</p>

				<SocialLinks center />
				<div className="mt-8 text-xs opacity-40">
					<p>
						&copy; {new Date().getFullYear()} Greg Robleto
						Robleto.com All rights reserved.
					</p>
				</div>
			</div>
		</footer>
  );
};

export default Footer;
