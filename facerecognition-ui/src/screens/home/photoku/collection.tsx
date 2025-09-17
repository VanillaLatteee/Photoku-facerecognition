import { useEffect, useState } from "react";
import {
  icScanBiometrik,
  icDelete,
  icDownload,
  icShare,
} from "../../../assets/icons";
import {
  SamplePhotoku1,
  SamplePhotoku2,
  SamplePhotoku3,
} from "../../../assets/photoku";
import { illustration_no_collection } from "../../../assets/illustrations";
import { useNavigate } from "react-router-dom";
type Photo = {
  foto: string;
  orientation: "portrait" | "landscape";
  like?: boolean;
};
const Collection = () => {
  const data: Photo[] = [
    { foto: SamplePhotoku1, orientation: "portrait", like: true },
    { foto: SamplePhotoku2, orientation: "portrait", like: false },
    { foto: SamplePhotoku3, orientation: "landscape", like: false },
    { foto: SamplePhotoku3, orientation: "landscape", like: false },
    { foto: SamplePhotoku2, orientation: "portrait", like: false },
  ];

  const [dataPhotoCollection, setDataPhotoCollection] = useState<Photo[]>(data);
  const navigate = useNavigate();

  useEffect(() => {
    setDataPhotoCollection(data);
  }, []);

  const renderPhotos = () => {
    const elements: React.ReactNode[] = [];
    for (let i = 0; i < dataPhotoCollection.length; i++) {
      const item = dataPhotoCollection[i];

      if (item.orientation === "portrait") {
        if (
          dataPhotoCollection[i + 1] &&
          dataPhotoCollection[i + 1].orientation === "portrait"
        ) {
          elements.push(
            <div key={i} className="flex gap-2">
              {[item, dataPhotoCollection[i + 1]].map((p, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden shadow-md w-1/2 h-1/2"
                  onClick={() => navigate(`/negotiation`)}
                >
                  <img
                    src={p.foto}
                    alt={`foto-${i + idx}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 text-white text-xs">
                    <img src={icDelete} alt="icon delete" />
                    <div className="flex gap-3">
                      <img src={icShare} alt="icon share" />
                      <img src={icDownload} alt="icon download" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
          i++;
        } else {
          elements.push(
            <div key={i} className="flex gap-2">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-md w-1/2 h-1/2"
                onClick={() => navigate(`/negotiation`)}>
                <img
                  src={item.foto}
                  alt={`foto-${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 text-white text-xs">
                  <img src={icDelete} alt="icon delete" />
                  <div className="flex gap-3">
                    <img src={icShare} alt="icon share" />
                    <img src={icDownload} alt="icon download" />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      } else if (item.orientation === "landscape") {
        elements.push(
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-md h-1/2"
            onClick={() => navigate(`/negotiation`)}
          >
            <img
              src={item.foto}
              alt={`foto-${i}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 text-white text-xs">
              <img src={icDelete} alt="icon delete" />
              <div className="flex gap-3">
                <img src={icShare} alt="icon share" />
                <img src={icDownload} alt="icon download" />
              </div>
            </div>
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div>
      {dataPhotoCollection.length > 0 ? (
        <div>
          {/* Info Deteksi */}
          <div className="flex items-center bg-yellow-50 p-3 rounded-lg mb-4">
            <img
              src={icScanBiometrik}
              alt="Icon Scan Biometrik"
              className="w-6 h-6 mr-2"
            />
            <p className="text-sm">
              Ada{" "}
              <span className="font-semibold">
                {dataPhotoCollection.length} foto
              </span>{" "}
              yang sudah kamu beli
            </p>
          </div>

          {/* Foto hasil deteksi */}
          <div className="space-y-4">{renderPhotos()}</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-5 bg-[#7EB2EE26]/20 rounded-3xl">
            <img
              className="rounded-3xl"
              src={illustration_no_collection}
              alt="illustration no collection"
            />
            <p className="text-lg text-center">
              Belum ada foto yang kamu beli, Beli fotomu sekarang!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
