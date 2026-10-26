
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  LoaderCircle,
  BusFront,
} from "lucide-react";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState(
    "Please wait while we verify your payment."
  );
    
  const handlePrintTicket = () => {
  window.print();
};


  useEffect(() => {
    let cancelled = false;

    async function verifyPayment() {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("failed");
        setMessage("No payment reference was found.");
        return;
      }

      try {
        
const response = await fetch(
  `http://localhost:5000/api/payments/verify/${encodeURIComponent(reference)}`
);

const data = await response.json();

console.log("Payment verification response:", response.status, data);


        if (!response.ok) {
          throw new Error(
            data.message || "Payment verification failed."
          );
        }

        if (cancelled) return;

        setBooking(data.booking);
        setStatus("success");
        setMessage("Your payment has been verified successfully.");
      } catch (error) {
        if (cancelled) return;

        setStatus("failed");
        setMessage(
          error.message ||
            "We could not verify your payment. Please contact support."
        );
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

 
return (
  <div className="min-h-screen bg-gray-100 px-4 py-10 print:bg-white print:p-0">
    <div className="mx-auto max-w-3xl">

      {/* Ticket header */}
      <div className="rounded-t-2xl bg-teal-800 p-6 text-white print:bg-white print:text-black">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-teal-800 print:border print:border-gray-300">
            <BusFront size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide">
              LOGISTIKUS
            </h1>
            <p className="text-sm text-teal-100 print:text-gray-600">
              TRANSPORT SERVICES
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-teal-100 print:text-gray-600">
              ELECTRONIC TICKET
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              Your Journey, Confirmed
            </h2>
          </div>

          {status === "success" && (
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
              PAYMENT SUCCESSFUL
            </span>
          )}
        </div>
      </div>

      {/* Ticket body */}
      <div className="rounded-b-2xl bg-white shadow-lg print:rounded-none print:shadow-none">

        {status === "verifying" && (
          <div className="p-8 text-center">
            <LoaderCircle
              size={40}
              className="mx-auto animate-spin text-teal-700"
            />
            <h2 className="mt-4 text-xl font-bold">
              Verifying your payment
            </h2>
            <p className="mt-2 text-gray-500">{message}</p>
          </div>
        )}

        {status === "success" && booking && (
          <div className="p-6 sm:p-8">

            {/* Booking reference */}
            <div className="flex flex-col justify-between gap-3 border-b border-dashed border-gray-300 pb-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Booking reference
                </p>
                <p className="mt-1 break-all text-xl font-extrabold text-teal-800">
                  {booking.bookingReference}
                </p>
              </div>

              <span className="w-fit rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                Booking confirmed
              </span>
            </div>

            {/* Route */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-gray-200 py-7">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">
                  From
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  {booking.origin}
                </h3>
              </div>

              <div className="flex flex-col items-center text-teal-700">
                <BusFront size={26} />
                <div className="mt-2 h-px w-12 bg-teal-300 sm:w-20" />
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  To
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  {booking.destination}
                </h3>
              </div>
            </div>

            {/* Trip details */}
            <div className="grid grid-cols-1 gap-6 border-b border-dashed border-gray-300 py-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Passenger name</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {booking.passengerName || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Travel date</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {new Date(booking.travelDate).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    }
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Number of passengers</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {booking.numberOfPassengers}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Assigned seat(s)</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {booking.seatNumbers?.join(", ") || "Pending"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment status</p>
                <p className="mt-1 font-semibold text-green-700">
                  {booking.paymentStatus === "paid" ? "Paid" : booking.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Passenger email</p>
                <p className="mt-1 break-all font-semibold text-gray-900">
                  {booking.passengerEmail || "Not available"}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-5">
              <div>
                <p className="text-sm text-gray-500">Total amount paid</p>
                <p className="mt-1 text-2xl font-extrabold text-teal-800">
                  ₦{Number(booking.totalAmount).toLocaleString("en-NG")}
                </p>
              </div>

              <CheckCircle2 size={36} className="text-green-600" />
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-gray-500">
              Please keep this ticket for your records and present your
              booking reference at the terminal when requested.
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="p-8 text-center">
            <XCircle size={52} className="mx-auto text-red-600" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Payment not confirmed
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <p className="mt-3 text-sm text-gray-500">
              If you completed payment, contact support before attempting
              another payment.
            </p>
          </div>
        )}

        {/* Actions */}
        {status !== "verifying" && (
          <div className="flex flex-col gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end print:hidden">
            {status === "success" && (
              <button
                onClick={handlePrintTicket}
                className="rounded-lg bg-teal-800 px-6 py-3 font-semibold text-white transition hover:bg-teal-900"
              >
                Print / Save Ticket as PDF
              </button>
            )}

            <button
              onClick={() => navigate("/")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default PaymentCallback;
