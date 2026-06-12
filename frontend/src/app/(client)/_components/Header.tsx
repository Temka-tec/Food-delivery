// "use client";
// import { HandPlatter, Router } from "lucide-react";

// import { useRouter } from "next/navigation";

// export const Header = () => {
//   const router = useRouter();
//   return (
//     <footer className=" text-gray-300">
//       <div className="">
//         <div className="w-full h-17.5 bg-black flex flex-wrap items-center justify-between px-8">
//           <div className="flex">
//             <HandPlatter className="text-red-400 w-[50px] h-[40px]" />
//             <div>
//               Nom<span className="text-red-500">Nom</span>
//               <p className="text-white font-bold">Swif delivery</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               className="bg-white text-black rounded-2xl pl-4 pr-4"
//               onClick={() => router.push("/Signup")}
//             >
//               Sign up
//             </button>
//             <button
//               className="bg-red-400 text-white rounded-2xl p-1.5 pr-4 pl-4"
//               onClick={() => router.push("/login")}
//             >
//               Log in
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
