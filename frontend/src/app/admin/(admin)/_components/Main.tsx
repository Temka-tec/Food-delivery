// import { Button } from "@/components/ui/button";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import {
//   HandPlatter,
//   LayoutDashboard,
//   LogOut,
//   Router,
//   Truck,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const Main = () => {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     if (role !== "admin") {
//       router.replace("/login");
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("role");
//     router.replace("/login");
//   };
//   return (
//     <div>
//       {" "}
//       <SidebarProvider>
//         <div className="flex h-screen">
//           <div className="w-[205px] bg-white border-r px-4 py-6 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-3 mb-8">
//                 <HandPlatter className="text-red-600 h-[50px] w-[50px]" />
//                 <div>
//                   <h1 className="text-2xl font-bold leading-none">
//                     <span className="text-black">NOM</span>
//                     <span className="text-black">NOM</span>
//                   </h1>
//                   <p className="text-gray-500 text-sm">Swift delivery</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 cursor-pointer  px-2 py-2 rounded-md">
//                   <Button
//                     onClick={() => router.push("/admin/FoodMenu")}
//                     className="w-40 rounded-2xl"
//                   >
//                     <LayoutDashboard className="w-5 h-5" />
//                     Food menu
//                   </Button>{" "}
//                 </div>

//                 <div className=" flex items-center gap-2 cursor-pointer  px-2 py-2 rounded-md">
//                   <Button
//                     onClick={() => router.push("/admin/Order")}
//                     className="w-40 rounded-2xl"
//                   >
//                     {" "}
//                     <Truck className="w-6 h-6" />
//                     Orders
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <Button
//               variant="outline"
//               className="flex items-center gap-2"
//               onClick={handleLogout}
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </Button>
//           </div>

//           <main className="flex-1 overflow-auto p-6 bg-gray-50"></main>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// };
