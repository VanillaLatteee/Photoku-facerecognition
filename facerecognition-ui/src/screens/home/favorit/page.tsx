import { JSX, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { illustration_no_favorit } from "../../../assets/illustrations";
import { icUnLike, icLike, icAddToCard } from "../../../assets/icons";
import {
  SamplePhotoku1,
  SamplePhotoku2,
  SamplePhotoku3,
} from "../../../assets/photoku";
import Watermark from "../../../components/Watermark";
import { useNavigate } from "react-router-dom";

type PhotoItem = {
  foto: string; // path image
  orientation: "portrait" | "landscape";
  like: boolean;
  date: string;
  desc: string;
};

const FavoritPhotoList: React.FC = () => {
  const data: PhotoItem[] = [
    {
      foto: SamplePhotoku3,
      orientation: "landscape",
      like: false,
      date: "11/08/2014",
      desc: "#CikoleRun #Lembang #Ortus #MostWeeklyThisPick #Bandung",
    },
    {
      foto: SamplePhotoku2,
      orientation: "portrait",
      like: false,
      date: "05/02/2018",
      desc: "#Marathon #Jakarta #RunningCommunity #Event #HealthyLifestyle",
    },
  ];

  const [dataPhotoExplore, setDataPhotoExplore] = useState<PhotoItem[]>(data);
  const navigate = useNavigate();

  useEffect(() => {
    setDataPhotoExplore(data);
  }, []);

  const toggleLike = (index: number) => {
    setDataPhotoExplore((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, like: !item.like } : item,
      ),
    );
  };

  const renderPhotos = () =>
    dataPhotoExplore.map((item, i) => (
      <div key={i} className="space-y-3 overflow-hidden rounded-2xl p-3">
        {/* Foto */}
        <div
          className={`relative overflow-hidden rounded-2xl shadow-md ${
            item.orientation === "portrait" ? "h-[70vh]" : "h-full"
          }`}
          onClick={() => navigate(`/negotiation`)}
        >
          <img
            src={item.foto}
            alt={`foto-${i}`}
            className="h-full w-full object-cover"
          />

          {/* tombol like */}
          <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 text-white">
            <div onClick={() => toggleLike(i)}>
              {item.like ? (
                <img src={icLike} alt="like icon" />
              ) : (
                <img src={icUnLike} alt="unlike icon" />
              )}
            </div>

            <div>
              <img src={icAddToCard} alt="add to card icon" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Description */}
          <div className="flex-1 px-1">
            <p className="text-sm text-[#181C21]">{item.date}</p>
            <p className="whitespace-pre-line text-sm text-[#181C21]">
              {item.desc.length >= 100
                ? item.desc.slice(0, 100) + "..."
                : item.desc}
            </p>
          </div>

          {/* Button */}
          <div className="flex-shrink-0">
            <button className="rounded-full bg-[#001A41] px-4 py-3 text-center text-sm leading-none text-white">
              + Keranjang
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div>
      {dataPhotoExplore.length > 0 ? (
        <div>
          <div className="space-y-6">{renderPhotos()}</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl bg-[#7EB2EE26]/20 p-5">
            <img
              className="rounded-3xl"
              src={illustration_no_favorit}
              alt="illustration no collection"
            />
            <p className="text-center text-lg">
              Belum ada foto yang kamu beli, Beli fotomu sekarang!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritPhotoList;
