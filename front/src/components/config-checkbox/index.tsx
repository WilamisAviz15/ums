import React from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

interface ConfigCheckboxProps {
  label: string;
  active: boolean;
  options?: { [key: string]: boolean };
  onChange: (optionKey?: string) => void;
}

const ConfigCheckbox: React.FC<ConfigCheckboxProps> = ({ label, active, options, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={active} onChange={() => onChange()} />} label={<Typography variant="h6">{label}</Typography>} />
      {options && (
        <Box pl={4} mt={1}>
          {Object.keys(options).map((optionKey) => (
            <FormControlLabel key={optionKey} control={<Checkbox checked={options[optionKey]} onChange={() => onChange(optionKey)} />} label={optionKey} />
          ))}
        </Box>
      )}
    </FormGroup>
  );
};

export default ConfigCheckbox;
