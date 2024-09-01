import { FaRegChartBar } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { LuUserCircle, LuUsers } from "react-icons/lu";
import { PiMoneyWavy, PiNotepadDuotone } from "react-icons/pi";

export const MENUS = [
  {
    key: "transaksi",
    icon: <FiHome />,
  },
  {
    key: "profile",
    icon: <LuUserCircle />,
  },
  {
    key: "divider",
  },
  {
    key: "customer",
    icon: <LuUsers />,
  },
  {
    key: "performance",
    icon: <FaRegChartBar />,
  },
  {
    key: "service",
    icon: <PiMoneyWavy />,
  },
  {
    key: "dashboard",
    icon: <PiNotepadDuotone />,
  },
  {
    key: "divider",
  },
];
