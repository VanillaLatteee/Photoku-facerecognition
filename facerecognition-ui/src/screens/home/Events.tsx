import { sampleMarathon1 } from "../../assets";
import LocationBar from "../../components/LocationBar";
import Section from "../../components/Section";
import { icArrowRight } from "../../assets/icons";
import "swiper/css";
import "swiper/css/grid";
import MosaicSwiper from "../../components/MosaicSwiper";
import { rawCfdPhotos, rawPocariPhotos } from "../../hooks/useEvents";
import { useNavigate } from "react-router-dom";

const panels = [rawCfdPhotos.map((p) => ({ src: p.src, alt: `CFD ${p.id}` }))];
const panels2 = [
  rawPocariPhotos.map((p) => ({ src: p.src, alt: `Pocari ${p.id}` })),
];

export default function Events() {
  const navigation = useNavigate();

  return (
    <div className="w-full bg-white">
      <LocationBar />

      <Section title="#CFD_Sudirman">
        <MosaicSwiper panels={panels} item="#CFD_Sudirman" />
      </Section>

      <Section title="#PocariJakarta">
        <MosaicSwiper panels={panels2} item="#PocariJakarta" />
      </Section>

      <Section
        title="Daftar Tokyo Marathon disini"
        right={<img src={icArrowRight} />}
      >
        <div className="mb-5 mt-4 overflow-hidden rounded-[16px]">
          <img
            src={sampleMarathon1}
            alt="Tokyo Marathon"
            className="h-40 w-full object-cover"
            onClick={() => {
              navigation(
                `/photo?src=${encodeURIComponent(sampleMarathon1)}&alt=${encodeURIComponent("Tokyo Marathon")}`,
              );
            }}
          />
        </div>
      </Section>
    </div>
  );
}
