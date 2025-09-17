import { useState } from "react";
import { ChevronUp } from "lucide-react";
import TrashIcon from "../../../assets/icons/trash.svg";
import TrashBoldIcon from "../../../assets/icons/trash_bold.svg";
import {
  icDana,
  icLinkAja,
  icOvo,
  icShopee,
  icPulsa,
  icGopay,
} from "../../../assets/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTransactionData } from "../../../store/transactionSlice";
import { warning } from "../../../assets/illustrations/";

type CartItem = {
  id: number;
  image: string;
  date: string;
  price: number;
  selected: boolean;
};

const dummyItems: CartItem[] = [
  {
    id: 1,
    image: "/photo1.jpg",
    date: "11/08/2014",
    price: 38000,
    selected: false,
  },
  {
    id: 2,
    image: "/photo2.jpg",
    date: "11/08/2014",
    price: 50000,
    selected: false,
  },
];

type PaymentMethod = {
  id: number;
  name: string;
  icon: string;
  category: "Telkomsel" | "e-Wallet";
  balance?: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: "Pulsa",
    icon: icPulsa,
    category: "Telkomsel",
    balance: "Rp100.000",
  },
  { id: 2, name: "Gopay", icon: icGopay, category: "e-Wallet" },
  { id: 3, name: "LinkAja", icon: icLinkAja, category: "e-Wallet" },
  { id: 4, name: "ShopeePay", icon: icShopee, category: "e-Wallet" },
  { id: 5, name: "OVO", icon: icOvo, category: "e-Wallet" },
  { id: 6, name: "DANA", icon: icDana, category: "e-Wallet" },
];

export default function Cart() {
  const dispatch = useDispatch();
  const [items, setItems] = useState(dummyItems);
  const [selectedPayment, setSelectedPayment] = useState<number>(2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | "bulk" | null>(
    null,
  );

  const telkomselMethods = paymentMethods.filter(
    (m) => m.category === "Telkomsel",
  );
  const eWalletMethods = paymentMethods.filter(
    (m) => m.category === "e-Wallet",
  );
  const total = items
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.price, 0);

  const selectedItems = items.filter((i) => i.selected);

  const handleSubmit = () => {
    if (itemToDelete === "bulk") {
      setItems((prev) => prev.filter((item) => !item.selected));
    } else {
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete));
    }
    setIsDrawerOpen(false);
  };

  return (
    <div className="pb-[100px]">
      {/* Header Action */}
      <div className="mb-4 flex items-center justify-between px-1 text-sm text-slate-700">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-bold text-[#001A41]">
            <input
              type="checkbox"
              checked={items.every((i) => i.selected)}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((item) => ({ ...item, selected: e.target.checked })),
                )
              }
              className="h-5 w-5 accent-[#001A41]"
            />
            Pilih Semua
          </label>

          <button
            onClick={() => {
              setItemToDelete("bulk"); // optional, just to track context
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 text-xs font-bold text-[#001A41]"
          >
            <img src={TrashIcon} alt="Trash" className="h-5 w-5" />
            Hapus
          </button>
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() =>
                setItems((prev) =>
                  prev.map((i) =>
                    i.id === item.id ? { ...i, selected: !i.selected } : i,
                  ),
                )
              }
              className="h-5 w-5 rounded-lg accent-[#001A41]"
            />
            <div
              key={item.id}
              className="relative flex h-full w-full items-center justify-between rounded-3xl border-2 border-gray-300 bg-[#EFF1F4] p-4 focus:shadow-inner"
            >
              <div className="flex items-center gap-3">
                {/* Gambar */}
                <img
                  src={item.image}
                  alt="Foto"
                  className="h-32 w-44 rounded-3xl object-cover"
                />
              </div>

              {/* Detail */}
              <div className="flex h-32 flex-col justify-between">
                {/* Icon trash */}
                <button
                  onClick={() => {
                    setItemToDelete(item.id);
                    setIsDrawerOpen(true);
                  }}
                  className="w-max self-end rounded-full bg-[#001A41] p-0.5"
                >
                  <img src={TrashBoldIcon} alt="Trash" className="h-7 w-7" />
                </button>

                <div className="space-y-2 text-right">
                  {/* Tanggal */}
                  <div className="text-xs text-slate-500">{item.date}</div>

                  {/* Label Harga */}
                  <div className="text-xs text-slate-400">Harga</div>

                  {/* Nominal Harga */}
                  <div className="text-base font-bold text-slate-900">
                    Rp{item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="fixed inset-x-0 bottom-16 z-50 border-t bg-[#EFF1F4] p-4">
        <div className="mx-auto mb-3 flex items-center justify-between">
          {/* Metode Pembayaran */}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="flex w-3/5 items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      paymentMethods.find((m) => m.id === selectedPayment)?.icon
                    }
                    alt={
                      paymentMethods.find((m) => m.id === selectedPayment)?.name
                    }
                    className="h-6 w-6 object-contain"
                  />
                  <span className="text-sm font-bold">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                  </span>
                </div>
                <ChevronUp />
              </button>
            </DrawerTrigger>

            <DrawerContent className="max-h-90vh">
              <DrawerHeader>
                <DrawerTitle>Metode Pembayaran</DrawerTitle>
                <DrawerDescription>
                  Pilih metode pembayaran yang ingin digunakan.
                </DrawerDescription>
              </DrawerHeader>

              <div className="space-y-4 overflow-y-auto p-4">
                {/* Telkomsel */}
                {telkomselMethods.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500">
                      Telkomsel
                    </h3>
                    {telkomselMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 ${
                          selectedPayment === method.id
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="h-6 w-6 object-contain"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {method.name}
                            </span>
                            {method.balance && (
                              <span className="text-xs text-gray-400">
                                {method.balance}
                              </span>
                            )}
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="h-4 w-4 accent-blue-500"
                        />
                      </label>
                    ))}
                  </div>
                )}

                {/* e-Wallet */}
                {eWalletMethods.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500">
                      e-Wallet
                    </h3>
                    {eWalletMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 ${
                          selectedPayment === method.id
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="h-6 w-6 object-contain"
                          />
                          <span className="text-sm font-semibold">
                            {method.name}
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="h-4 w-4 accent-blue-950"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full bg-[#001A41] px-12 py-3 text-white hover:bg-blue-900">
                    Pilih
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Total Harga */}
          <div className="w-max text-right">
            <p className="text-xs font-bold text-slate-500">Total Harga</p>
            <p className="text-lg font-semibold text-black">
              Rp{total.toLocaleString()}
            </p>
          </div>
        </div>
        {/* Tombol Bayar */}

        <Link
          to={total === 0 ? "#" : "/success/12345"}
          onClick={(e) => {
            if (total === 0) {
              e.preventDefault();
              setIsDialogOpen(true);
              return;
            }

            dispatch(
              setTransactionData({
                items: selectedItems,
                paymentMethod:
                  paymentMethods.find((m) => m.id === selectedPayment)?.name ||
                  "",
                total,
              }),
            );
          }}
          className={`block w-full rounded-full bg-[#001A41] py-3 text-center text-[15px] font-semibold text-white`}
        >
          Bayar
        </Link>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Peringatan</DialogTitle>
            <DialogDescription>
              Pilih item dulu sebelum bayar!
            </DialogDescription>
          </DialogHeader>
          <Button
            className="mt-4 w-full bg-[#001A41] text-white"
            onClick={() => setIsDialogOpen(false)}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="py-4">
          <DrawerHeader className="flex flex-col items-center gap-4">
            <img src={warning} alt="warning" />
            <DrawerTitle>Kamu yakin untuk menghapus foto ini?</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row">
            <DrawerClose asChild className="w-1/2 rounded-full border-blue-950">
              <Button variant="outline">Kembali</Button>
            </DrawerClose>
            <Button
              className="w-1/2 rounded-full bg-blue-950 text-white"
              onClick={handleSubmit}
            >
              Ya, Hapus
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
