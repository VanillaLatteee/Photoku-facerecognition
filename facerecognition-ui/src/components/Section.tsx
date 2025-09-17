import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
};

export default function Section({ title, right, children }: Props) {
  const navigate = useNavigate();
  return (
    <section className="px-4 pt-5">
      <div className="flex items-center justify-between gap-3">
        {typeof title === "string" ? (
          <h2 className="text-[16px] font-normal text-[#001A41]">{title}</h2>
        ) : (
          title
        )}
        {right ? <div className="shrink-0" onClick={() => {navigate("/home/event/list")}}>{right}</div> : null}
      </div>
      {children}
    </section>
  );
}
