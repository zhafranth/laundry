import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import { formatToCurrency } from "@/utils/format";

interface ComponentToPrintProps {
  data?: ITransaction;
}
export class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
  render() {
    const { data } = this.props;
    const {
      customer,
      layanan,
      status_pembayaran,
      berat = 0,
      createdAt,
      note,
      harga,
      point_setrika = 0,
      point_lipat = 0,
    } = data ?? {};
    const { nama, no_telp, alamat } = customer ?? {};
    const { nama: nama_layanan } = layanan ?? {};

    return (
      <div style={{ padding: "0 34px" }}>
        <p style={{ fontSize: 18, textAlign: "center" }}>
          ====================
        </p>
        <p
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Water 7 Laundry
        </p>
        <p
          style={{
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Gading Nias Residence Tower <br /> Emerald SHU 2A
        </p>
        <p style={{ fontSize: 18, textAlign: "center" }}>
          ====================
        </p>
        <div style={{ textAlign: "center", fontWeight: "500", fontSize: 18 }}>
          <p
            style={{
              fontSize: 68,
              fontWeight: "800",
              lineHeight: 1,
              textTransform: "capitalize",
            }}
          >
            {nama || "-"}
          </p>
          <p>{no_telp || "-"}</p>
          <p>{alamat || "-"}</p>
        </div>
        <p
          style={{
            marginTop: "12px",
            fontSize: 18,
          }}
        >
          Point Setrika :{" "}
          <span style={{ fontWeight: "600" }}>{point_setrika}</span>
        </p>
        <p
          style={{
            marginTop: "12px",
            fontSize: 18,
          }}
        >
          Point Lipat : <span style={{ fontWeight: "600" }}>{point_lipat}</span>
        </p>
        <p style={{ fontSize: 18 }}>
          Tanggal Terima :{" "}
          <span style={{ fontWeight: "500" }}>
            {dayjs(createdAt || "-").format("MM/DD/YYYY HH:mm") || "-"}
          </span>
        </p>

        <p style={{ fontSize: 18, textAlign: "center", margin: "12px 0" }}>
          ==================
        </p>
        <div>
          <p style={{ fontSize: 18, fontWeight: "500" }}>Detail Pesanan </p>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Layanan : <span style={{ fontWeight: "600" }}>{nama_layanan}</span>
          </p>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Berat : <span style={{ fontWeight: "600" }}>{berat} Kg</span>
          </p>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Total :{" "}
            <span style={{ fontWeight: "600" }}>
              {formatToCurrency(harga || 0)}
            </span>
          </p>
          <p style={{ fontSize: 18, textAlign: "center", margin: "12px 0" }}>
            --------------------
          </p>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Status Pembayaran :{" "}
            <span style={{ fontWeight: "600" }}>
              {status_pembayaran ? "Lunas" : "Belum Lunas"}
            </span>
          </p>
          <p style={{ margin: "12px 0", fontSize: 44, textAlign: "center" }}>
            =================
          </p>
          {note && (
            <>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Notes :
              </p>
              <p
                style={{
                  fontSize: 18,
                }}
              >
                {note}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

interface MyPrintComponentProps {
  data?: ITransaction;
}

const MyPrintComponent: React.FC<MyPrintComponentProps> = ({ data }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "receipt",
  });

  return (
    <>
      <div className="" style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} data={data} />
      </div>
      <Button
        variant="flat"
        size="sm"
        color="primary"
        radius="full"
        endContent={<MdKeyboardArrowRight />}
        className="border-2 border-blue-500"
        disabled={data?.status === "diambil"}
        onClick={handlePrint}
      >
        Cetak
      </Button>
    </>
  );
};

export default MyPrintComponent;
