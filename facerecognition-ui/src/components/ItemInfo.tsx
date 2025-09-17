type Props = {
  img?: string;
  text?: string;
};

export default function ItemInfo({ img, text }: Props) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
        <img src={img} width={32} height={32} />
      </span>
      <p className="font-poppins text-[16px] text-black leading-relaxed">
        {text}
      </p>
    </div>
  );
}
