import React from "react";
import { TextField, Typography } from "@mui/material";
import { colors } from "@/constant/Colors";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});
type IProps = {
  heading: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  errorText: string;
  type?: React.HTMLInputTypeAttribute;
};

const CateringInput: React.FunctionComponent<IProps> = ({
  heading,
  onChange,
  errorText,
  value,
  type,
}) => {
  return (
    <div>
      <label className={`input-b ${poppins.className}`}>
        <span>{heading}</span>
        <input
          type={type}
          placeholder={heading}
          required
          className="input-invalid"
          onChange={onChange}
          value={value}
        />
      </label>

      {errorText !== "" && (
        <Typography sx={{ color: "red", mt: 1 }}>*{errorText}</Typography>
      )}
    </div>
  );
};

export default CateringInput;
