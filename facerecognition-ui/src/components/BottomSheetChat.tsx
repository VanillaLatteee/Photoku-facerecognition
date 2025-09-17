import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { chatHeroImage, chatTanyaBos } from "../assets/";
import { useGetMessgagesQuery } from "@/lib/ws";
import { useWebSocket } from "../hooks/useWebSocket";
import { useParams } from "react-router-dom";

export default function BottomSheetNego({
  onClose,
  image,
  harga,
}: {
  onClose: () => void;
  image: string;
  harga: string;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const roomId = "123";
  const userId = id;
  const sellerId = 2;
  
  const { id } = useParams<{ id: string }>();
  const {data, error} = useGetMessgagesQuery(roomId);
  

  const { messages, sendMessage } = useWebSocket('ws://localhost:8085/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTc5MjkwMDksInVzZXJfaWQiOjF9.Xt5Hc36sNpN62jYx1ahNx-YUibOicdxi_3yV0EmizZo');

  const handleSendMessage = (msg: string) => {
    const messageObj = {
      to: sellerId,
      room_id: "123",
      message: msg,
    };

    sendMessage(messageObj);
    console.log(messages)
    // setMessage('');
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (error) {
      console.error('Error fetching messages:', error);
    }
  }, [error]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/60 transition-opacity duration-300 ${isMounted && !isClosing ? "opacity-100" : "opacity-0"} `}
    >
      <div
        className={`w-full transform rounded-t-3xl bg-white px-6 pb-8 pt-5 shadow-xl transition-all duration-300 ${isClosing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"} `}
      >
        <div className="mb-4 flex items-center justify-end">
          <button onClick={handleClose}>
            <ChevronDown className="h-6 w-6 text-gray-600" size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-3 text-sm">
          <img
            src={chatHeroImage}
            alt="negotiation image"
            className="w-[70%]"
          />
          <div className="mt-4 w-full space-y-2">
            <div className="w-fi mb-5 ml-auto rounded-l-xl rounded-br-xl bg-[#479CFF] px-4 py-3 text-left">
              <p className="text-sm text-white">
                Halo! Udah nemu foto yang pas? Kalau mau cek harga terbaik, kamu
                bisa nego loh
              </p>
            </div>

            <CardPenawaran image={image} harga={harga} handleSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

const CardPenawaran = ({ image, harga, handleSendMessage }: { image: string; harga: string, handleSendMessage: (msg: string) => void }) => {
  const [showCard, setShowCard] = useState(true);
  const [price, setPrice] = useState(0);
  const [accepted, setAccepted] = useState(false);

  // const handleAjukan = () => {
  //   if (price <= 0) {
  //     return;
  //   }

  //   setShowCard(false);
  // };

  return (
    <div>
      {showCard ? (
        <div className="rounded-md bg-[#F9FAFB] p-4">
          <div className="flex">
            <div className="mr-4">
              <img
                src={image}
                alt="pic"
                className="h-[56px] w-[72px] rounded-lg object-fill"
              />
            </div>

            <div>
              <p className="text-sm text-[#9CA9B9]">Harga Awal</p>
              <p className="text-base font-bold text-[#181C21]">{harga}</p>
            </div>
          </div>

          <div className="mb-6 mt-3 flex items-center gap-2">
            <span className="text-[#181C21]">Rp</span>
            <input
              type="number"
              className="flex-1 rounded-md border-0 bg-[#EFF1F4] px-4 py-2 placeholder:text-[#718290] focus:outline-none focus:ring-0"
              placeholder="Masukkan penawaran"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>

          <p className="text-sm text-[#718290]">
            Maksimal kamu bisa mengajukan penawaran harga sampai 3 kali untuk
            foto ini
          </p>

          <button
            className={`mt-4 w-full rounded-2xl py-3 ${price ? "bg-[#001A41] text-white" : "bg-[#DAE0E9] text-[#9CA9B9]"}`}
            onClick={() => handleSendMessage(`Menawar harga Rp${price.toLocaleString("id-ID")}`)}
          >
            Ajukan Penawaran
          </button>
        </div>
      ) : !accepted ? (
        <div>
          {/* PEMBELI */}
          <div className="mb-5 ml-auto w-max rounded-l-xl rounded-tr-xl bg-[#008E53] px-4 py-3 text-left">
            <p className="text-sm text-white">
              Menawar harga Rp{price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* PENJUAL */}
          <div className="flex flex-col">
            <div className="w-full text-center">
              <img
                src={chatTanyaBos}
                alt="negotiation"
                className="mx-auto w-[70%] object-cover"
              />
            </div>

            <div className="w-fi mb-2 ml-auto rounded-l-xl rounded-br-xl bg-[#479CFF] px-4 py-3 text-left">
              <p className="text-sm text-white">
                Halo! Udah nemu foto yang pas? Kalau mau cek harga terbaik, kamu
                bisa nego loh
              </p>
            </div>
          </div>

          {/* PENJUAL */}
          <div className="w-fi mb-2 ml-auto rounded-l-xl rounded-br-xl bg-[#479CFF] px-4 py-3 text-left">
            <p className="text-sm text-white">
              Kalo harga segitu, masih belum bisa, bagaimana kalau Rp50.000?
            </p>
          </div>

          {/* BUTTON AJUKAN */}
          <div className="flex w-full justify-end gap-3">
            <button className="mt-4 rounded-full border border-[#001A41] px-4 py-2 text-[#001A41]">
              Ajukan penawaran baru
            </button>
            <button
              className="mt-4 rounded-full bg-[#001A41] px-6 py-2 text-white"
              onClick={() => setAccepted(true)}
            >
              Terima
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-md border bg-[#F9FAFB] p-4">
          <div className="flex">
            <div className="mr-4">
              <img
                src={image}
                alt="pic"
                className="h-[56px] w-[72px] rounded-lg object-fill"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#9CA9B9]">Harga Awal</p>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-[#181C21]">{harga}</p>
                <p className="text-xs text-[#757F90] line-through">{harga}</p>
              </div>
            </div>
          </div>

          <button
            className={`: ""} mt-4 w-full rounded-2xl bg-[#001A41] py-3 text-white`}
            // onClick={handleAjukan}
          >
            Tambah Keranjang
          </button>
        </div>
      )}
    </div>
  );
};
