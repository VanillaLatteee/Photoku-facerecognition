import { JSX, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  icScanBiometrik,
  icUnLike,
  icLike,
  icAddToCard,
  icDelete,
} from "../../../assets/icons";

import {
  SamplePhotoku1,
  SamplePhotoku2,
  SamplePhotoku3,
  SamplePhotokuEmpty1,
  SamplePhotokuEmpty2,
  SamplePhotokuEmpty3,
} from "../../../assets/photoku";

import { PhotoCard } from "../../../components/PhotoCard";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const data = [
    { foto: SamplePhotoku1, orientation: "portrait", like: false },
    { foto: SamplePhotoku2, orientation: "portrait", like: false },
    { foto: SamplePhotoku3, orientation: "landscape", like: false },
    { foto: SamplePhotoku3, orientation: "landscape", like: false },
    { foto: SamplePhotoku2, orientation: "portrait", like: false },
    { foto: SamplePhotoku2, orientation: "portrait", like: false },
  ];
  const [dataPhotoExplore, setDataPhotoExplore] = useState(data);

  const navigate = useNavigate();

  useEffect(() => {
    setDataPhotoExplore(data);
  }, []);

  const toggleLike = (index: number) => {
    console.log("index", index);
    setDataPhotoExplore((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, like: !item.like } : item,
      ),
    );
  };

  const renderPhotos = () => {
    const elements: JSX.Element[] = [];
    let skipNext = false;

    dataPhotoExplore.forEach((item, i) => {
      if (skipNext) {
        skipNext = false;
        return; // lewati karena sudah ditampilkan bersama sebelumnya
      }

      // === Jika ada 2 portrait berdampingan ===
      if (
        item.orientation === "portrait" &&
        dataPhotoExplore[i + 1] &&
        dataPhotoExplore[i + 1].orientation === "portrait"
      ) {
        const nextItem = dataPhotoExplore[i + 1];

        elements.push(
          <div key={i} className="flex gap-2">
            {/* Foto pertama */}
            <div
              className="relative h-1/2 w-1/2 overflow-hidden rounded-2xl shadow-md"
              onClick={() => navigate(`/negotiation`)}
            >
              <img
                src={item.foto}
                alt={`foto-${i}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 text-white">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(i); // tetap index asli
                  }}
                >
                  {item.like ? (
                    <img src={icLike} alt="like icon" />
                  ) : (
                    <img src={icUnLike} alt="unlike icon" />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart clicked");
                  }}
                >
                  <img src={icAddToCard} alt="add to card icon" />
                </div>
              </div>
            </div>

            {/* Foto kedua */}
            <div
              className="relative h-1/2 w-1/2 overflow-hidden rounded-2xl shadow-md"
              onClick={() => navigate(`/negotiation`)}
            >
              <img
                src={nextItem.foto}
                alt={`foto-${i + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 text-white">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(i + 1); // tetap index asli
                  }}
                >
                  {nextItem.like ? (
                    <img src={icLike} alt="like icon" />
                  ) : (
                    <img src={icUnLike} alt="unlike icon" />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add to cart clicked");
                  }}
                >
                  <img src={icAddToCard} alt="add to card icon" />
                </div>
              </div>
            </div>
          </div>,
        );

        skipNext = true; // tandai untuk melewati nextItem
      } else {
        // === Foto tunggal (portrait sendirian / landscape) ===
        elements.push(
          <div
            key={i}
            className="relative h-1/2 overflow-hidden rounded-2xl shadow-md"
            onClick={() => navigate(`/negotiation`)}
          >
            <img
              src={item.foto}
              alt={`foto-${i}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 text-white">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(i); // index konsisten
                }}
              >
                {item.like ? (
                  <img src={icLike} alt="like icon" />
                ) : (
                  <img src={icUnLike} alt="unlike icon" />
                )}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Add to cart clicked");
                }}
              >
                <img src={icAddToCard} alt="add to card icon" />
              </div>
            </div>
          </div>,
        );
      }
    });

    return elements;
  };

  return (
    <div>
      {dataPhotoExplore.length > 0 ? (
        // ===================== Jika ada foto =====================
        <div>
          {/* Info Deteksi */}
          <div className="mb-4 flex items-center rounded-lg bg-yellow-50 p-3">
            <img
              src={icScanBiometrik}
              alt="Icon Scan Biometrik"
              className="mr-2 h-6 w-6"
            />
            <p className="text-sm">
              <span className="font-semibold">
                Terdeteksi {dataPhotoExplore.length} foto
              </span>{" "}
              yang kemungkinan besar menampilkan wajahmu
            </p>
          </div>

          {/* Foto hasil deteksi */}
          <div className="space-y-4">{renderPhotos()}</div>
        </div>
      ) : (
        // ===================== Jika tidak ada foto =====================
        <div className="space-y-4">
          {/* Card 1 & 2 */}
          <div className="flex gap-2">
            <div className="relative h-1/2 w-1/2 overflow-hidden rounded-2xl shadow-md">
              <img
                src={SamplePhotokuEmpty1}
                alt="SamplePhotokuEmpty1"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 px-4 text-center text-xs font-semibold text-white">
                Oops! Kami belum menemukan <br /> fotomu
              </p>
            </div>

            <div className="relative h-1/2 w-1/2 overflow-hidden rounded-2xl shadow-md">
              <img
                src={SamplePhotokuEmpty2}
                alt="SamplePhotokuEmpty2"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 px-1 text-center text-xs font-semibold text-white">
                100+ Mitra Fotografer siap abadikan momen terbaik
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={SamplePhotokuEmpty3}
              alt="SamplePhotokuEmpty3"
              className="h-48 w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="absolute bottom-6 right-0 mr-5 flex w-1/2 flex-col items-end text-white">
              <p className="mb-3 text-right text-sm font-semibold">
                Scan Wajah kamu sekarang dan <br />
                temukan foto kamu dengan mudah
              </p>
              <button className="w-[90%] rounded-full bg-white px-5 py-2 text-xs font-normal text-black">
                Scan Sekarang
              </button>
            </div>
          </div>

          {/* Card 4 & 5 (duplikat, bisa dihapus kalau tidak perlu) */}
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={SamplePhotokuEmpty3}
              alt="SamplePhotokuEmpty3"
              className="h-48 w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="absolute bottom-6 right-0 mr-5 flex w-1/2 flex-col items-end text-white">
              <p className="mb-3 text-right text-sm font-semibold">
                Scan Wajah kamu sekarang dan <br />
                temukan foto kamu dengan mudah
              </p>
              <button className="w-[90%] rounded-full bg-white px-5 py-2 text-xs font-normal text-black">
                Scan Sekarang
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={SamplePhotokuEmpty3}
              alt="SamplePhotokuEmpty3"
              className="h-48 w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="absolute bottom-6 right-0 mr-5 flex w-1/2 flex-col items-end text-white">
              <p className="mb-3 text-right text-sm font-semibold">
                Scan Wajah kamu sekarang dan <br />
                temukan foto kamu dengan mudah
              </p>
              <button className="w-[90%] rounded-full bg-white px-5 py-2 text-xs font-normal text-black">
                Scan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
