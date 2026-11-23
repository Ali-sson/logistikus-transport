
// import { useState } from "react";
// import {
//   Bike,
//   MapPin,
//   Package,
//   User,
//   Clock,
//   MessageCircle,
//   ArrowLeft,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const WHATSAPP_NUMBER = "234XXXXXXXXXX";

// function Dispatch() {
//   const [form, setForm] = useState({
//     senderName: "",
//     senderPhone: "",
//     pickupAddress: "",
//     pickupLandmark: "",
//     recipientName: "",
//     recipientPhone: "",
//     deliveryAddress: "",
//     packageType: "",
//     packageDescription: "",
//     pickupDate: "",
//     pickupTime: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const message = `
// *NEW DISPATCH DELIVERY REQUEST*
// *Logistikus Travels - Kaduna*

// *SENDER INFORMATION*
// Name: ${form.senderName}
// Phone: ${form.senderPhone}

// *PICKUP INFORMATION*
// Pickup Address: ${form.pickupAddress}
// Landmark: ${form.pickupLandmark || "Not provided"}

// *RECIPIENT INFORMATION*
// Name: ${form.recipientName}
// Phone: ${form.recipientPhone}
// Delivery Address: ${form.deliveryAddress}

// *PACKAGE DETAILS*
// Package Type: ${form.packageType}
// Description: ${form.packageDescription}

// *PICKUP SCHEDULE*
// Date: ${form.pickupDate}
// Time: ${form.pickupTime}

// Please review this request and confirm the delivery fee and rider availability.
//     `;

//     const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

//     window.open(whatsappURL, "_blank");
//   };

//   const inputClass =
//     "w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#05708C] focus:ring-2 focus:ring-[#05708C]/10 transition";

//   const labelClass =
//     "block text-sm font-semibold text-gray-700 mb-2";

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* Header */}
//       <header className="bg-[#064A6F] text-white py-12">
//         <div className="max-w-4xl mx-auto px-5">

//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white mb-8"
//           >
//             <ArrowLeft size={17} />
//             Back to Home
//           </Link>

//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-white/10 p-3 rounded-xl">
//               <Bike size={30} />
//             </div>

//             <span className="text-sm font-semibold uppercase tracking-wider">
//               Logistikus Dispatch
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-5xl font-bold mb-4">
//             Book a Delivery
//           </h1>

//           <p className="text-blue-100 leading-relaxed max-w-2xl">
//             Need something picked up or delivered?
//             Request a dispatch rider and enjoy convenient
//             delivery services within Kaduna.
//           </p>

//         </div>
//       </header>

//       {/* Booking Form */}
//       <main className="max-w-4xl mx-auto px-5 py-12">

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">

//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-[#064A6F]">
//               Delivery Request Form
//             </h2>

//             <p className="text-gray-500 text-sm mt-2">
//               Please provide accurate information to help us
//               process your delivery request.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-9">

//             {/* Sender Information */}
//             <section>
//               <div className="flex items-center gap-3 mb-5">
//                 <User className="text-[#05708C]" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   01. Sender Information
//                 </h3>
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">

//                 <div>
//                   <label className={labelClass}>
//                     Sender's Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="senderName"
//                     value={form.senderName}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="senderPhone"
//                     value={form.senderPhone}
//                     onChange={handleChange}
//                     placeholder="08012345678"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//               </div>
//             </section>

//             {/* Pickup Information */}
//             <section>
//               <div className="flex items-center gap-3 mb-5">
//                 <MapPin className="text-[#05708C]" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   02. Pickup Information
//                 </h3>
//               </div>

//               <div className="space-y-5">

//                 <div>
//                   <label className={labelClass}>
//                     Pickup Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="pickupAddress"
//                     value={form.pickupAddress}
//                     onChange={handleChange}
//                     placeholder="Enter pickup address in Kaduna"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     Nearby Landmark
//                   </label>
//                   <input
//                     type="text"
//                     name="pickupLandmark"
//                     value={form.pickupLandmark}
//                     onChange={handleChange}
//                     placeholder="E.g. Near a filling station or school"
//                     className={inputClass}
//                   />
//                 </div>

//               </div>
//             </section>

//             {/* Recipient Information */}
//             <section>
//               <div className="flex items-center gap-3 mb-5">
//                 <User className="text-[#05708C]" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   03. Recipient Information
//                 </h3>
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">

//                 <div>
//                   <label className={labelClass}>
//                     Recipient's Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="recipientName"
//                     value={form.recipientName}
//                     onChange={handleChange}
//                     placeholder="Recipient's name"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     Recipient's Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="recipientPhone"
//                     value={form.recipientPhone}
//                     onChange={handleChange}
//                     placeholder="08012345678"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className={labelClass}>
//                     Delivery Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="deliveryAddress"
//                     value={form.deliveryAddress}
//                     onChange={handleChange}
//                     placeholder="Enter delivery address in Kaduna"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//               </div>
//             </section>

//             {/* Package Details */}
//             <section>
//               <div className="flex items-center gap-3 mb-5">
//                 <Package className="text-[#05708C]" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   04. Package Details
//                 </h3>
//               </div>

//               <div className="space-y-5">

//                 <div>
//                   <label className={labelClass}>
//                     Package Category *
//                   </label>

//                   <select
//                     name="packageType"
//                     value={form.packageType}
//                     onChange={handleChange}
//                     className={inputClass}
//                     required
//                   >
//                     <option value="">Select package type</option>
//                     <option value="Documents">Documents</option>
//                     <option value="Food and Groceries">Food and Groceries</option>
//                     <option value="Clothing and Fashion">Clothing and Fashion</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Personal Items">Personal Items</option>
//                     <option value="Business Packages">Business Packages</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     Package Description *
//                   </label>

//                   <textarea
//                     name="packageDescription"
//                     value={form.packageDescription}
//                     onChange={handleChange}
//                     placeholder="Briefly describe the item you want delivered..."
//                     rows="4"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//               </div>
//             </section>

//             {/* Schedule */}
//             <section>
//               <div className="flex items-center gap-3 mb-5">
//                 <Clock className="text-[#05708C]" />
//                 <h3 className="text-lg font-bold text-gray-800">
//                   05. Pickup Schedule
//                 </h3>
//               </div>

//               <div className="grid md:grid-cols-2 gap-5">

//                 <div>
//                   <label className={labelClass}>
//                     Preferred Pickup Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="pickupDate"
//                     value={form.pickupDate}
//                     onChange={handleChange}
//                     min={new Date().toLocaleDateString("en-CA")}
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     Preferred Pickup Time *
//                   </label>
//                   <input
//                     type="time"
//                     name="pickupTime"
//                     value={form.pickupTime}
//                     onChange={handleChange}
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//               </div>
//             </section>

//             {/* Pricing Notice */}
//             <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
//               <h4 className="font-bold text-[#064A6F] mb-2">
//                 Delivery Fee & Confirmation
//               </h4>

//               <p className="text-sm text-gray-600 leading-6">
//                 Your delivery request will be reviewed by our team.
//                 The delivery fee, rider availability and pickup
//                 arrangements will be communicated to you before
//                 the booking is confirmed.
//               </p>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center gap-3 bg-[#05708C] hover:bg-[#04566B] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
//             >
//               <MessageCircle size={20} />
//               Submit Delivery Request
//             </button>

//             <p className="text-center text-xs text-gray-500">
//               Dispatch and delivery services are currently
//               available within Kaduna only.
//             </p>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dispatch;
