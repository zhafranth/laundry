const INTL_NUMBER_FORMAT = "id-ID";
const MAXIMUM_FRACTION_DIGITS = 6;
const MINIMUM_FRACTION_DIGITS = 0;

interface CurrencyInfoProperties {
  currency?: number | string;
  currencyKey?: "key" | "value" | "type" | "format" | "description";
}

interface YearOption {
  readonly value: string;
  readonly label: string;
}

const CURRENCY_OPTIONS = [
  {
    key: "0",
    value: "IDR",
    type: "id",
    format: "Rp",
    description: "Indonesia Rupiah",
  },
  {
    key: "1",
    value: "USD",
    type: "en-US",
    format: "$",
    description: "US Dollar",
  },
];

export const formatThousandSeparator = (
  inputNumber: number,
  options?: {
    /**
     * Set true will return `-` when value=0
     * @type boolean
     * @default false
     */
    returnDashIfZero?: boolean;
    /**
     * Default return if value is null or undefined
     * @type '-' or 0
     * @default '-'
     */
    defaultValueIfNil?: "-" | 0;
    /**
     * Maximal digit after `.` (Decimal number)
     * @type number
     * @default 6
     */
    maximumFractionDigits?: number;
    /**
     * Minimal digit after `.` (Decimal number)
     * @type number
     * @default 0
     */
    minimumFractionDigits?: number;
  }
) => {
  const {
    returnDashIfZero,
    defaultValueIfNil,
    maximumFractionDigits,
    minimumFractionDigits,
  } = {
    returnDashIfZero: false,
    defaultValueIfNil: "-",
    maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
    minimumFractionDigits: MINIMUM_FRACTION_DIGITS,
    ...options,
  };

  if (returnDashIfZero && inputNumber === 0) {
    return "-";
  }

  if (inputNumber !== null && !inputNumber) {
    return `${defaultValueIfNil}`;
  }

  return inputNumber.toLocaleString(INTL_NUMBER_FORMAT, {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};

export const formatToCurrency = (
  amount?: number,
  currencyInfo?: CurrencyInfoProperties,
  options?: {
    /**
     * Set true will return `-` when value=0
     * @type boolean
     * @default false
     */
    returnDashIfZero?: boolean;
    /**
     * Set true will return `-` when [null, undefined].includes(value)
     * @type boolean
     * @default true
     */
    returnDashIfNil?: boolean;
    /**
     * Maximal digit after `.` (Decimal number)
     * @type number
     * @default 6
     */
    maximumFractionDigits?: number;
    /**
     * Maximal digit after `.` (Decimal number)
     * @type number
     * @default 0
     */
    minimumFractionDigits?: number;
  }
) => {
  const {
    returnDashIfZero,
    returnDashIfNil,
    maximumFractionDigits,
    minimumFractionDigits,
  } = {
    returnDashIfZero: false,
    returnDashIfNil: true,
    maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
    minimumFractionDigits: MINIMUM_FRACTION_DIGITS,
    ...options,
  };

  if (returnDashIfZero && amount === 0) {
    return "0";
  }

  if (returnDashIfNil && amount !== null && !amount) {
    return "0";
  }

  const { currency = 0, currencyKey = "key" } = currencyInfo || {
    currency: 0,
    currencyKey: "key",
  };
  const currentValue = CURRENCY_OPTIONS.find(
    (dt) => dt[currencyKey] === currency.toString()
  );

  const prefix = currentValue ? currentValue.format : "Rp";

  return `${prefix} ${
    amount
      ? formatThousandSeparator(amount, {
          maximumFractionDigits,
          minimumFractionDigits,
        })
      : "0"
  }`;
};

export const generateUniqueID = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueID = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueID += characters[randomIndex];
  }

  return uniqueID;
};

export const getAlias = (name: string) => {
  const nameParts = name.split(" ");
  return nameParts.length === 1
    ? nameParts[0].substring(0, 2).toUpperCase()
    : nameParts
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
};

export const generateYear = (): YearOption[] => {
  const counter = [];
  const now = new Date().getFullYear();
  const INITIAL_LAST_YEAR = 2034;

  for (let i = now; i > 1966; i--) {
    counter.push(i);
  }

  return counter.map((val) => ({
    label: String(val),
    value: String(val),
  }));
};
